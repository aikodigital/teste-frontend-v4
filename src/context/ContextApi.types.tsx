export interface IContextApiValue {
  equipaments: EquipamentData[];
  setEquipaments: (value: EquipamentData[]) => void;
  equipamentsModel: EquipamentsModelData[];
  setEquipamentsModel: (value: EquipamentsModelData[]) => void;
  equipamentsPositionHistory: EquipmentsPositionHistoryData[];
  setEquipamentPositionHistory: (
    value: EquipmentsPositionHistoryData[]
  ) => void;
  equipamentsState: EquipamentsStateData[];
  setEquipamentsState: (value: EquipamentsStateData[]) => void;
  equipamentsStateHistory: EquipamentsStateHistory[];
  setEquipamentsStateHistory: (value: EquipamentsStateHistory[]) => void;
}

export type EquipamentData = {
  id: string;
  equipmentModelId: string;
  name: string;
};

type Position = {
  date: string;
  lat: number;
  lon: number;
};

type HourlyEarnings = {
  equipmentStateId: string;
  value: number;
};

export type EquipamentsModelData = {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarnings[];
};

export type EquipmentsPositionHistoryData = {
  equipmentId: string;
  positions: Position[];
};

export type EquipamentsStateData = {
  id: string;
  name: string;
  color: string;
};

type statesData = {
  date: string;
  equipmentStateId: string;
};

export type EquipamentsStateHistory = {
  equipmentId: string;
  states: statesData[];
};
