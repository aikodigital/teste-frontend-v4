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

interface EquipmentStateHistory {
  equipmentId: string;
  equipmentStateId: string;
  date: string;
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
  states: Record<string, EquipmentState>;
  models: EquipmentModel[];
  stateHistory: EquipmentStateHistory[];
  setEquipment: (equipment: Equipment[]) => void;
  setPositions: (positions: Record<string, Position[]>) => void;
  setStates: (states: Record<string, EquipmentState>) => void;
  setModels: (models: EquipmentModel[]) => void;
  setStateHistory: (stateHistory: EquipmentStateHistory[]) => void;
}

const useEquipmentStore = create<EquipmentStore>((set) => ({
  equipment: [],
  positions: {},
  states: {},
  models: [],
  stateHistory: [],
  setEquipment: (equipment) => set({ equipment }),
  setPositions: (positions) => set({ positions }),
  setStates: (states) => set({ states }),
  setModels: (models) => set({ models }),
  setStateHistory: (stateHistory) => set({ stateHistory }),
}));

export default useEquipmentStore;
