import equipments from '@/assets/data/equipment.json'
import models from '@/assets/data/equipmentModel.json'
import states from '@/assets/data/equipmentState.json'
import equipmentStateHistory from '@/assets/data/equipmentStateHistory.json'
import equipmentPositionHistory from '@/assets/data/equipmentPositionHistory.json'
import Equipment from '../types/Equipment';
import EquipmentModel from '../types/EquipmentModel';
import EquipmentState from '../types/EquipmentState';
import EquipmentPositionHistory, { Position } from '../types/EquipmentPositionHistory';
import EquipmentStateHistory, { State } from '../types/EquipmentStateHistory';

function listEquipments(): Equipment[] {
  return equipments;
}

function listEquipmentsWithLastPosition(){
  return listEquipments().map(equipment => {
    const lastPosition = getEquipmentLastPosition(equipment.id);
    const stateHistory = getEquipmentHistoryStates(equipment.id)?.states;
    const lastState = getEquipmentLastState(equipment.id);
    const lastPositionState = stateHistory?.find(p => p.date == lastPosition?.date);
    const state = lastPositionState ? getStateById(lastPositionState.equipmentStateId) 
      : lastState ? getStateById(lastState?.equipmentStateId) : null;
    return {
      ...equipment,
      lastPosition: { ...lastPosition, state: state },
      
    }
  })
}

function getEquipmentById(id: string): Equipment | undefined {
  return equipments.find(equipment => equipment.id === id);
}

function getEquipmentLastPosition(id: string): Position | undefined {
  const equipmentHistory = getEquipmentPositionHistory(id);
  return equipmentHistory ? 
    equipmentHistory.positions[equipmentHistory.positions.length - 1] : undefined;
}

function getEquipmentLastState(id: string): State | undefined {
  const equipmentHistoryState = getEquipmentHistoryStates(id);
  return equipmentHistoryState ? 
  equipmentHistoryState.states[equipmentHistoryState.states.length - 1] : undefined;
}

function listModels(): EquipmentModel[] {
  return models;
}

function getModelById(id: string): EquipmentModel | undefined {
  return models.find(model => model.id === id);
}

function listStates(): EquipmentState[] {
  return states;
}

function getStateById(id: string): EquipmentState | undefined {
  return states.find(state => state.id === id);
}

function listEquipmentPositionHistory(): EquipmentPositionHistory[] {
  return equipmentPositionHistory;
}

function getEquipmentPositionHistory(id: string): EquipmentPositionHistory | undefined {
  return equipmentPositionHistory.find(p => p.equipmentId === id);
}

function getEquipmentHistoryStates(id: string): EquipmentStateHistory | undefined {
  return equipmentStateHistory.find(p => p.equipmentId === id);
}

export default {
    listEquipments,
    listEquipmentsWithLastPosition,
    getEquipmentById,
    listModels,
    getModelById,
    listStates,
    getStateById,
    listEquipmentPositionHistory,
    getEquipmentPositionHistory,
    getEquipmentHistoryStates,
    getEquipmentLastPosition
}