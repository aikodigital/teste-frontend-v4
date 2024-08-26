export interface IEquipmentPositionHistory {
  equipmentId: string;
  positions: {
    date: string;
    lat: number;
    lon: number;
  }[];
};