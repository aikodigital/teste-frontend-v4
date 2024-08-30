export function getLastRegister(items: {date: string}[]) {
  return items.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  })
}