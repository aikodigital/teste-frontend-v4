export interface PositionProps {
  date: string;
  lat: number;
  lon: number;
}

export interface EquipmentPositionProps {
  equipmentId: string;
  positions: PositionProps[];
}
