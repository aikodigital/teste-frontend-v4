import states from '../../data/equipmentState.json'
import equipments from '../../data/equipment.json'

export const formatDate = (date: string) => {
  const isValidDate = !isNaN(Date.parse(date))
  if (!isValidDate) {
    return 'Invalid Date'
  }

  const formattedDate = new Date(date).toISOString().slice(0, 10).split('-').reverse().join('/')

  return formattedDate
}

export function returnEquipmentBasedOnId(equipmentId: string) {
  const equipment = equipments.find(equipment => equipment.id === equipmentId);

  return equipment ? equipment.name : 'Equipamento não identificado'
}

export function returnStateBasedOnId(id: string) {
  return states.filter((state) => state.id === id)
}
