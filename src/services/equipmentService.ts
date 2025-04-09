import {
    Equipment,
    EquipmentPositionHistory,
    EquipmentModel,
    EquipmentState,
    EquipmentStateHistory,
  } from '../types/equipment'
  
  export async function fetchEquipments(): Promise<Equipment[]> {
    const res = await fetch('/data/equipment.json')
    return res.json()
  }
  
  export async function fetchPositionHistories(): Promise<EquipmentPositionHistory[]> {
    const res = await fetch('/data/equipmentPositionHistory.json')
    return res.json()
  }
  
  export async function fetchEquipmentModels(): Promise<EquipmentModel[]> {
    const res = await fetch('/data/equipmentModel.json')
    return res.json()
  }
  
  export async function fetchEquipmentStates(): Promise<EquipmentState[]> {
    const res = await fetch('/data/equipmentState.json')
    return res.json()
  }
  
  export async function fetchEquipmentStateHistories(): Promise<EquipmentStateHistory[]> {
    const res = await fetch('/data/equipmentStateHistory.json')
    return res.json()
  }
  
  export function getLatestPosition(
    equipmentId: string,
    histories: EquipmentPositionHistory[]
  ) {
    const history = histories.find((h) => h.equipmentId === equipmentId)
    return history?.positions.at(-1) ?? null
  }
  
  export function getLatestState(
    equipmentId: string,
    histories: EquipmentStateHistory[],
    states: EquipmentState[]
  ) {
    const history = histories.find((h) => h.equipmentId === equipmentId)
    const stateId = history?.states.at(-1)?.equipmentStateId
    return states.find((s) => s.id === stateId) ?? null
  }
  