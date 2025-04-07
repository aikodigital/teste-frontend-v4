import dataPositionHistory from '../../../data/equipmentPositionHistory.json'
import dataModel from '../../../data/equipmentModel.json'
import dataEquipment from '../../../data/equipment.json'
import dataEquipmentState from '../../../data/equipmentState.json'
import dataEquipmentStateHistory from '../../../data/equipmentStateHistory.json'

export const formatData = () => {
  const NewData = dataEquipment.map((equipment) => {
    return {
      ...equipment,
      model: dataModel.filter((e) => e.id === equipment.equipmentModelId)[0],
      lastState: dataEquipmentStateHistory
        .filter((stateHistory) => stateHistory.equipmentId === equipment.id)[0]
        .states.slice()
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0],
      states: dataEquipmentStateHistory
        .filter((stateHistory) => stateHistory.equipmentId === equipment.id)[0]
        .states.map((e) => {
          return {
            ...e,

            state: dataEquipmentState.filter(
              (eh) => eh.id === e.equipmentStateId,
            )[0],
          }
        })
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
      positions: dataPositionHistory.filter(
        (h) => h.equipmentId === equipment.id,
      )[0],
      lastPosition: dataPositionHistory
        .filter((h) => h.equipmentId === equipment.id)[0]
        .positions.slice()
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0],
    }
  })
  return NewData
}
