export interface EquipmentPositionHistory {
  lon: any;
  lat: any;
  equipmentId: string;
  positions: Array<{
    date: string;
    lat: number;
    lon: number;
  }>;
}
