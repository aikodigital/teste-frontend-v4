export function formatDate(isoDate: string): string | null {
  const date = new Date(isoDate)

  if (isNaN(date.getTime())) {
    return null
  }

  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()

  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}
