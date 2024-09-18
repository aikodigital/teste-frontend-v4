type Position = {
  date: string;
  lat: number;
  lon: number;
};

export type EquipPositionHistoryData = {
  equipmentId: string;
  positions: Position[];
};
