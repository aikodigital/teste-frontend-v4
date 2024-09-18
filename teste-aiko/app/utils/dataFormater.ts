export const dataFormater = (data: string) => {
  const formatedData = new Date(data);
  return formatedData.toLocaleString('pt-BR', {
    timeZone: 'UTC',
    hour12: false,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}