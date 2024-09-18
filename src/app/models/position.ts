export interface Position {
  date: string;
  lat: number;
  lon: number;
}

export interface PositionHistory {
  equipmentId: string;
  positions: Position[];
}
