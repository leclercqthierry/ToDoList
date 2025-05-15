/**
 * @description Classe représentant un élément de tâche.
 */

import { Task } from "./Task.js";

export class TaskItem {
    /**
     * @description Représente un élément de tâche dans l'interface utilisateur.
     * @private {Task} task - L'objet Task associé à cet élément.
     */
    #task;

    /**
     * @description Élément DOM représentant cet élément de tâche.
     * @private {HTMLElement} taskItem - Élément DOM de la tâche.
     */
    #taskItem;

    constructor(task) {
        this.#task = task;
        this.#taskItem = document.createElement("div");
        this.#taskItem.classList.add("task-item");

        this.#taskItem.innerHTML = `
            <div>
                <input type="checkbox" ${task.completed ? "checked" : ""}>
            </div>
            <div class="task-container">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>${task.category}</p>
                <p>${task.dueDate ? `Date de fin prévue: ${task.dueDate}` : "Aucune échéance définie"}</p>
            </div>
            <button class="delete-btn">Supprimer</button>
        `;

        // On ajoute un écouteur d'évènement pour la case à cocher
        this.#taskItem
            .querySelector("input")
            .addEventListener("change", (e) => {
                this.#task.completed = e.target.checked;
            });
    }

    getTaskItem() {
        return this.#taskItem;
    }

    getTask() {
        return this.#task;
    }
}
