const task = {
    bindSingleTaskEvents: function(taskElement) {

        // 6) On crée les espions (eventListeners) sur la task définie en paramètre
        /*---------------------------------------------------------------------------*/
        /*                                 Label Task                                */
        /*---------------------------------------------------------------------------*/
        // On récupère le label de la task
        const taskTitleElement = taskElement.querySelector('.task__title-label');

        // Ecouteur d'event sur le titre de la task
        taskTitleElement.addEventListener('click', task.handleEnableTaskTitleEditMode);

        // On veut que notre input (classe task__title-field) se ferme lorsqu'on clique en dehors
        const taskTitleFieldElement = taskElement.querySelector('.task__title-field');


        /*---------------------------------------------------------------------------*/
        /*                             Validation Edition                            */
        /*---------------------------------------------------------------------------*/

        // On crée un écouteur d'event sur l'input quand on perd le focus (blur)
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
        taskTitleFieldElement.addEventListener('blur', task.handleValidateNewTaskTitle);

        // Quand on appuie sur la touche entrée dans notre input, on valide le titre
        taskTitleFieldElement.addEventListener('keydown', task.handleValideNewTaskTitleOnEnterKey);

        /*---------------------------------------------------------------------------*/
        /*                                 Boutons                                   */
        /*---------------------------------------------------------------------------*/

        // On récupère le bouton de modification
        const taskEditBtnElement = taskElement.querySelector('.task__button--modify');

        // On appelle la fonction d'ouverture de la tâche de modification
        taskEditBtnElement.addEventListener('click', task.handleEnableTaskTitleEditMode);

        // On pose un écouteur d'évènement sur le bouton de complétion de la tâche (task__button--validate)
        const taskCompleteButtonElement = taskElement.querySelector('.task__button--validate');

        taskCompleteButtonElement.addEventListener('click', task.handleCompleteTask);

        // On récupère le bouton de rewind
        const taskRewindButtonElement = taskElement.querySelector('.task__button--incomplete');
        taskRewindButtonElement.addEventListener('click', task.handleIncompleteTask);
    },
    handleEnableTaskTitleEditMode: function(event) {
        console.log('On est dans la méthode handleEnableTaskTitleEditMode');

        // Récupération de l'élément sur lequel l'evenement vient d'avoir lieu
        const taskTitleDisplayElement = event.currentTarget;

        // On récupère l'élément le plus proche du dom qui contient la classe task
        const taskElementToEdit = taskTitleDisplayElement.closest('.task');

        // On modifie la classe 
        taskElementToEdit.classList.add('task--edit');

        // Bonus UX : on met le focus sur le champ input pour pouvoir directement modifier le nom
        // de la tâche sans avoir à cliquer dans le champ
        let titleTask = taskElementToEdit.querySelector('.task__title-field');
        titleTask.focus();
        // Si on veut placer le curseur à la fin il faut réécrire la chaîne
        let val = titleTask.value; // On stocke la valeur de l'élément
        titleTask.value = ''; // On vide l'élément
        titleTask.value = val; // On réécrit la valeur dans l'élément

    },
    handleValidateNewTaskTitle: function(event) {

        console.log('J\'ai validé ma tâche');
        /*
        cacher l'input
        récupérer l'élément contenant le titre avec node.previousElementSibling ou node.nextElementSibling selon votre structure HTML.
        modifier le contenu texte de cet élément
        et afficher cet élément
        */

        // On récupère l'élément sur lequel l'évènement vient d'avoir lieu
        const taskTitleFieldElement = event.currentTarget;

        // On récupère la valeur de l'input
        const newTaskTitle = taskTitleFieldElement.value;

        // On récupère l'élément le plus proche du dom qui contient la classe task
        const taskElementToEdit = taskTitleFieldElement.closest('.task');

        // On récupère l'id de notre task
        const taskId = taskElementToEdit.dataset.id;

        // On stocke les données à transférer
        const data = {
            title: newTaskTitle
        };
        
        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
        
        // Exécuter la requête HTTP avec FETCH
        fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                // console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                    // task__title-label
                    const taskLabelElement = taskElementToEdit.querySelector('.task__title-label');

                    taskLabelElement.textContent = newTaskTitle;

                    // On retire la classe d'edition
                    taskElementToEdit.classList.remove('task--edit');
                }
                else {
                    console.log('Titre non modifié');
                }
            }
        )

    },
    handleValideNewTaskTitleOnEnterKey: function(event) {
        // Pour savoir sur quelle touche on a appuyé, on utilise event.key
        console.log(event.key);

        // Si la touche sur laquelle j'ai appuyé est entrée
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
        if(event.key === 'Enter') {
            task.handleValidateNewTaskTitle(event);
        }
    },
    handleCompleteTask: function(event) {
        console.log('Tâche complétée!');
        // Récupération de l'élément sur lequel l'event vient d'avoir lieu
        const taskButtonCompleteElement = event.currentTarget;

        // On récupère l'élément parent le plus proche avec la classe task
        const taskElement = taskButtonCompleteElement.closest('.task');

        // La méthode à utiliser est PATCH
        // L'enpoint est /tasks/id
        const taskId = taskElement.dataset.id;

        // Mise à jour via l'API
        // On stocke les données à transférer
        const data = {
            completion: 100
        };
        
        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
        
        // Exécuter la requête HTTP avec FETCH
        fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                // console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                    console.log('Modification de completion OK');
                    // On modifie la task pour la passer en completion 100%
                    task.updateTaskCompletion(taskElement, 100);
                }
                else {
                    console.log('La modification a échoué');
                }
            }
        )

    },
    handleIncompleteTask: function(event) {
        // On récupère le bouton cible de notre click
        const buttonIncompleteElement = event.currentTarget;

        // On récupère la tache sur laquelle se situe le bouton
        const taskElement = buttonIncompleteElement.closest('.task');

        // On récupère l'id de la tache
        const taskId = taskElement.dataset.id;

        // Mise à jour via l'API
        // On stocke les données à transférer
        const data = {
            completion: 0
        };
        
        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
        
        // Exécuter la requête HTTP avec FETCH
        fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                // console.log(response);
                // Si HTTP status code à 200 => OK
                if (response.status == 200) {
                    console.log('Modification de completion OK');
                    // On modifie la task pour la passer en completion 100%
                    task.updateTaskCompletion(taskElement, 0);
                }
                else {
                    console.log('La modification a échoué');
                }
            }
        )
    },
    /**
     * Méthode qui va permettre de créer une nouvelle task depuis le template
     * Tout en renseignant les infos de la nouvelle task
     * 
     * @param {String} taskTitle Le titre de la task à créer
     * @param {String} taskCategory Le nom de la category de la task à créer
     * 
     * @return {task} newTaskElement
     */
    createTaskElement: function(taskTitle, taskCategory, taskId, taskCompletion) {
        // Notre template a un id #task-template

        // On récupère notre élément template
        const templateElement = document.querySelector('#task-template');

        // On clone notre template AVEC ses enfants (on crée une nouvelle task en todo)
        const newTaskElement = templateElement.content.cloneNode(true);

        // 3-B) On modifie le titre de la tache
        task.updateTaskTitle(newTaskElement, taskTitle);

        // 5-B) On modifie la catégorie de la tache
        task.updateTaskCategoryName(newTaskElement, taskCategory);

        // On modifie l'id de la tache dans un dataset
        task.updateTaskId(newTaskElement, taskId);
        
        console.log('dataset-id:' + newTaskElement.querySelector('.task').dataset.id);

        // On ajoute le bind des events sur notre tache
        task.bindSingleTaskEvents(newTaskElement);

        task.updateTaskCompletion(newTaskElement.querySelector('.task'), taskCompletion);
        
        // 7-B) On retourne l'élément task créé 
        // (dans notre première utilisation il nous sert à récupérer la task dans une constante dans newTaskForm)
        return newTaskElement;
    },
    /**
     * Méthode mettant à jour le titre d'une tâche
     * 
     * @param {Element} taskToUpdateElement
     * @param {String} taskTitle
     */
    updateTaskTitle: function(taskToUpdateElement, taskTitle) {
        // 4-B) Modification du titre

        // On récupère l'élément titre (classe: task__title-label)
        const titleToUpdateTaskElement = taskToUpdateElement.querySelector('.task__title-label');

        // On modifie le contenu texte de cet élément
        titleToUpdateTaskElement.textContent = taskTitle;

        // Pour l'edit on doit aussi modifier l'input (classe task__title-field)

        // On récupère l'input
        const inputEditElement = taskToUpdateElement.querySelector('.task__title-field');

        // On modifie sa valeur
        inputEditElement.value = taskTitle;

        // Autre manière d'écrire:
        // newTaskElement.querySelector('.task__title-field').value = taskTitle;
    },
    /**
     * Méthode mettant à jour le nom de catégorie d'une tache
     * 
     * @param {Element} taskToUpdateElement
     * @param {String} taskCategory
     */
    updateTaskCategoryName: function(taskToUpdateElement, taskCategory) {
        // 6-B) On modifie le nom de catégorie de la tache

        // On récupère l'élément catégorie (classe: task__category)
        const categoryToUpdateTaskElement = taskToUpdateElement.querySelector('.task__category p');

        // On modifie le contenu texte de cet élément
        categoryToUpdateTaskElement.textContent = taskCategory;

        // On modifie le dataset category avec le nom de la catégorie
        taskToUpdateElement.querySelector('.task').dataset.category = taskCategory;

        // Equivalent: 
        //taskToUpdateElement.querySelector('.task').setAttribute('data-category', taskCategory);
    },
    updateTaskId: function(taskToUpdateElement, taskId) {
        // dataset.id correspond à data-id dans task
        taskToUpdateElement.querySelector('.task').dataset.id = taskId;

        // Equivalent:
        // taskToUpdateElement.querySelector('.task').setAttribute('data-id', taskId);
    },
    updateTaskCompletion: function(taskElement, completion) {

        // Modification du taux de completion
        if(completion == 100) {
            // On retire la classe task--todo
            taskElement.classList.remove('task--todo');
    
            // Puis on rajoute la classe task--complete
            taskElement.classList.add('task--complete');
        } else {
            // On supprime la class 'task--complete'
            taskElement.classList.remove('task--complete');

            // On ajoute la classe en "task--todo"
            taskElement.classList.add('task--todo');
        }
    }
};