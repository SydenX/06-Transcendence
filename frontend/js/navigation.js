// Fonction pour charger le contenu selon le hash
function loadContentFromHash() {
	const hash = location.hash.slice(1); // Retire le "#"
	let path = hash || 'game';
	// Charger le contenu en fonction de 'path'
	// Par exemple, en utilisant $.load() ou fetch()
	$('#content').load(path + '.html', function(response, status) {
	  if (status === "error") {
		$('#content').html("<p>Error loading page.</p>");
	  }
	});
}
  
// Navigation en modifiant le hash
function navigateTo(path) {
	location.hash = path;
}
  
// Écouter l'événement de changement de hash
window.addEventListener('hashchange', loadContentFromHash);
  
// Au chargement de la page
$(document).ready(function() {
	loadContentFromHash();
	// Intercepter les clics sur les liens
	$(document).on('click', '[data-link]', function(e) {
	  e.preventDefault();
	  const url = $(this).attr('href');
	  navigateTo(url.replace('/', '')); // par exemple: '/page1' => 'page1'
	});
});