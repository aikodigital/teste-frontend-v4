export function getLastKnown<T extends { date: string }>(items: T[]): T | undefined {
  if (!items || items.length === 0) return undefined

  return items.reduce((latest, current) => {
    const latestDate = new Date(latest.date).getTime()
    const currentDate = new Date(current.date).getTime()
    return currentDate > latestDate ? current : latest
  }, items[0])
}
