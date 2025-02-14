async function loadHeader() {
    console.log("Loading header.");

    let isAuthenticated = await checkAuth();
    console.log("Is user auth? " + isAuthenticated);

    if (!isAuthenticated) {
        window.location.href = "#login";
        console.log("Not logged-in -> redirecting to login page.");
        return false;
    }

    document.getElementById('header_username').textContent = getCookie("username");
    document.getElementById('header_userAvatar').textContent = getCookie("avatar");
}


function initHeader(){
    console.log("Initializing header.")

    document.getElementById('header_userButton').addEventListener('click', function() {
        const menu = document.getElementById('header_dropdownMenu');
        if(menu.style.display == 'block' && !menu.matches(':hover'))
            menu.style.display = 'none';
        else menu.style.display = 'block';
    });

    document.addEventListener('click', function(event) {
        const menu = document.getElementById('header_dropdownMenu');
        const button = document.getElementById('header_userButton');
        const elements = document.querySelectorAll("#header_dropdownMenuButton");

        elements.forEach(element => {
            if(element.matches(':hover'))
                menu.style.display = 'none';
        });
        if(document.getElementById("header_logout").matches('hover'))
            menu.style.display = 'none';

        if ((!button.matches(':hover') && !menu.matches(':hover')))
            menu.style.display = 'none';
    });

    document.addEventListener('scroll', function() {
        const menu = document.getElementById('header_dropdownMenu');
        menu.style.display = 'none';
    });

    document.getElementById('header_logout').addEventListener('click', async () => {
        try {
            const response = await fetch('/api/users/logout/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });
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
}