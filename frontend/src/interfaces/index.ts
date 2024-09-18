export interface IEquipmentData {
  id: string;
  equipmentModelId: string;
  name: string;
}

export interface IEquipmentModelData {
  id: string;
  name: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
  }[];
}

export interface IEquipmentPositionHistoryData {
  equipmentId: string;
  positions: IPositions[];
}

export interface IPositions {
  date: string;
  lat: number;
  lon: number;
}

export interface IEquipmentStateData {
  id: string;
  name: string;
  color: string;
}

export interface IEquipmentStateHistoryData {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
    stateName: string;
    stateColor: string;
  }[];
}

export interface IEquipmentsData extends IEquipmentData {
  model?: IEquipmentModelData;
  positionHistory?: IEquipmentPositionHistoryData;
  stateHistory?: IEquipmentStateHistoryData;
  productivity?: number;
}
