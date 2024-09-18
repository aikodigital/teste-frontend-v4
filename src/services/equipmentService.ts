// services/equipmentService.ts
import equipmentData from '../data/equipment.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentState from '../data/equipmentState.json'; 
import equipmentModels from '../data/equipmentModel.json';

// Retorna os dados dos equipamentos
export const getEquipment = () => {
  return equipmentData;
};

// Retorna os modelos de equipamentos
export const getEquipmentModels = () => {
  return equipmentModels;
};

// Retorna o histórico de posições dos equipamentos
export const getEquipmentPositions = () => {
  return equipmentPositionHistory;
};

// Retorna os estados dos equipamentos
export const getEquipmentStates = () => {
  return equipmentState;
};

// Retorna o histórico de estados dos equipamentos
export const getEquipmentStateHistory = () => {
  return equipmentStateHistory;
};
