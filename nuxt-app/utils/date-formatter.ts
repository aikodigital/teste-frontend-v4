export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    hourCycle: 'h24',
  }).format(date);

  return formattedDate.replace(',', ' às');
};
