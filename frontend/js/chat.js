function loadChat(){
	console.log("Loading chat.")
}

function initChat(){
	console.log("Initializing chat.")


	let chatContainer = document.getElementById("chat_main_container");
	let chatToggle = document.getElementById("chat_toggle");
	let chatBody = document.getElementById("chat_body");

	let friendsList = document.getElementById("friends_list");
	let chatBox = document.getElementById("chat_container");
	let backToFriends = document.getElementById("back_to_friends");

	chatToggle.addEventListener("click", function () {
		chatContainer.classList.toggle("expanded");
	});


	fetch("/api/chat/get_friends/", { method: "GET", credentials: "include" })
		.then(response => response.json())
		.then(data => {
			if (data.mutual_friends) {
				let friendsUl = document.getElementById("friends_ul");
				friendsUl.innerHTML = "";

				data.mutual_friends.forEach(friend => {
					let li = document.createElement("li");
					li.textContent = friend.username;
					li.classList.add("friend-item");
					li.dataset.friendId = friend.id;
					friendsUl.appendChild(li);

					li.addEventListener("click", function () {
						openChat(friend.username, friend.id);
					});
				});
			} else {
				console.warn("T'a pas d'amis !!!");
			}
		})
		.catch(error => console.error("Error while getting friend list :", error));

	function openChat(username, friendId) {
		friendsList.style.display = "none"; 
		chatBox.style.display = "block"; 
		document.getElementById("chat_username").textContent = username; 

		document.getElementById("chat_messages").innerHTML = "<p>Loading messages with " + username + "...</p>";
	}

	backToFriends.addEventListener("click", function () {
		chatBox.style.display = "none";
		friendsList.style.display = "block";
	});

}