document.addEventListener('DOMContentLoaded', function() {

	if(isAuthenticated() == true)
		return;

    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            showError('Please enter both username and password');
            return;
        }

        try {
            console.log('Fetching CSRF token...');
            const csrfResponse = await fetch('/api/users/csrf/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!csrfResponse.ok) {
                const errorText = await csrfResponse.text();
                console.error('CSRF Error:', csrfResponse.status, errorText);
                throw new Error('Failed to get CSRF token');
            }

            const csrfData = await csrfResponse.json();
            const csrfToken = csrfData.csrfToken;
            console.log('Got CSRF token');

			const loginResponse = await attemptLogin(username, password, csrfToken);
			if (loginResponse)
				handleRedirect('/game');
        } catch (error) {
            console.error('Login error:', error);
            showError(error.message);
        }
    });
});
