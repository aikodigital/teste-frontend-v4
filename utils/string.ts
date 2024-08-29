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

export function formatFromStringToHashColorHex(value: string): string {
  const hash = Math.abs(Array.from(value).reduce((hash, char) => {
    return char.charCodeAt(0) + 6 * hash
  }, 0)) % 0xFFFFFF

  return `#${hash.toString(16).padStart(6, '0')}`
}
