/* Notre module est en fait un objet! 'Ö' */
const app = {
    apiRootUrl: 'http://localhost:8080',
    // 2) Exécution de la méthode app.init
    // Je déclare la méthode init de mon objet app
    init: function() {
        console.log("init");
        // 3) On part dans la méthode init du fichier tasksList.js
        tasksList.init();
        newTaskForm.init();
        categoriesList.init();
    }
};

// 1) au moment où la page est chargée, on exécute la méthode app.init
document.addEventListener('DOMContentLoaded', app.init);
// exemple différent d'eventListener: bouton.addEventListener('click', app.maFonction);