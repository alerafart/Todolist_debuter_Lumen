const tasksList = {
    init: function() {
        tasksList.bindAllTasksEvents();
        tasksList.loadTasksFromApi();
    },
    /*
    dans taskList.js, coder une méthode bindAllTasksEvents appelant bindSingleTaskEvents sur chacune des tâches de la liste
    */
    bindAllTasksEvents: function() {
        // 4) On va récupérer la liste de toutes les tâches
        // Elles sont dans une div de classe tasks qui contient une div de classe task
        // Donc le sélecteur css '.tasks .task'
        const taskElementsList = document.querySelectorAll('.tasks .task');

        // Pour chaque élément de notre liste de tâches (donc chaque tâche)
        for(const taskElement of taskElementsList) {
            // 5) On va faire un bind sur CHACUNE des tâches de cette liste
            task.bindSingleTaskEvents(taskElement);
        }
    }, 

    loadTasksFromApi: function() {

        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        
        fetch(app.apiRootUrl + '/tasks', config)
        .then(function(response) {
            return response.json();
        })
        .then(function(taskListFromApi) {
            console.log(taskListFromApi);

            // On va récupérer chaque tâche de notre liste
            for(const taskRow of taskListFromApi) {
                // On a une méthode createTaskElement qui attend en param un title et une category
                const newTaskElement = task.createTaskElement(taskRow.title, taskRow.category.name, taskRow.id, taskRow.completion);

                // On insère notre tache à la liste des taches
                tasksList.insertTaskIntoTasksList(newTaskElement);
            }


        });
    },

    /**
     * Ajoute un élément de type task dans la liste de tâches
     * 
     * @param {HTMLElement} taskElement L'élément task à ajouter à la liste
     */
    insertTaskIntoTasksList: function(taskElement) {
        // 10-B) On ajoute la tache créée à la liste
        
        // On va récupérer la liste des taches
        const taskListElement = document.querySelector('.tasks');

        // On ajoute à la liste des taches la nouvelle tache (au début)
        // append: à la fin, prepend: au début
        taskListElement.prepend(taskElement);
    }
};