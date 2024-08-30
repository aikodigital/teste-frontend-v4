export function formatToPrettyStringDate(stringDate: string): string {
  const date = new Date(stringDate)
  const formattedLocaleDate = date.toLocaleDateString()
  const formattedLocaleTime = date.toLocaleTimeString()

  return `${formattedLocaleDate} ${formattedLocaleTime}`
}

export function formatInputDateToISOString(stringDate: string): string {
  return new Date(`${stringDate} 00:00:00`).toISOString()
}

export function formatToNextDayISOString(stringDate: string): string {
  const millisecondsPerDay = 1000 * 60 * 60 * 24

  return new Date(new Date(stringDate).getTime() + millisecondsPerDay).toISOString()
}

export function calculateHoursByInterval(start: Date, end: Date): number {
  const millisecondsPerHour = 1000 * 60 * 60

  return (end.getTime() - start.getTime()) / millisecondsPerHour
}
