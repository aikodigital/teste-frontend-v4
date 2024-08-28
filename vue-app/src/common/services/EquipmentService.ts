import equipments from '@/assets/data/equipment.json'
import Equipment from '../types/Equipment';
import EquipmentWithLastPosition from '../types/EquipmentWithLastPosition'
import { getEquipmentHistoryStates, getEquipmentLastState, getStateById } from './StateService';
import { getEquipmentLastPosition } from './PositionService';
import { getModelById } from './ModelService';

export function listEquipments(): Equipment[] {
  return equipments;
}

export function getEquipmentById(id: string): Equipment | undefined {
  return equipments.find(equipment => equipment.id === id);
}

export function listEquipmentsWithLastPosition(): EquipmentWithLastPosition[]{
  return listEquipments().map(equipment => {
    const lastPosition = getEquipmentLastPosition(equipment.id);
    const stateHistory = getEquipmentHistoryStates(equipment.id)?.states;
    const lastState = getEquipmentLastState(equipment.id);
    const lastPositionState = stateHistory?.find(p => p.date == lastPosition?.date);
    const model = getModelById(equipment.equipmentModelId);
    const state = lastPositionState ? getStateById(lastPositionState.equipmentStateId) 
      : lastState ? getStateById(lastState?.equipmentStateId) : null;
    return {
      ...equipment,
      lastPosition,
      lastState: state,
      model
      
    }
  })
}

export default {
    listEquipments,
    listEquipmentsWithLastPosition,
    getEquipmentById,
}