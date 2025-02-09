document.addEventListener('DOMContentLoaded', function() {

	if(isAuthenticated())
		return;

	const form = document.getElementById('registerForm');
	
	form.addEventListener('submit', async function(event) {
		event.preventDefault();
		console.log('Form submitted');

		const username = document.getElementById('username').value.trim();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const confirm_password = document.getElementById('confirm_password').value;
		
		if (password !== confirm_password) {
			showError('Passwords do not match.');
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

			console.log('Attempting registration...');
			const registerResponse = await fetch('/api/users/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include',
                body: JSON.stringify({ username, email, password })
            });

            if (!registerResponse.ok) {
                const errorText = await registerResponse.text();
                console.error('Registration Error:', registerResponse.status, errorText);
                throw new Error(errorText);
            }

			const responseData = await registerResponse.json();
            console.log('Registration successful');

			const loginResponse = await attemptLogin(username, password, csrfToken);
			if (loginResponse)
				handleRedirect('/game');
		} catch (error) {
			console.error('Registration error:', error);
			showError(error.message);
		}
	});
});