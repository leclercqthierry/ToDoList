/**
 * Gère le formulaire d'ajout de catégorie et enregistre la catégorie dans le localStorage
 */

// Importation de la fonction addErrorMessage et validateTextField
import { addErrorMessage, validateTextField } from "./validate.js";

// Récupération des éléments du DOM
const form = document.getElementById("categoryForm");
const categoryNameInput = document.getElementById("categoryName");
const errorMessage = addErrorMessage(
    categoryNameInput,
    "Le nom de la catégorie doit contenir entre 3 et 20 caractères.",
);
const regex = /^[a-zA-Z0-9]{3,20}$/;

validateTextField(categoryNameInput, regex, errorMessage);

form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Vérification de la validité du champ de texte
    if (!regex.test(categoryNameInput.value)) {
        errorMessage.style.display = !regex.test(categoryNameInput.value)
            ? "block"
            : "none";
    } else {
        // On vérifie si la catégorie existe déjà
        const categories = JSON.parse(localStorage.getItem("categories")) || [];
        let categoryExists =
            categories.length !== 0
                ? categories.some(
                      (category) => category.name === categoryNameInput.value,
                  )
                : false;

        if (!categoryExists) {
            // On enregistre la catégorie dans le localStorage
            const newCategory = {
                id: categories.length + 1,
                name: categoryNameInput.value,
            };

            categories.push(newCategory);
            localStorage.setItem("categories", JSON.stringify(categories));
            form.submit();
        } else {
            // Afficher un message d'erreur si la catégorie existe déjà
            const errorForm = addErrorMessage(
                categoryNameInput,
                "Cette catégorie existe déjà.",
            );

            errorForm.style.display = "block";

            // Masquer le message d'erreur après 2 secondes
            setTimeout(() => {
                errorForm.textContent = "";
            }, 2000);
        }
    }
});
