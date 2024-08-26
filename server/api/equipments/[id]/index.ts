import equipmentJson from '~/data/equipment.json'
import equipmentModelJson from '~/data/equipmentModel.json'
import equipmentStateJson from '~/data/equipmentState.json'
import Equipment from '~/types/Equipment'
import EquipmentModel from '~/types/EquipmentModel'
import EquipmentState from '~/types/EquipmentState'

export default defineEventHandler<Equipment | null>((event) => {
  const equipmentId = getRouterParam(event, 'id')

  const unformattedEquipment = equipmentJson.find(equipment => equipment.id === equipmentId)
  if (!unformattedEquipment) return null

  const unformattedEquipmentModel = equipmentModelJson.find(model => model.id === unformattedEquipment.equipmentModelId)

  const equipmentStates: EquipmentState[] = equipmentStateJson.map(state => ({
    id: state.id,
    name: state.name,
    color: state.color
  }))

  const equipmentModel: EquipmentModel | undefined = unformattedEquipmentModel ? {
    id: unformattedEquipmentModel.id,
    name: unformattedEquipmentModel.name,
    hourlyEarnings: unformattedEquipmentModel.hourlyEarnings.map(hourlyEarning => ({
      state: equipmentStates.find(state => state.id === hourlyEarning.equipmentStateId),
      value: hourlyEarning.value
    }))
  } : undefined

  const equipment: Equipment = {
    id: unformattedEquipment.id,
    name: unformattedEquipment.name,
    model: equipmentModel
  }

  return equipment
})
