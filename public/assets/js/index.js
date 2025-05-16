import { addCategoriesToSelect } from "./handleCategory.js";
import { Task } from "../../../src/Class/Task.js";
import { TaskItem } from "../../../src/Class/TaskItem.js";

const taskListContainer = document.getElementById("taskList");
const categorySelect = document.getElementById("filterCategory");
const statusSelect = document.getElementById("filterStatus");
const sortSelect = document.getElementById("sortTasks");
addCategoriesToSelect(categorySelect);

// Fonction d'affichage des tâches filtrées et triées
function displayTasks() {
    // Nettoie la liste
    taskListContainer.innerHTML = "";

    // Récupère les filtres
    const filter = {
        category: categorySelect.value,
        status: statusSelect.value,
    };
    const sortBy = sortSelect.value;

    // Récupère les tâches
    let tasksList = Task.getTasksList();

    // Applique les filtres
    tasksList = Task.filterTasks(tasksList, filter);

    // Applique le tri
    tasksList = Task.sortTasks(tasksList, sortBy);

    // Affiche les tâches
    tasksList.forEach((task) => {
        const taskItem = new TaskItem(task);
        taskListContainer.appendChild(taskItem.getTaskItem());
        // Ajoute l'écouteur pour la suppression
        taskItem
            .getTaskItem()
            .querySelector(".delete-btn")
            .addEventListener("click", () => {
                // Supprime la tâche du localStorage
                const tasks = JSON.parse(localStorage.getItem("tasks") || []);
                const updatedTasks = tasks.filter(
                    (t) => t.title !== task.title,
                );
                // Réorganise les ids
                for (let i = 0; i < updatedTasks.length; i++) {
                    updatedTasks[i].id = i;
                }
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                // Rafraîchit l'affichage
                displayTasks();
            });

        // Ajoute l'écouteur pour le changement de statut
        taskItem
            .getTaskItem()
            .querySelector("input[type='checkbox']")
            .addEventListener("change", (event) => {
                task.completed = event.target.checked;

                // Met à jour le style de la tâche
                if (task.completed) {
                    taskItem.getTaskItem().classList.add("completed");
                } else {
                    taskItem.getTaskItem().classList.remove("completed");
                }

                // Met à jour le localStorage
                const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                const taskIndex = tasks.findIndex((t) => t.id === task.id);

                // S'il existe une tâche avec cet id, on la met à jour
                if (taskIndex !== -1) {
                    tasks[taskIndex].completed = task.completed; // Met à jour uniquement le statut
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                }
            });
    });
}

// Rafraîchit la liste au chargement
displayTasks();

// Rafraîchit la liste à chaque changement de filtre ou tri
categorySelect.addEventListener("change", displayTasks);
statusSelect.addEventListener("change", displayTasks);
sortSelect.addEventListener("change", displayTasks);
