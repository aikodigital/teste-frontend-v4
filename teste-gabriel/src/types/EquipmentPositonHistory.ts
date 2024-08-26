export interface EquipmentPositonHistory {
  equipmentId: string;
  positions: {
    data: string;
    lat: string;
    lon: string;
  }[];
}
