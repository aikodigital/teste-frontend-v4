type EquipmentState = {
  id: string;
  name: string;
  color: string;
};

type Position = {
  date: string;
  lat: number;
  lon: number;
} | null;

type Equipment = {
  equipmentId: string;
  name: string;
  state: EquipmentState;
  position: Position;
};

type EquipmentHistory = {
  date: string;
  equipmentStateId: string;
};

type EquipmentData = {
  equipmentId: string;
  name: string;
  state: EquipmentState | EquipmentHistory;
  position: Position;
};

type HistoryModalType = {
  equipmentId: string;
  date: string;
  state: {
    name: string;
    color: string;
  };
  position: {
    lat: number;
    lon: number;
  };
};

type FullHistory = {
  states: {
    date: string;
    equipmentStateId: string;
  }[];
  equipmentId: string;
  positions: {
    date: string;
    lat: number;
    lon: number;
  }[];
};

type EquipmentBaseData = {
  id: string;
  equipmentModelId: string;
  name: string;
};

type StateHistoryEntry = {
  date: string;
  equipmentStateId: string;
};

type StateDuration = {
  equipmentStateId: string;
  hours: number;
};

type HoursPerState = {
  day: string;
  states: StateDuration[];
};

type IncomeData = {
  date: string;
  hoursInOperation: number;
  hoursInMaintainance: number;
  hoursStopped: number;
  totalIncome: number; 
}
