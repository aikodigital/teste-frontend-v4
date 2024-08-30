export const dateFormatter = (date: string) => {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
  return formatter.format(new Date(date))
}
