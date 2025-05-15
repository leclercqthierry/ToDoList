import { addCategoriesToSelect } from "./handleCategory.js";
import { Task } from "../../../src/Class/Task.js";
import { TaskItem } from "../../../src/Class/TaskItem.js";

const taskListContainer = document.getElementById("taskList");
const categorySelect = document.getElementById("filterCategory");
addCategoriesToSelect(categorySelect);

// On récupère les tâches depuis le localStorage
const tasks =
    JSON.parse(localStorage.getItem("tasks")) ||
    []; /* Attention task est un tableau d'objets classique pas d'objets Task !! */
const tasksList = tasks.map(
    (task) =>
        new Task(task.title, task.description, task.category, task.dueDate),
); // Maintenant tasks est un tableau d'objets Task

// On crée les éléments de tâche dans le DOM
tasksList.forEach((task) => {
    const taskItem = new TaskItem(task);
    taskListContainer.appendChild(taskItem.getTaskItem());
    // On ajoute un écouteur d'événement pour le bouton de suppression
    taskItem
        .getTaskItem()
        .querySelector(".delete-btn")
        .addEventListener("click", () => {
            // On supprime la tâche du localStorage
            const updatedTasks = tasks.filter((t) => t.id !== task.id);

            // et on réorganise le tableau
            for (let i = 0; i < updatedTasks.length; i++) {
                updatedTasks[i].id = i;
            }
            // On met à jour le localStorage
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));

            // On supprime l'élément du DOM
            taskListContainer.removeChild(taskItem.getTaskItem());
        });
});
