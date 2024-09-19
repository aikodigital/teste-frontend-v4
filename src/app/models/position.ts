export interface Position {
  lat: number;
  lon: number;
  date: string;
}

export interface PositionHistory {
  equipmentId: string;
  positions: Position[];
}
