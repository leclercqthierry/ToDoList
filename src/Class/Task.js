/**
 * Classe Task
 * Représente une tâche logique avec un titre, une description, une catégorie et une date d'échéance.
 * Cette classe gère la création d'une tâche et son état de complétion.
 */
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
        this.#id = Date.now(); // Utilisation de Date.now() pour générer un ID unique basé sur le timestamp actuel
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
}
