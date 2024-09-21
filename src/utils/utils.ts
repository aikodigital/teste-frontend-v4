export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

     // Correção do fuso horário.
    date.setHours(date.getHours() + 3);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
};