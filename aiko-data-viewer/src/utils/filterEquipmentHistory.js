import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export function filterEquipmentHistory(allStateHistory, filters, stateDictionary) {
  return allStateHistory.filter((item) => {
    const statusName = stateDictionary[item.equipmentStateId]?.name || 'Desconhecido'

    return (
      (filters.dateStart === '' ||
        dayjs(item.date).isBetween(
          dayjs(filters.dateStart),
          dayjs(filters.dateEnd).add(1, 'day'),
          [],
        )) &&
      (filters.name === '' ||
        item.equipmentName.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.model === '' ||
        item.equipmentModelName.toLowerCase().includes(filters.model.toLowerCase())) &&
      (filters.status === '' || statusName.toLowerCase().includes(filters.status.toLowerCase()))
    )
  })
}
