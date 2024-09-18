export type Equipament = {
  id: string;
  equipmentModelId: string;
  name: string;
};

export type EquipamentModel = {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarnings[];
};

export type EquipamentResult = {
  equipament: Equipament;
  equipamentModel: EquipamentModel;
  equipamentLastPosition: LastPosition;
  equipamentStateHistory: StateHistory;
};

export type EquipamentResults = EquipamentResult[];

type HourlyEarnings = {
  equipmentStateId: string;
  value: number;
};

export type LastPosition = {
  date: string;
  lat: number;
  lon: number;
};

export type StateHistory = {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
};
