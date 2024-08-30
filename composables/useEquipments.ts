import type Equipment from "~/types/Equipment"
import type EquipmentModel from "~/types/EquipmentModel"
import type EquipmentModelHourlyEarning from "~/types/EquipmentModelHourlyEarning"
import type EquipmentPosition from "~/types/EquipmentPosition"
import type EquipmentState from "~/types/EquipmentState"
import type EquipmentStateDate from "~/types/EquipmentStateDate"

export const useEquipments = () => {
  const millisecondsPerHour = 1000 * 60 * 60

  const equipments = useState<Equipment[]>('equipments', () => [])
  const models = useState<EquipmentModel[]>('models', () => [])
  const states = useState<EquipmentState[]>('states', () => [])

  const fetchEquipmentData = async (): Promise<void> => {
    const { data: equipmentData } = await useFetch('/api/equipments')
    if (equipmentData.value) {
      equipments.value = equipmentData.value.equipments
      models.value = equipmentData.value.models
      states.value = equipmentData.value.states
    }
  }

  const getEquipment = (id: string): Equipment | null => {
    return equipments.value.find(equipment => equipment.id === id) ?? null
  }

  const getSortedPositionsByDate = (equipment: Equipment | null): EquipmentPosition[] => {
    if (!equipment || !equipment.positions.length) return []

    return equipment.positions.sort((positionA, positionB) => {
      return positionB.date.localeCompare(positionA.date)
    })
  }

  const getSortedStateDatesByDate = (equipment: Equipment | null): EquipmentStateDate[] => {
    if (!equipment || !equipment.stateDates.length) return []

    return equipment.stateDates.sort((positionA, positionB) => {
      return positionB.date.localeCompare(positionA.date)
    })
  }

  const calculateTotalEarningByDate = (
    stateDates: EquipmentStateDate[],
    hourlyEarnings: EquipmentModelHourlyEarning[],
    stringDate: string
  ): number => {
    const filteredStateDates = stateDates.filter(stateDate => stateDate.date < stringDate)

    let lastDate = new Date(stringDate)

    const totalEarnings = filteredStateDates.reduce((earning: number, stateDate: EquipmentStateDate) => {
      const intervalHours = calculateHoursByInterval(new Date(stateDate.date), lastDate)
      const stateHourlyEarning = hourlyEarnings.find(hourlyEarning => hourlyEarning.state?.id === stateDate.state?.id)

      lastDate = new Date(stateDate.date)

      return earning + intervalHours * (stateHourlyEarning?.value ?? 0)
    }, 0)

    return totalEarnings
  }

  const calculateTotalEarningsByPeriod = (equipment: Equipment | null, start: string, end: string): number => {
    if (!equipment || !equipment?.model?.hourlyEarnings) return 0

    const endNextDay = formatToNextDayISOString(end)
    if (endNextDay <= start) return 0

    const sortedStateDatesByDate = getSortedStateDatesByDate(equipment)
    const hourlyEarnings = equipment.model.hourlyEarnings

    const totalEarningStart = calculateTotalEarningByDate(sortedStateDatesByDate, hourlyEarnings, start)
    const totalEarningEnd = calculateTotalEarningByDate(sortedStateDatesByDate, hourlyEarnings, endNextDay)

    return totalEarningEnd - totalEarningStart
  }

  const calculateTotalOperatingHoursByDate = (stateDates: EquipmentStateDate[], stringDate: string): number => {
    const filteredStateDates = stateDates.filter(stateDate => stateDate.date < stringDate)

    let lastDate = new Date(stringDate)

    const totalHours = filteredStateDates.reduce((hours: number, stateDate: EquipmentStateDate) => {
      const intervalHours = calculateHoursByInterval(new Date(stateDate.date), lastDate)

      lastDate = new Date(stateDate.date)

      return hours + (stateDate.state?.name === 'Operando' ? intervalHours : 0)
    }, 0)

    return totalHours
  }

  const calculateProductivityByPeriod = (equipment: Equipment | null, start: string, end: string): number => {
    if (!equipment || !equipment?.model?.hourlyEarnings) return 0

    const endNextDay = formatToNextDayISOString(end)
    if (endNextDay <= start) return 0

    const sortedStateDatesByDate = getSortedStateDatesByDate(equipment)

    const oldestStateDate = sortedStateDatesByDate[sortedStateDatesByDate.length - 1].date
    const adjustedStart = oldestStateDate > start ? oldestStateDate : start

    const totalHours = calculateHoursByInterval(new Date(adjustedStart), new Date(endNextDay))

    const totalOperatingHoursStart = calculateTotalOperatingHoursByDate(sortedStateDatesByDate, adjustedStart)
    const totalOperatingHoursEnd = calculateTotalOperatingHoursByDate(sortedStateDatesByDate, endNextDay)

    return (totalOperatingHoursEnd - totalOperatingHoursStart) / totalHours
  }

  return {
    equipments,
    models,
    states,
    fetchEquipmentData,
    getEquipment,
    getSortedPositionsByDate,
    getSortedStateDatesByDate,
    calculateTotalEarningsByPeriod,
    calculateProductivityByPeriod
  }
}
