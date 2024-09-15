export type TypeEquipment = {
  id: string;
  equipmentModelId: string;
  name: string;
};

export type TypeEquipmentState = {
  id: string;
  name: string;
  color: string;
};

export type TypeEquipmentModel = {
  id: string;
  name: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
  }[];
};

export type TypePositionHistory = {
  equipmentId: string;
  positions: {
    date: string;
    lat: number;
    lon: number;
  }[];
};

export type TypeStateHistory = {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
};
