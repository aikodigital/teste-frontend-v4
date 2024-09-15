type EquipmentFromAPI = {
  id: string;
  equipmentModelId: string;
  name: string;
};

type EquipmentModelFromAPI = {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarning[];
};

type HourlyEarning = {
  equipmentStateId: string;
  value: number;
};

type EquipmentPositionHistoryFromAPI = {
  equipmentId: string;
  positions: Position[];
};

type Position = {
  date: string;
  lat: number;
  lon: number;
};

type EquipmentStateFromAPI = {
  id: string;
  name: 'Operando' | 'Parado' | 'Manutenção';
  color: string;
};

type EquipmentStateHistoryFromAPI = {
  equipmentId: string;
  states: State[];
};

type State = {
  date: string;
  equipmentStateId: string;
};

export type {
  EquipmentFromAPI,
  EquipmentModelFromAPI,
  EquipmentPositionHistoryFromAPI,
  EquipmentStateFromAPI,
  EquipmentStateHistoryFromAPI
};
