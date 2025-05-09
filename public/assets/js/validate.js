/**
 * Gère la validation des formulaires
 */

/**
 * Ajoute un message d'erreur sous le champ
 * @param {HTMLElement} field
 * @param {string} errorMessage
 * @returns {HTMLElement}
 */
export function addErrorMessage(field, errorMessage) {
    const error = document.createElement("p");
    error.classList.add("error");
    error.textContent = errorMessage;
    error.style.display = "none";
    field.insertAdjacentElement("afterend", error);
    return error;
}

/**
 * Valide le champ de texte et affiche un message d'erreur si l'entrée ne correspond pas à l'expression régulière
 * @param {HTMLElement} field
 * @param {string} regex
 * @param {HTMLElement} error
 */
export function validateTextField(field, regex, error) {
    field.addEventListener("input", () => {
        error.style.display = !regex.test(field.value) ? "block" : "none";
    });
}
