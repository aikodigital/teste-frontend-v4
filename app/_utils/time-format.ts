export const formatDateTime = (date: string) => {
  const dateObj = new Date(date);
  return `Dia: ${dateObj.toLocaleDateString()} às ${dateObj.toLocaleTimeString()}`;
};