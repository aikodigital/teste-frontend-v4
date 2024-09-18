export interface EquipmentState {
  id: string;
  name: string;
  equipmentModelId: string;
}
export interface Position {
  date: string;
  lat: number;
  lon: number;
}

export interface State {
  date: string;
  equipmentStateId: string;
  color: string | null;
  name: string | null;
}

export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}

export interface EquipmentStateHistory {
  equipmentId: string | undefined;
  states: State[];
}

export interface ModelDetail {
  modelId: string | undefined;
  name: string | undefined;
  hourlyEarnings: [];
}

export interface Equipment {
  equipmentId: string;
  modelId: string;
  name: string;
  latestPosition?: Position | null;
  latestState?: State;
}
export interface EquipmentStateSlice {
  equipments: Equipment[];
  /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
  history: EquipmentStateHistory | {};
  /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
  model: ModelDetail | {};
  loading: boolean;
  error: string | null;
}
