export function formatDate(date?: string) {
  if (!date) return ''
  const dateValue = new Date(date)
  return new Intl.DateTimeFormat('pt-BR').format(dateValue)
}

export function formatHours(date?: string) {
  if (!date) return ''
  const dateValue = new Date(date)
  return new Intl.DateTimeFormat('pt-BR', {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(dateValue)
}