export function getFirstOrNull<T>(array: T[]): T | null {
  return array.length ? array[0] : null
}
