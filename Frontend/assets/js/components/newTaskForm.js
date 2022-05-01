const newTaskForm = {
    init: function() {
        // On veut écouter la soumission du fomulaire
        const taskFormElement = document.querySelector('.task--add form');

        // 1-B) Lors de la soumission on exécutera la méthode newTaskForm.handleNewTaskFormSubmit
        taskFormElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);

    },
    handleNewTaskFormSubmit: function(evt) {
        // On désactive le fonctionnement par défaut
        evt.preventDefault();

        console.log('On a ajouté une tache');
        // On récupère notre formulaire
        const newTaskFormElement = evt.currentTarget;

        // Récupération du titre de la tâche (classe task__title-field)
        const newTaskTitleElement = newTaskFormElement.querySelector('.task__title-field');
        const newTaskTitle = newTaskTitleElement.value;
        console.log(newTaskTitle);

        // Récupération de la catégorie de la tâche
        // On veut l'élément select inclus dans la div qui a la classe task__category
        const newTaskCategoryElement = newTaskFormElement.querySelector('.task__category select');

        // On sera amenés à modifier cette partie quand on utilisera des data
        // const newTaskCategory = newTaskCategoryElement.value;

        // Comme on a mis en value l'id, on doit à présent récupérer la valeur du texte contenu et non plus la value. 
        // Il faut donc trouver la valeur actuellement sélectionnée
        const newTaskCategory = newTaskCategoryElement.querySelector('option:checked').textContent;

        const newTaskCategoryId = newTaskCategoryElement.querySelector('option:checked').value;

        console.log('Catégorie sélectionnée: ' + newTaskCategoryId);

        console.log(newTaskCategory);

        // On ajoute notre task en BDD en passant par l'API

        // On stocke les données à transférer
        const data = {
            title: newTaskTitle,
            categoryId: newTaskCategoryId,
            completion: 0,
            status: 1
        };
        
        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
        
        // Exécuter la requête HTTP avec FETCH
        fetch(app.apiRootUrl + '/tasks', fetchOptions)
        .then(
            function(response) {
                // console.log(response);
                // Si HTTP status code à 201 => OK
                if (response.status == 201) {
                    return response.json();
                }
                else {
                    console.log('L\'ajout a échoué');
                }
            }
        )
        .then(function(taskFromApi) {
            console.log(taskFromApi);
            // 2-B) Ajouter la nouvelle task
            // 8-B) On récupère la nouvelle task dans une constante (taskElementCreated)
            const taskElementCreated = task.createTaskElement(taskFromApi.title, taskFromApi.category.name, taskFromApi.id, taskFromApi.completion);
            // 9-B) On ajoute la task créée à la liste
            tasksList.insertTaskIntoTasksList(taskElementCreated);
            console.log('Ajout effecuté');
        }) 


    }
};