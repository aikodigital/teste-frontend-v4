'use client';
import { Context, createContext } from 'react';
import equipmentData from '@/lib/data/equipment.json';
import equipmentModelData from '@/lib/data/equipmentModel.json';
import equipmentPositionHistoryData from '@/lib/data/equipmentPositionHistory.json';
import equipmentStateData from '@/lib/data/equipmentState.json';
import equipmentStateHistoryData from '@/lib/data/equipmentStateHistory.json';
import { Equipment } from '../types/equipment';

const getModelById = (equipmentModelId: string) => {
  return equipmentModelData.find((model) => equipmentModelId === model.id);
};

const getPositionsById = (equipmentId: string) => {
  return equipmentPositionHistoryData.find((positions) => equipmentId === positions.equipmentId);
};

const getLastPosition = (equipmentId: string) => getPositionsById(equipmentId)?.positions.pop();

const getStateHistoryById = (equipmentId: string) => {
  const stateHistory = equipmentStateHistoryData.find((history) => equipmentId === history.equipmentId);
  return stateHistory?.states.map(state => {
    const match = equipmentStateData.find(data => state.equipmentStateId === data.id);
    return { ...state, ...match };
  });
};

const getCurrentState = (equipmentId: string) => getStateHistoryById(equipmentId)?.pop();

const getEquipment = (equipment: any) => {
  return {
    id: equipment.id,
    name: equipment.name,
    model: getModelById(equipment.equipmentModelId),
    currentPosition: getLastPosition(equipment.id),
    positionHistory: getPositionsById(equipment.id),
    currentState: getCurrentState(equipment.id),
    stateHistory: getStateHistoryById(equipment.id)
  }
}

export const EquipmentContext: Context<Equipment[]> = createContext(equipmentData.map((equipment) => getEquipment(equipment)) as unknown as Equipment[])