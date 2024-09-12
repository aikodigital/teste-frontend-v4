export interface Equipment {
    id: string;
    name: string;
    equipmentModelId: string;
  }
  
  export interface Position {
    lat: number;
    lon: number;
    date: string;
  }
  
  export interface StateHistory {
    date: string;
    equipmentStateId: string;
  }
  