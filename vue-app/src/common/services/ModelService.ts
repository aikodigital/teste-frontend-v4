import models from '@/assets/data/equipmentModel.json'
import EquipmentModel from '../types/EquipmentModel';

export function listModels(): EquipmentModel[] {
    return models;
}
  
export function getModelById(id: string): EquipmentModel | undefined {
    return models.find(model => model.id === id);
}

export default {
    listModels,
    getModelById
}