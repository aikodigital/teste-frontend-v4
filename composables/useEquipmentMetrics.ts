import { STATE } from '~/constants/state'
import type { Equipment } from '~/types/types'

export function useEquipmentMetrics(equipment: Equipment) {
  const stateHistory = computed(() => equipment.stateHistory)
  const { model } = useGetModel(equipment.modelId)
  const modelHourlyEarnings = computed(() => model.value?.hourlyEarnings)

  const totalAndOperatingHours = computed(() => {
    let totalTimeInMs = 0
    let totalOperatingTimeMs = 0

    for (let i = 0; i < stateHistory.value.length - 1; i++) {
      const currentEntry = stateHistory.value[i]
      const nextEntry = stateHistory.value[i + 1]
      const currentDate = new Date(currentEntry.date)
      const nextDate = new Date(nextEntry.date)

      const timeDiff = nextDate.getTime() - currentDate.getTime()
      totalTimeInMs += timeDiff

      if (currentEntry.equipmentStateId === STATE.OPERATING) {
        totalOperatingTimeMs += timeDiff
      }
    }

    const totalTimeHours = totalTimeInMs / (1000 * 60 * 60)
    const totalOperatingTimeHours = totalOperatingTimeMs / (1000 * 60 * 60)

    return {
      totalHours: totalTimeHours,
      totalOperatingHours: totalOperatingTimeHours,
    }
  })

  const productivity = computed(() => {
    return ((totalAndOperatingHours.value.totalOperatingHours / totalAndOperatingHours.value.totalHours) * 100).toFixed(2)
  })

  const calcEquipmentGains = computed(() => {
    const earningsMap = {} as Record<string, number>

    modelHourlyEarnings.value?.forEach((earning) => {
      earningsMap[earning.equipmentStateId] = earning.value
    })

    let total = 0

    for (let i = 0; i < stateHistory.value.length - 1; i++) {
      const event = stateHistory.value[i]
      const nextEvent = stateHistory.value[i + 1]

      if (earningsMap[event.equipmentStateId]) {
        const earningRate = earningsMap[event.equipmentStateId] || 0
        const startTime = new Date(event.date)
        const endTime = new Date(nextEvent.date)
        const durationInHours = (+endTime - +startTime) / (1000 * 60 * 60)

        total += earningRate * durationInHours
      }
    }

    return total
  })

  return {
    productivity,
    calcEquipmentGains,
  }
}
