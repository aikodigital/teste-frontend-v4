import { Equipment } from '../models/Equipment';
import { EquipmentState } from '../models/EquipmentState';
import equipmentData from '../../data/equipment.json';

export class EquipmentRepository {
  static getAll(): EquipmentState[] {
    return equipmentData.map((equipment) => ({
      ...equipment,
      color: 'default', 
    })) as EquipmentState[];
  }

  static getById(id: string): EquipmentState | undefined {
    const equipment = equipmentData.find((equipment) => equipment.id === id);
    if (equipment) {
      return {
        ...equipment,
        color: 'default', 
      } as EquipmentState;
    }
    return undefined;
  }
}
