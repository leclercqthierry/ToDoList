/**
 * @description Gère les formulaires d'ajout et de suppression de catégories
 */

import { addErrorMessage, validateTextField } from "./validate.js";
import {
    addCategoryToLocalStorage,
    addCategoriesToSelect,
    deleteCategoryFromLocalStorage,
    getAllCategoriesFromLocalStorage,
} from "./handleCategory.js";

const addForm = document.getElementById("addCategoryForm");
const deleteForm = document.getElementById("deleteCategoryForm");
const categoryNameInput = document.getElementById("categoryName");
const categorySelect = document.getElementById("deleteCategory");
const errorMessage = addErrorMessage(
    categoryNameInput,
    "Le nom de la catégorie doit contenir entre 3 et 20 caractères.",
    "afterend",
);
const regex = /^[a-zA-Z0-9]{3,20}$/;

validateTextField(categoryNameInput, regex, errorMessage);

addForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Vérification de la validité du champ de texte
    if (!regex.test(categoryNameInput.value)) {
        errorMessage.style.display = !regex.test(categoryNameInput.value)
            ? "block"
            : "none";
    } else {
        addCategoryToLocalStorage({
            name: categoryNameInput.value,
        });
        addForm.submit();
    }
});

addCategoriesToSelect(categorySelect);

// On supprime la catégorie sélectionnée
deleteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const categories = getAllCategoriesFromLocalStorage();
    const selectedCategoryId = categorySelect.value;
    const selectedCategory = categories.find(
        (category) => String(category.id) === selectedCategoryId,
    );

    // Si la catégorie sélectionnée existe
    if (typeof selectedCategory !== "undefined") {
        // On supprime la catégorie du localStorage
        deleteCategoryFromLocalStorage(selectedCategory.id);

        // On supprime la catégorie du select
        const optionToRemove = categorySelect.querySelector(
            `option[value="${selectedCategoryId}"]`,
        );
        categorySelect.removeChild(optionToRemove);

        deleteForm.submit();
    }
});
