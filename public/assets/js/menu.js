/**
 * Menu burger
 * @description Gère l'affichage du menu burger sur mobile
 */

document.getElementById("menu-toggle").addEventListener("click", function () {
    const menu = document.getElementById("menu");
    const bar1 = document.getElementById("bar1");
    const bar2 = document.getElementById("bar2");
    const bar3 = document.getElementById("bar3");

    // Vérification pour mobile
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");

    // Animation du bouton burger en croix
    bar1.classList.toggle("rotate-45");
    bar1.classList.toggle("translate-y-2");
    bar3.classList.toggle("-rotate-45");
    bar3.classList.toggle("-translate-y-2");
    bar2.classList.toggle("opacity-0");
});
