import type { IEquipment, IEquipmentModel, IEquipmentPositionHistory, IEquipmentStateHistory, IState } from '~/types/types'
import equipmentsData from '~/data/equipment.json'
import equipmentModelsData from '~/data/equipmentModel.json'
import equipmentPositionHistoriesData from '~/data/equipmentPositionHistory.json'
import statesData from '~/data/equipmentState.json'
import equipmentStateHistoriesData from '~/data/equipmentStateHistory.json'

export default () => ({
  fetchEquipments(): IEquipment[] {
    return equipmentsData
  },

  fetchEquipmentModels(): IEquipmentModel[] {
    return equipmentModelsData
  },

  fetchEquipmentPositionHistories(): IEquipmentPositionHistory[] {
    return equipmentPositionHistoriesData
  },

  fetchStates(): IState[] {
    return statesData
  },

  fetchEquipmentStateHistories(): IEquipmentStateHistory[] {
    return equipmentStateHistoriesData
  },
})
