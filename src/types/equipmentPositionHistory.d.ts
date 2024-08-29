export interface EquipmentPositionEntry {
  date: string;
  lat: number;
  lon: number;
}

export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: EquipmentPositionEntry[];
}
