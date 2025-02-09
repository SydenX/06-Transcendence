function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

function showError(message) {
    if(isValidJSON(message)){
        let jsonObject = JSON.parse(message);
        message = jsonObject.detail;
    }
	const errorMessage = document.getElementById('errorMessage');
	errorMessage.textContent = message;
	errorMessage.style.display = 'block';
	console.error('Error:', message);
}

async function attemptLogin(username, password, csrfToken) {
    console.log('Attempting login...');
    const loginResponse = await fetch('/api/users/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
    });

    if (!loginResponse.ok) {
        const errorText = await loginResponse.text();
        console.error('Login Error:', loginResponse.status, errorText);
        throw new Error(errorText);
    }

    const responseData = await loginResponse.json();
    console.log('Login successful');

    try {
        const response = await fetch('/api/users/profile/');
        if (response.ok) {
            const userData = await response.json();
            setCookie("username", userData.username);
            setCookie("avatar", userData.avatar);
        }
    } catch (error) {
        console.error('Error checking auth:', error);
    }
	
	return true;
}

function handleRedirect(url) {
    console.log('Redirecting to:', url);
    window.location.href = url;
}

function isAuthenticated(){
    checkAuth().then(isAuthenticated => {
        console.log(isAuthenticated);
		if(isAuthenticated === true){
			//window.location.href = '/game';
        	return true;
		}
        return false;
	});
    return false;
}

async function checkAuth() {
    try {
        const response = await fetch('/api/users/profile/');
        return response.ok;
    } catch (error) {
        console.error('Error checking auth:', error);
        return false;
    }
}