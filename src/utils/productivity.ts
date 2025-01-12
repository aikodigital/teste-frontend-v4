import type { States } from '@/types'
import dayjs from 'dayjs'

export const calculateProductivity = (operatingHours: number, totalHours: number): number => {
  if (operatingHours < 0 || totalHours <= 0 || operatingHours > totalHours) {
    throw new Error('Operating hour values   or total hours are not valid.')
  }

  const productivity = (operatingHours / totalHours) * 100

  return parseFloat(productivity.toFixed(2))
}

export const calculateTotalHours = (year: number, month?: number): number => {
  if (month) {
    const daysInMonth = dayjs(`${year}-${month}`, 'YYYY-M').daysInMonth()
    return daysInMonth * 24
  } else {
    let totalHours = 0
    for (let i = 1; i <= 12; i++) {
      const daysInMonth = dayjs(`${year}-${i}`, 'YYYY-M').daysInMonth()
      totalHours += daysInMonth * 24
    }
    return totalHours
  }
}

export const calculateTotalOperatingTime = (states: States[], operatingStateId: string): number => {
  let totalOperatingTime = 0
  let lastTimestamp: dayjs.Dayjs | null = null

  for (const currentStatus of states) {
    const currentTimestamp = dayjs(currentStatus.date)

    if (currentStatus.equipmentStateId === operatingStateId && lastTimestamp !== null) {
      totalOperatingTime += currentTimestamp.diff(lastTimestamp, 'millisecond')
    }

    lastTimestamp = currentTimestamp
  }

  return totalOperatingTime / (1000 * 60 * 60)
}

export const calculateDailyProductivity = (
  states: States[],
  operatingStateId: string,
): { date: string; hours: number }[] => {
  const result: Record<string, number> = {}
  let lastTimestamp: dayjs.Dayjs | null = null

  for (const currentStatus of states) {
    const currentTimestamp = dayjs(currentStatus.date)
    const currentDate = currentTimestamp.format('YYYY-MM-DD')

    if (currentStatus.equipmentStateId === operatingStateId && lastTimestamp !== null) {
      const timeDiff = currentTimestamp.diff(lastTimestamp, 'millisecond')
      result[currentDate] = (result[currentDate] || 0) + timeDiff
    }

    lastTimestamp = currentTimestamp
  }

  return Object.keys(result).map((date) => ({
    date,
    hours: result[date] / (1000 * 60 * 60),
  }))
}
