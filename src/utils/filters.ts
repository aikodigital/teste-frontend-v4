function formattedDate(date: string) {
  const dateObj = new Date(date)

  const day = String(dateObj.getUTCDate()).padStart(2, '0')
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0') // Months are zero-based
  const year = String(dateObj.getUTCFullYear()).slice(-2)

  const hours = String(dateObj.getUTCHours()).padStart(2, '0')
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} às ${hours}:${minutes}`
}

export { formattedDate }
