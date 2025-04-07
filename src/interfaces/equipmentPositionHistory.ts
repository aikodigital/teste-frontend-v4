export interface IPositions {
  date: string;
  lat: number;
  lon: number;
}

export interface IEquipmentPositionHistory {
  equipmentId: string;
  positions: IPositions[];
}
