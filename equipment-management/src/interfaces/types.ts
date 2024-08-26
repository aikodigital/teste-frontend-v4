export interface Equipment {
    id: string;
    name: string;
    equipmentModelId: string;
  }
  
  export interface EquipmentPosition {
    date: string;
    lat: number;
    lon: number;
  }
  
  export interface EquipmentState {
    id: string;
    name: string;
    color: string;
  }
  
  export interface EquipmentStateHistory {
    equipmentId: string;
    states: {
      date: string;
      equipmentStateId: string;
    }[];
  }
  
  export interface EquipmentWithPositionAndState extends Equipment {
    lat: number;
    lon: number;
    state: EquipmentState;
    lastUpdate: string;
  }
  