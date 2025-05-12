/**
 * Gère la validation des formulaires
 */

/**
 * Ajoute un message d'erreur sous le champ
 * @param {HTMLElement} field - Le champ
 * @param {string} errorMessage - Le message d'erreur
 * @param {string} place - La position de l'erreur
 * @returns {HTMLElement} - L'élément de message d'erreur
 */
export function addErrorMessage(field, errorMessage, place) {
    const error = document.createElement("p");
    error.classList.add("error");
    error.textContent = errorMessage;
    error.style.display = "none";
    field.insertAdjacentElement(place, error);
    return error;
}

/**
 * Valide le champ de texte et affiche un message d'erreur si l'entrée ne correspond pas à l'expression régulière
 * @param {HTMLElement} field - Le champ de texte à valider
 * @param {string} regex - L'expression régulière à tester
 * @param {HTMLElement} error - L'élément de message d'erreur
 */
export function validateTextField(field, regex, error) {
    field.addEventListener("input", () => {
        error.style.display = !regex.test(field.value) ? "block" : "none";
    });
}
