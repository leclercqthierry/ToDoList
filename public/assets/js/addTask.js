/**
 * @description Gère le formulaire d'ajout d'une tâche
 */
import {
    addCategoriesToSelect,
    getCategoryNameById,
} from "./handleCategory.js";
import { addErrorMessage, validateTextField } from "./validate.js";
import { Task } from "../../../src/Class/Task.js";

const categorySelect = document.getElementById("category");
addCategoriesToSelect(categorySelect);

const form = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("description");
const dueDate = document.getElementById("dueDate");

const regexTitle = /^[a-zA-Z0-9À-ÿ ,.!?-]{1,60}$/;
const regexDescription = /^[a-zA-Z0-9À-ÿ ,.!?()\-:;'"€$%@#\n]{1,500}$/;

const errorTitle = addErrorMessage(
    taskTitle,
    "Titre invalide (60 caractères max)",
    "afterend",
);

const errorDescription = addErrorMessage(
    taskDescription,
    "Description invalide (500 caractères max).",
    "afterend",
);

validateTextField(taskTitle, regexTitle, errorTitle);
validateTextField(taskDescription, regexDescription, errorDescription);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (
        !regexTitle.test(taskTitle.value) ||
        !regexDescription.test(taskDescription.value) ||
        categorySelect.value === ""
    ) {
        const errorForm = addErrorMessage(
            form,
            "Veuillez remplir correctement tous les champs obligatoires.",
            "beforeend",
        );
        errorForm.style.display = "block";
        setTimeout(() => {
            errorForm.remove();
        }, 3000);
        return;
    }
    if (dueDate.value !== "") {
        const date = new Date(dueDate.value);
        const today = new Date();
        if (date < today) {
            const errorDate = addErrorMessage(
                dueDate,
                "La date doit être supérieure à aujourd'hui.",
                "afterend",
            );
            errorDate.style.display = "block";
            setTimeout(() => {
                errorDate.remove();
            }, 3000);
            return;
        }
    }
    const task = new Task(
        taskTitle.value,
        taskDescription.value,
        getCategoryNameById(categorySelect.value),
        dueDate.value !== ""
            ? new Date(dueDate.value).toLocaleDateString("fr-FR")
            : null,
    );

    console.log(task);
});
