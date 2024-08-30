export function formatNumberToStringPercentage(value: number): string {
  const formattedValue = (value * 100).toFixed(2)

  return  `${formattedValue}%`
}

export function generateHashColorHex(value: string): string {
  const hash = Math.abs(Array.from(value).reduce((hash, char) => {
    return char.charCodeAt(0) + 6 * hash
  }, 0)) % 0xFFFFFF

  return `#${hash.toString(16).padStart(6, '0')}`
}
