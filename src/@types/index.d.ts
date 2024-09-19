export type EquipmentData = {
  id: string;
  equipmentModelId: string;
  name: string;
};

type Position = {
  date: string;
  lat: number;
  lon: number;
};

export type PositionData = {
  equipmentId: string;
  positions: Position[];
};

export type StatesHistoryData = {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
};

/* STRUCTERED EQUIPMENT TYPES
========================================= */

type EquipmentPosition = Position;

export type EquipmentState = {
  date: string;
  name: "Operando" | "Parado" | "Manutenção";
  color: string;
};

export type Equipment = {
  id: string;
  name: string;
  currentPosition?: EquipmentPosition;
  historyPositions?: EquipmentPosition[];
  currentState?: EquipmentState;
  historyStates?: EquipmentState[];
};
