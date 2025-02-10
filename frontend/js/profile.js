// async function displayProfile() {
//     const user = await getUserData();
//     if (user) 
document.getElementById("username").textContent = getCookie("username");
// }
// displayProfile()

// let username = document.getElementById("username").dataset.username;
// console.log("Username:", username);

// var ctx = document.getElementById('winChart').getContext('2d');
// var winChart = new Chart(ctx, {
// 	type: 'bar',
// 	data: {
// 		labels: ['Wins', 'Losses'],
// 		datasets: [{
// 			label: 'Game Stats',
// 			data: [180, 70],
// 			backgroundColor: ['#00ff88', '#ff4444'],
// 			borderColor: ['#00ff88', '#ff4444'],
// 			borderWidth: 1
// 		}]
// 	},
// 	options: {
// 		responsive: true,
// 		plugins: { legend: { display: false } }
// 	}
// });