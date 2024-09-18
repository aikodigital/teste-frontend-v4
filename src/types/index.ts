//Equipments
export type Filter = {
  state?: string;
  name?: string;
};
export type Position = {
  date: string;
  lat: number;
  lon: number;
};

export type EquipmentState = {
  id: string;
  name: string;
  color: string;
};
export type UpdateState = {
  date: string;
  valueState: number | undefined;
  id: string;
  name: string;
  color: string;
};
export type FormattedArrayPositions = {
  date: string;
  lat: number;
  lon: number;
};

export type Indexs = {
  lastIndex: number;
  secondLastIndex: number;
};

export type StateEquipment = {
  id: string;
  name: string;
  color: string;
};

//Equipment
export type State = {
  name: string;
  color: string;
};

export type HourlyEarnings = {
  equipmentStateId: string;
  value: number;
};
export type EquipamentStates = {
  date: string;
  equipmentStateId: string;
};

export type EquipmentModel = {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarnings[];
};

export type LastPosition = {
  date: string;
  lat: number;
  lon: number;
};

export type Equipment = {
  lastPosition: LastPosition;
  lastState: State | undefined;
  model: EquipmentModel | undefined;
  id: string;
  equipmentModelId: string;
  name: string;
};
