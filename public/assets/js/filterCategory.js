/**
 * Récupération des catégories depuis le localStorage
 * et ajout des options au select de filtrage
 */

const categorySelect = document.getElementById("filterCategory");

// on vérifie si le localStorage contient des catégories
const categories = JSON.parse(localStorage.getItem("categories")) || [];

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
    categorySelect.appendChild(option);
});
