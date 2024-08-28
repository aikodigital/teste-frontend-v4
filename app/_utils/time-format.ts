export const formatDateTime = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return { day, time };
};