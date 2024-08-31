export type EquipmentPositionHistoryJson = {
  equipmentId: string;
  positions: Array<Position>;
}

export type Position = {
  date: string;
  lat: number;
  lon: number;
}