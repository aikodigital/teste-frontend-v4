import equipmentJson from '~/data/equipment.json'
import equipmentModelJson from '~/data/equipmentModel.json'
import equipmentStateJson from '~/data/equipmentState.json'
import Equipment from '~/types/Equipment'
import EquipmentModel from '~/types/EquipmentModel'
import EquipmentState from '~/types/EquipmentState'

export default defineEventHandler<Equipment[]>(() => {
  const equipmentStates: EquipmentState[] = equipmentStateJson.map(state => ({
    id: state.id,
    name: state.name,
    color: state.color
  }))

  const equipmentModels: EquipmentModel[] = equipmentModelJson.map(model => ({
    id: model.id,
    name: model.name,
    hourlyEarnings: model.hourlyEarnings.map(hourlyEarning => ({
      state: equipmentStates.find(state => state.id === hourlyEarning.equipmentStateId),
      value: hourlyEarning.value
    }))
  }))

  const equipments: Equipment[] = equipmentJson.map(equipment => ({
    id: equipment.id,
    name: equipment.name,
    model: equipmentModels.find(model => model.id === equipment.equipmentModelId)
  }))

  return equipments
})
