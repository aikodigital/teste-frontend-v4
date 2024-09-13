import equipment from '../data/equipment.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentState from '../data/equipmentState.json';

export const getEquipmentData = async () => {
  return equipment;
};

export const getEquipmentPositionHistory = async () => {
  return equipmentPositionHistory;
};

export const getEquipmentStateHistory = async () => {
  return equipmentStateHistory;
};

export const getEquipmentStates = async () => {
  return equipmentState;
};
