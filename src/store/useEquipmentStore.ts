import { create } from 'zustand';
import {
  Equipment,
  EquipmentState,
  EquipmentModel,
  EquipmentStateHistory,
  Position,
} from '../types/interface';

interface EquipmentStore {
  equipment: Equipment[];
  positions: Record<string, Position[]>;
  states: Record<string, EquipmentState>;
  models: EquipmentModel[];
  history: EquipmentStateHistory[];
  setEquipment: (equipment: Equipment[]) => void;
  setPositions: (positions: Record<string, Position[]>) => void;
  setStates: (states: Record<string, EquipmentState>) => void;
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
