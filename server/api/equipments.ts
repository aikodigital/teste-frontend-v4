import equipmentJson from '~/data/equipment.json'
import equipmentModelJson from '~/data/equipmentModel.json'
import equipmentPositionHistoryJson from '~/data/equipmentPositionHistory.json'
import equipmentStateJson from '~/data/equipmentState.json'
import equipmentStateHistoryJson from '~/data/equipmentStateHistory.json'
import Equipment from '~/types/Equipment'
import EquipmentData from '~/types/EquipmentData'
import EquipmentModel from '~/types/EquipmentModel'
import EquipmentPosition from '~/types/EquipmentPosition'
import EquipmentState from '~/types/EquipmentState'
import EquipmentStateDate from '~/types/EquipmentStateDate'

export default defineEventHandler<EquipmentData>(() => {
  const states: EquipmentState[] = equipmentStateJson.map(state => ({
    id: state.id,
    name: state.name,
    color: state.color
  }))

  const models: EquipmentModel[] = equipmentModelJson.map(model => {
    const hourlyEarnings = model.hourlyEarnings.map(hourlyEarning => {
      const state = states.find(state => state.id === hourlyEarning.equipmentStateId)

      return {
        state,
        value: hourlyEarning.value
      }
    })

    return {
      id: model.id,
      name: model.name,
      hourlyEarnings,
    }
  })

  const equipments: Equipment[] = equipmentJson.map(equipment => {
    const model = models.find(model => model.id === equipment.equipmentModelId) ?? null

    const positionHistory = equipmentPositionHistoryJson.find(history => history.equipmentId === equipment.id)
    const positions: EquipmentPosition[] = positionHistory?.positions.map(position => ({
      equipmentId: equipment.id,
      date: position.date,
      lat: position.lat,
      lon: position.lon
    })) ?? []

    const stateHistory = equipmentStateHistoryJson.find(history => history.equipmentId === equipment.id)
    const stateDates: EquipmentStateDate[] = stateHistory?.states.map(stateDate => ({
      equipmentId: equipment.id,
      date: stateDate.date,
      state: states.find(state => state.id === stateDate.equipmentStateId)
    })) ?? []

    return {
      id: equipment.id,
      name: equipment.name,
      model,
      positions,
      stateDates
    }
  })

  return {
    equipments,
    models,
    states
  }
})
