import type { EquipmentData } from '@/types/EquipmentTypes'

import dataEquipment from '@/data/equipment.json'
import dataEquipmentState from '@/data/equipmentState.json'
import dataEquipmentModel from '@/data/equipmentModel.json'
import dataEquipmentStateHistory from '@/data/equipmentStateHistory.json'
import dataEquipmentPositionHistory from '@/data/equipmentPositionHistory.json'

export function getAllEquipment(): EquipmentData[] {
  const allEquipmentData = []

  for (const data of dataEquipment) {
    const name = dataEquipment.find((equipment) => equipment.id === data.id)?.name
    const model = dataEquipmentModel.find((model) => model.id === data.equipmentModelId)
    const historyStates = dataEquipmentStateHistory.find((state) => state.equipmentId === data.id)
    const historyPositions = dataEquipmentPositionHistory.find(
      (position) => position.equipmentId === data.id
    )

    if (!name || !model || !historyStates || !historyPositions) {
      console.error('Not found data in equipment service')
      return []
    }

    const isLatestPosition = historyPositions.positions[historyPositions.positions.length - 1]
    const isLatestState = historyStates.states[historyStates.states.length - 1]

    const conditionState = dataEquipmentState.find(
      (state) => state.id === isLatestState.equipmentStateId
    )

    if (!conditionState) {
      console.error('Condition state not found')
      return []
    }

    const mergedState = {
      ...isLatestState,
      ...conditionState
    }

    const mergedHistoryStates = historyStates.states.map((state) => {
      const conditionState = dataEquipmentState.find(
        (condState) => condState.id === state.equipmentStateId
      )
      return {
        ...state,
        ...conditionState
      }
    })

    const equipmentData = {
      id: data.id,
      name: name,
      model: model,
      historyPositions: historyPositions,
      historyState: mergedHistoryStates,
      isLatestPosition: isLatestPosition,
      isLatestState: mergedState
    }

    allEquipmentData.push(equipmentData)
  }

  if (allEquipmentData.length === 0) {
    console.error('Not found data in equipment service')
  }

  return allEquipmentData
}

export function getEquipmentById(id: string, equipmentData: EquipmentData[]) {
  return equipmentData.find((equipment) => equipment.id === id)
}
