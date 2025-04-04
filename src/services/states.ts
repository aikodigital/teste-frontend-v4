import { EquipmentStateType } from '../types';
import statesData from '../data/equipmentState.json';

export const equipmentStates: EquipmentStateType[] = statesData;

export const getStateName = (stateId: string): string => {
  const state = equipmentStates.find(s => s.id === stateId);
  return state?.name || 'Desconhecido';
};

export const getStateColor = (stateId: string): string => {
  const state = equipmentStates.find(s => s.id === stateId);
  return state?.color || '#999999';
};