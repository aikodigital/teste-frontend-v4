export interface IEquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}
export interface Position {
  date: string;
  lat: number;
  lon: number;
}