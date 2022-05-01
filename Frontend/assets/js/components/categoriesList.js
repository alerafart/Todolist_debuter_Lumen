const categoriesList = {
    init: function() {
        categoriesList.loadCategoriesFromAPI();
    },
    loadCategoriesFromAPI: function() {
        console.log('Je suis dans ma méthode loadCategoriesFromAPI');

        // On prépare la configuration de la requête HTTP
        let config = {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache'
        };
        
        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch(app.apiRootUrl + '/categories', config)
          // Ensuite, lorsqu'on reçoit la réponse au format JSON
          .then(function(response) {
            // On convertit cette réponse en un objet JS et on le retourne
            return response.json();
          })
          // Ce résultat au format JS est récupéré en argument ici-même
          .then(function(categoriesFromApi) {
            // On dispose désormais d'un tableau JS exploitable dans la variable data
            // La suite dépend de l'utilisation qu'on veut faire de ces données
            // Là, c'est juste un exemple…
            console.log(categoriesFromApi);
            // On a notre liste de catégories
            

            /*---------------------------------------------------------------------------*/
            /*                               Premier select                              */
            /*---------------------------------------------------------------------------*/

            // Option par défaut: 'Toutes les catégories' class: 'filters__choice'
            let defaultOption = "Toutes les catégories";
            let className = "filters__choice";

            const firstSelectElement = categoriesList.createSelectCategoriesElement(categoriesFromApi, defaultOption, className);

            // categoriesList.createSelectCategoriesElement(categoriesFromApi, "Toutes les catégories", "filters__choice");

            // On récupère la div où on va insérer notre select: classe: filters__task--category
            const divSelectHeaderElement = document.querySelector('.filters__task--category');

            // On insère notre select dans notre div
            divSelectHeaderElement.append(firstSelectElement);


            /*---------------------------------------------------------------------------*/
            /*                               Second select                               */
            /*---------------------------------------------------------------------------*/

            // Création du select (option par défaut: 'Choisir une catégorie')
            const secondSelectElement = categoriesList.createSelectCategoriesElement(categoriesFromApi, 'Choisir une catégorie');

            // Position de notre second select, classes: .task--add .task__category .select
            // Récupération de la div dans laquelle on va insérer notre select:
            const divSelectAddSectionElement = document.querySelector(".task--add .task__category .select");

            // On insère notre select dans notre div
            divSelectAddSectionElement.append(secondSelectElement);

          });
    }, 

    /**
     * 
     * @param {Array} listOfCategories 
     * @param {String} defaultOption 
     * @param {String|null} classNames 
     * @returns 
     */
    createSelectCategoriesElement: function(listOfCategories, defaultOption, classNames = '') {

        // Création de l'élément select (il ne s'affiche pas pour le moment mais on peut l'utiliser)
        const selectCategoriesElement = document.createElement('select');

        // Si on a une ou des classes en paramètre de la fonction, 
        if(classNames !== '') {
            // On les ajoute à notre select créé précédemment
            selectCategoriesElement.classList.add(classNames);
        }

        // On crée l'option par défaut du select
        // Créer un nouvel élément option
        const defaultOptionElement = document.createElement('option');

        // Modifier le contenu texte de cette option
        defaultOptionElement.textContent = defaultOption;

        // On ajoute notre option par défaut au select créé précédemment
        selectCategoriesElement.append(defaultOptionElement);

        // Pour chaque catégorie de notre liste listOfCategories
        for(let category of listOfCategories) {
            // On crée un élément option
            const optionElement = document.createElement('option');

            // On modifie son libellé
            optionElement.textContent = category.name;

            // On modifie sa valeur
            optionElement.value = category.id;

            // On ajoute la nouvelle option au select
            selectCategoriesElement.append(optionElement);
        }

        return selectCategoriesElement;
    }
};