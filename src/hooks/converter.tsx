export function converterDate(timestamp: string) {
    const date = new Date(timestamp)
    const day = date.getDate().toString().padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hour = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const formattedDate = `${day}/${month}/${year} - ${hour}:${minutes}`

    return formattedDate;
}