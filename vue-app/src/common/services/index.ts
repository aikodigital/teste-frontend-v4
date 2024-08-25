import equipments from '@/assets/data/equipment.json'
import models from '@/assets/data/equipmentModel.json'
import states from '@/assets/data/equipmentState.json'
import equipmentStateHistory from '@/assets/data/equipmentStateHistory.json'
import equipmentPositionHistory from '@/assets/data/equipmentPositionHistory.json'
import Equipment from '../types/Equipment';
import EquipmentModel from '../types/EquipmentModel';
import EquipmentState from '../types/EquipmentState';
import EquipmentPositionHistory from '../types/EquipmentPositionHistory';
import EquipmentStateHistory from '../types/EquipmentStateHistory';

function listEquipments(): Equipment[] {
  return equipments;
}

function getEquipmentById(id: string): Equipment | undefined {
  return equipments.find(equipment => equipment.id === id);
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
    getEquipmentById,
    listModels,
    getModelById,
    listStates,
    getStateById,
    listEquipmentPositionHistory,
    getEquipmentPositionHistory,
    getEquipmentHistoryStates
}