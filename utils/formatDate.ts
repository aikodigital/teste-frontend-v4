export function formatIsoToBrDate(dateString: string | undefined, includeTime: boolean = false): string {
  if (dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Data inválida");
    }

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    if (includeTime) {
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");


      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return `${day}/${month}/${year}`;
  }

  return '-'
}