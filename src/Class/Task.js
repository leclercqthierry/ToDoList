/**
 * Classe Task
 * Représente une tâche logique avec un titre, une description, une catégorie et une date d'échéance.
 * Cette classe gère la création d'une tâche et son état de complétion.
 */

import { parseDate } from "../utilities/parseDate.js";

export class Task {
    #id;
    #title;
    #description;
    #dueDate;
    #category;
    #completed;

    /**
     * @constructor Crée une instance de la classe Task
     * @param {String} title
     * @param {String} description
     * @param {String} category
     * @param {String|null} dueDate
     */
    constructor(title, description, category, dueDate = null) {
        this.#title = title;
        this.#description = description;
        this.#category = category;
        this.#dueDate = dueDate ? dueDate : null; // Si aucune date d'échéance n'est fournie, elle est définie sur null
        // this.#id = 0;
        this.#completed = false; // Par défaut, la tâche n'est pas complétée
    }

    // Getters pour accéder aux propriétés privées
    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    get category() {
        return this.#category;
    }

    get completed() {
        return this.#completed;
    }

    // Setters pour modifier les propriétés privées
    set title(value) {
        this.#title = value;
    }

    set description(value) {
        this.#description = value;
    }

    set dueDate(value) {
        this.#dueDate = value;
    }

    set category(value) {
        this.#category = value;
    }

    set completed(value) {
        this.#completed = value;
    }

    /**
     * Convertit l'objet Task en JSON
     * @returns {Object} Représentation JSON de la tâche
     */
    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            category: this.#category,
            dueDate: this.#dueDate,
            completed: this.#completed,
        };
    }
    /**
     * Convertit un objet JSON en une instance de la classe Task
     * @param {Object} json - Représentation JSON de la tâche
     */
    static fromJSON(json) {
        return new Task(
            json.title,
            json.description,
            json.category,
            json.dueDate,
        );
    }

    /**
     * @description Ajoute la tâche à la liste des tâches dans le localStorage
     * Attention : l'objet stocké dans le localStorage est de type Object et non Task
     * @returns {void}
     */
    addTaskToLocalStorage() {
        // Récupérer les tâches existantes dans le localStorage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Vérifier si une tâche avec le même titre existe déjà
        const existingTask = tasks.find((task) => task.title === this.#title);
        if (!existingTask) {
            this.#id = tasks.length;
            tasks.push(this.toJSON());
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
    /**
     * @description Récupère le tableau de tâches JSON du local storage et le converti en tableau de tâches Task
     * @returns {Task[]} Un tableau d'objets Task
     */
    static getTasksList() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.map((task) => Task.fromJSON(task));
        // On défini les index des objets Task avec l'index du tableau JSON original
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].id = i;
        }
        return tasks;
    }

    /**
     * Filtre les tâches selon des critères définis
     * @param {Task[]} tasks - Tableau de tâches
     * @param {Object} filter - Filtre à appliquer
     * @property {string} filter.category - Filtrer par catégorie
     * @property {string} filter.status - Filtrer par statut ("completed" ou "notCompleted")
     * @returns {Task[]}
     */
    static filterTasks(tasks, filter) {
        return tasks.filter((task) => {
            let valid = true;
            if (filter.category === "Toutes") {
                filter.category = null;
            } else if (filter.category && task.category !== filter.category) {
                valid = false;
            }
            if (filter.status) {
                if (filter.status === "completed" && !task.completed) {
                    valid = false;
                }
                if (filter.status === "notCompleted" && task.completed) {
                    valid = false;
                }
            }
            return valid;
        });
    }

    /**
     * Trie les tâches selon le critère choisi
     * @param {Task[]} tasks - Tableau des tâches
     * @param {string} sortBy - Critère de tri ("alphabetique", "date", "status")
     *                          alphabétique par rapport au titre,
     *                          date par rapport à la date d'échéance (on considère une date non définie comme étant infinie),
     *                          status par rapport à l'état de la tâche (non complétée avant complétée)
     * @returns {Task[]}
     */
    static sortTasks(tasks, sortBy) {
        const tasksCopy = [...tasks]; // Pour ne pas modifier directement le tableau d'origine et faciliter les tests unitaires

        switch (sortBy) {
            case "alphabetical": // Trie par ordre alphabétique par rapport au titre
                tasksCopy.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "date":
                tasksCopy.sort((a, b) => {
                    const dateA = a.dueDate ? parseDate(a.dueDate) : Infinity;
                    const dateB = b.dueDate ? parseDate(b.dueDate) : Infinity;
                    return dateA - dateB;
                });
                break;
            case "status":
                tasksCopy.sort((a, b) => {
                    // On place les non complétées avant les complétées
                    return a.completed === b.completed
                        ? 0
                        : a.completed
                          ? 1
                          : -1;
                });
                break;
            default:
                // Aucun tri
                break;
        }
        return tasksCopy;
    }
}
