export function formatFromRawStringDateToPrettyStringDate(stringDate: string): string {
  const date = new Date(stringDate)
  const formattedLocaleDate = date.toLocaleDateString()
  const formattedLocaleTime = date.toLocaleTimeString()

  return `${formattedLocaleDate} ${formattedLocaleTime}`
}

export function formatFromNumberToStringPercentage(value: number): string {
  const formattedValue = (value * 100).toFixed(2)

  return  `${formattedValue}%`
}
