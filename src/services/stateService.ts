import { EquipmentStateType, EquipmentModel } from '../types';
import statesData from '../data/equipmentState.json';
import equipmentModelsData from '../data/equipmentModel.json';

export const equipmentStates: EquipmentStateType[] = statesData;
export const equipmentModels: EquipmentModel[] = equipmentModelsData;

export const getStateName = (equipmentStateId: string): string => {
  const state = equipmentStates.find(s => s.id === equipmentStateId);
  return state?.name || 'Desconhecido';
};

export const getStateColor = (equipmentStateId: string): string => {
  const state = equipmentStates.find(s => s.id === equipmentStateId);
  return state?.color || '#999999';
};

export const getEquipmentModel = (modelId: string): EquipmentModel => {
  return equipmentModels.find(model => model.id === modelId)!;
};

export const getHourlyEarning = (modelId: string, equipmentStateId: string): number => {
  const model = getEquipmentModel(modelId);
  const earning = model.hourlyEarnings.find(
    e => e.equipmentStateId === equipmentStateId
  );
  return earning?.value || 0;
};