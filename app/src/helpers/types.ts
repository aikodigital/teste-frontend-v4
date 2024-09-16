export interface Coords {
  lat: number
  lng: number
}

export interface Equipment {
  id: string
  equipmentModelId: string
  name: string
}

export interface EquipmentModel {
  id: string
  name: string
  hourlyEarnings: {
    equipmentStateId: string
    value: number
  }[]
}

export interface equipmentPositionHistory {
  equipmentId: string
  positions: {
    date: string
    lat: number
    lon: number
  }[]
}

export interface equipmentState {
  id: string
  name: string
  color: string
}

export interface equipmentStateHistory {
  equipmentId: string
  states: {
    date: string
    equipmentStateId: string
  }[]
}

export interface AggregatedEquipment {
  id: string;
  name: string;
  productivityPercentage: string;
  equipmentGain: number;
  model: {
    id: string;
    name: string;
    hourlyEarnings: {
      equipmentStateId: string;
      value: number;
    }[];
  } | null;
  currentPosition: {
    lat: number;
    lon: number;
    date: string;
  } | null;
  currentState: {
    id: string;
    name: string;
    color: string;
  } | null;
  stateHistory: {
    date: string;
    state: {
      id: string;
      name: string;
      color: string;
    } | null;
  }[];
  positionHistory: {
    date: string;
    lat: number;
    lon: number;
  }[];
}
