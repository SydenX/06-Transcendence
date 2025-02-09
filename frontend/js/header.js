if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuth);
} else {
    checkAuth();
}

async function checkAuth() {
    try {
        const response = await fetch('/api/users/profile/');
        if (response.ok) {
            const userData = await response.json();
            updateUserInfo(userData)
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking auth:', error);
        return false;
    }
}

function updateUserInfo(userData) {
    document.getElementById('username').textContent = userData.username;
    document.getElementById('userAvatar').textContent = userData.username[0].toUpperCase();
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// DropDown Menu
document.getElementById('userButton').addEventListener('click', function() {
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function(event) {
    const menu = document.getElementById('dropdownMenu');
    const button = document.getElementById('userButton');

    if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none'; 
    }
});

document.addEventListener('scroll', function() {
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = 'none';
});

document.getElementById('logout').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/users/logout/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        });
        
        if (response.ok) {
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
    deleteAllCookies();
});

document.addEventListener("mouseover", function(event) {
    if (event.target.tagName === "A") {
        var link = event.target.href;
        var prefetch = document.createElement("link");
        prefetch.rel = "prefetch";
        prefetch.href = link;
        document.head.appendChild(prefetch);
    }
});
