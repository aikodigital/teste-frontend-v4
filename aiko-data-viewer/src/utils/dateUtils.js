import dayjs from 'dayjs'

export function getStartAndEndOfDay(date) {
  const startOfDay = dayjs(date).startOf('day').subtract(3, 'hour')
  const endOfDay = dayjs(date).endOf('day').subtract(3, 'hour')
  return { startOfDay, endOfDay }
}

export function calculateHoursDifference(start, end) {
  return dayjs(end).diff(dayjs(start), 'hour', true)
}
