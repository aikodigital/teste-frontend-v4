export interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
}

export interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: [{
    equipmentStateId: string;
    value: number;
  }];
}

export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: [{
    date: string;
    lat: number;
    lon: number;
  }]
}

export interface EquipmentStateHistory {
  equipmentId: string;
  states: [
    {
      date: string;
      equipmentStateId: string;
    }
  ];
}
