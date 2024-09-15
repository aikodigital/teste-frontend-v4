export type TypeEquipmentDetailed = {
  id: string;
  equipmentModelId: string;
  name: string;
  lastPosition?: TypePosition;
  model?: TypeEquipmentModel;
  currentState?: TypeState;
  positions: TypePosition[];
  states: TypeState[];
};

export type TypeEquipmentBasic = {
  id: string;
  equipmentModelId: string;
  name: string;
  lastPosition?: TypePosition;
  currentState?: TypeState;
};

export type TypePosition = {
  date: string;
  lat: number;
  lon: number;
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
  positions: TypePosition[];
};

export type TypeState = {
  date: string;
  equipmentStateId: string;
  name?: string;
  color?: string;
};

export type TypeStateHistory = {
  equipmentId: string;
  states: TypeState[];
};
