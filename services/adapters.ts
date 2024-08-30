import type { Equipment, IEquipment, IEquipmentModel, IEquipmentPositionHistory, IEquipmentStateHistory } from '~/types/types'

export function equipmentAdapter(
  equipment: IEquipment,
  equipmentModel: IEquipmentModel,
  positionHistory: IEquipmentPositionHistory,
  stateHistory: IEquipmentStateHistory,
): Equipment {
  const lastState = stateHistory.states[stateHistory.states.length - 1]
  const lastPosition = positionHistory.positions[positionHistory.positions.length - 1]
  return {
    id: equipment.id,
    name: equipment.name,
    model: equipmentModel.name,
    modelId: equipmentModel.id,
    positionHistory: positionHistory.positions,
    stateHistory: stateHistory.states,
    lastState,
    lastPosition,
  }
}
