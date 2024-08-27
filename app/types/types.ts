export type Position = {
  lat: number;
  lon: number;
  date: string;
};

export type EquipmentStatus = {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
};

export type Vehicle = {
  id: string;
  name: string;
  equipmentModelId: string;
};

export type EquipmentModel = {
  id: string;
  name: string;
};
