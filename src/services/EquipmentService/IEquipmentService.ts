export interface IEquipmentService {
  fetchAllEquipmentData(): Promise<EquipmentData[]>;
}

export interface EquipmentData {
  id: string;
  equipmentModelId: string;
  name: string;
}
