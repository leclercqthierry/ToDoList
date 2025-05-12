/**
 * @file handleCategory.js
 * @description Gère les catégories
 */

/**
 * @description Récupère toutes les catégories depuis le local storage ou retourne un tableau vide
 * @returns {Array} categories - Une liste d'objets contenant les catégories
 */
export function getAllCategoriesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("categories")) || [];
}

/**
 * @description Ajoute une catégorie au local storage
 * @param {Object} category - Un objet contenant les informations de la catégorie
 * @returns {void}
 */
export function addCategoryToLocalStorage(category) {
    const categories = getAllCategoriesFromLocalStorage();

    // On vérifie si la catégorie existe déjà
    let categoryExists =
        categories.length !== 0
            ? categories.some((cat) => cat.name === category.name)
            : false;

    if (!categoryExists) {
        // Si elle n'existe pas déjà on enregistre la catégorie dans le localStorage
        const newCategory = {
            id: Date.now(), // Utilisation de Date.now() pour générer un identifiant unique
            name: category.name,
        };

        categories.push(newCategory);
        localStorage.setItem("categories", JSON.stringify(categories));
    } // Si elle existe déjà la fonction ne fait rien
}

/**
 * @description Supprime une catégorie du local storage
 * @param {number} id - L'identifiant de la catégorie à supprimer
 * @returns {void}
 */
export function deleteCategoryFromLocalStorage(id) {
    const categories = getAllCategoriesFromLocalStorage();
    const updatedCategories = categories.filter(
        (category) => category.id !== id,
    );
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
}

/**
 * @description Ajoute les catégories au select
 * @param {HTMLSelectElement} selectElement - L'élément select dans lequel ajouter les catégories
 * @returns {void}
 */
export function addCategoriesToSelect(selectElement) {
    const categories = getAllCategoriesFromLocalStorage();

    // On crée les options du select à partir des catégories
    const categoryOptions = categories.map((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        return option;
    });

    // On trie les options par ordre alphabétique
    categoryOptions.sort((a, b) =>
        a.textContent.toLowerCase().localeCompare(b.textContent.toLowerCase()),
    );

    // On ajoute les options au select
    categoryOptions.forEach((option) => {
        selectElement.appendChild(option);
    });
}
