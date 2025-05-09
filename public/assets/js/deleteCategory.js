/**
 * Gère la suppression d'une catégorie
 */

const form = document.getElementById("deleteCategoryForm");
const categorySelect = document.getElementById("deleteCategory");

// On récupère les catégories stockées dans le localStorage
const categories = JSON.parse(localStorage.getItem("categories")) || [];

// On remplit le select avec les catégories
categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
});

// On supprime la catégorie sélectionnée
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedCategoryId = categorySelect.value;
    const selectedCategory = categories.find(
        (category) => String(category.id) === selectedCategoryId,
    );

    // Si la catégorie sélectionnée existe
    if (typeof selectedCategory !== "undefined") {
        // On supprime la catégorie du localStorage
        const updatedCategories = categories.filter(
            (category) => category.id !== selectedCategory.id,
        );
        console.log(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));

        // On supprime la catégorie du select
        const optionToRemove = categorySelect.querySelector(
            `option[value="${selectedCategoryId}"]`,
        );
        categorySelect.removeChild(optionToRemove);

        form.submit();
    }
});
