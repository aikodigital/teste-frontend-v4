// Importação dos dados JSON
import equipmentData from '../data/equipment.json';
import equipmentModelData from '../data/equipmentModel.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';

// Funções para acessar os dados importados
export const getEquipment = () => equipmentData;
export const getEquipmentModels = () => equipmentModelData;
export const getEquipmentPositionHistory = () => equipmentPositionHistoryData;
export const getEquipmentStates = () => equipmentStateData;
export const getEquipmentStateHistory = () => equipmentStateHistoryData;

// Função para carregar todos os dados de uma vez
export const loadData = () => ({
  equipmentData,
  equipmentModelData,
  equipmentPositionHistoryData,
  equipmentStateData,
  equipmentStateHistoryData,
});
