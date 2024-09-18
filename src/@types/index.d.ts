export type EquipmentData = {
  id: string;
  equipmentModelId: string;
  name: string;
};

export type Position = {
  date: string;
  lat: number;
  lon: number;
};

export type PositionData = {
  equipmentId: string;
  positions: Position[];
};

export type Equipment = {
  id: string;
  name: string;
  currentPosition?: Position;
  positions?: Position[];
};
