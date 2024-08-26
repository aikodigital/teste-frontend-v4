import { create } from 'zustand';

interface Position {
  lat: number;
  lon: number;
  date: string;
}

interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

type EquipmentState = Record<
  string,
  {
    id: string;
    name: string;
    color: string;
  }
>;

interface StateHistory {
  date: string;
  equipmentStateId: string;
}

interface EquipmentStateHistory {
  equipmentId: string;
  states: StateHistory[];
}

interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
  }[];
}

interface EquipmentStore {
  equipment: Equipment[];
  positions: Record<string, Position[]>;
  states: EquipmentState;
  models: EquipmentModel[];
  history: EquipmentStateHistory[];
  setEquipment: (equipment: Equipment[]) => void;
  setPositions: (positions: Record<string, Position[]>) => void;
  setStates: (states: EquipmentState) => void;
  setModels: (models: EquipmentModel[]) => void;
  setStateHistory: (history: EquipmentStateHistory[]) => void;
}

const useEquipmentStore = create<EquipmentStore>((set) => ({
  equipment: [],
  positions: {},
  states: {},
  models: [],
  history: [],
  setEquipment: (equipment) => set({ equipment }),
  setPositions: (positions) => set({ positions }),
  setStates: (states) => set({ states }),
  setModels: (models) => set({ models }),
  setStateHistory: (history) => set({ history }),
}));

export default useEquipmentStore;
