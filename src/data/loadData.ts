import { Equipment, EquipmentModel, EquipmentPositionHistory, EquipmentState, EquipmentStateHistory } from '../data/types';
import equipmentData from './equipment.json';
import equipmentModelData from './equipmentModel.json';
import equipmentPositionHistoryData from './equipmentPositionHistory.json';
import equipmentStateData from './equipmentState.json';
import equipmentStateHistoryData from './equipmentStateHistory.json';

export const getLatestEquipmentPositions = (equipmentPositionHistory: EquipmentPositionHistory[]) => {
  return equipmentPositionHistory.map(equipment => {
    const latestPosition = equipment.positions[equipment.positions.length - 1];
    return {
      equipmentId: equipment.equipmentId,
      lat: latestPosition.lat,
      lon: latestPosition.lon,
    };
  });
};

export const getLatestEquipmentStates = (equipmentStateHistory: EquipmentStateHistory[]) => {
  return equipmentStateHistory.map(equipment => {
    const latestState = equipment.states[equipment.states.length - 1];
    return {
      equipmentId: equipment.equipmentId,
      stateId: latestState.equipmentStateId,
    };
  });
};

export const loadData = () => {
  return {
    equipment: equipmentData as Equipment[],
    equipmentState: equipmentStateData as EquipmentState[],
    equipmentModel: equipmentModelData as EquipmentModel[],
    equipmentStateHistory: equipmentStateHistoryData as EquipmentStateHistory[],
    equipmentPositionHistory: equipmentPositionHistoryData as EquipmentPositionHistory[],
  };
};
