export interface EquipmentPosition {
    date: string;
    lat: number;
    lon: number;
  }
  
  export interface EquipmentPositionHistory {
    equipmentId: string;
    positions: EquipmentPosition[];
  }
  
  export interface EquipmentStateHistory {
    equipmentId: string;
    states: {
      date: string;
      equipmentStateId: string;
    }[];
  }
  