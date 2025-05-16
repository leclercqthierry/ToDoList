// Fonction utilitaire pour parser JJ/MM/AAAA en Date
export function parseDate(str) {
    if (!str) return null;
    const [day, month, year] = str.split("/");
    return new Date(`${year}-${month}-${day}`);
}
