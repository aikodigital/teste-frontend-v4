// lib/zustand/store.ts

import { create } from 'zustand';
import { Equipment, EquipmentModel, EquipmentPositionHistory, EquipmentState, EquipmentStateHistory, EquipmentWithDetails, Position } from '../../types';

interface AppState {
  equipments: Equipment[];
  equipmentModels: EquipmentModel[];
  equipmentStates: EquipmentState[];
  equipmentStateHistories: EquipmentStateHistory[];
  equipmentPositionHistories: EquipmentPositionHistory[];
  selectedEquipmentId: string | null;
  isLoading: boolean;
  
  // Actions
  fetchData: () => Promise<void>;
  selectEquipment: (id: string | null) => void;
  getEquipmentWithDetails: () => EquipmentWithDetails[];
  getEquipmentStateHistory: (equipmentId: string) => {
    state: EquipmentState;
    date: string;
  }[];
}

export const useStore = create<AppState>((set, get) => ({
  equipments: [],
  equipmentModels: [],
  equipmentStates: [],
  equipmentStateHistories: [],
  equipmentPositionHistories: [],
  selectedEquipmentId: null,
  isLoading: false,
  
  fetchData: async () => {
    set({ isLoading: true });
    try {
      const [
        equipmentsRes,
        equipmentModelsRes,
        equipmentStatesRes,
        equipmentStateHistoriesRes,
        equipmentPositionHistoriesRes
      ] = await Promise.all([
        fetch('/data/equipment.json'),
        fetch('/data/equipmentModel.json'),
        fetch('/data/equipmentState.json'),
        fetch('/data/equipmentStateHistory.json'),
        fetch('/data/equipmentPositionHistory.json')
      ]);
      
      const equipments = await equipmentsRes.json();
      const equipmentModels = await equipmentModelsRes.json();
      const equipmentStates = await equipmentStatesRes.json();
      const equipmentStateHistories = await equipmentStateHistoriesRes.json();
      const equipmentPositionHistories = await equipmentPositionHistoriesRes.json();
      
      set({
        equipments,
        equipmentModels,
        equipmentStates,
        equipmentStateHistories,
        equipmentPositionHistories,
        isLoading: false
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  
  selectEquipment: (id) => set({ selectedEquipmentId: id }),
  
  getEquipmentWithDetails: () => {
    const {
      equipments,
      equipmentModels,
      equipmentStates,
      equipmentStateHistories,
      equipmentPositionHistories
    } = get();
    

    // check and change order
    return equipments.map(equipment => {
      const model = equipmentModels.find(m => m.id === equipment.equipmentModelId) as EquipmentModel;
      
      // Find the latest state
      const stateHistory = equipmentStateHistories.find(h => h.equipmentId === equipment.id);
      const latestStateRecord = stateHistory?.states
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      const currentState = equipmentStates.find(s => s.id === latestStateRecord?.equipmentStateId) as EquipmentState;
      
      // Find the latest position
      const positionHistory = equipmentPositionHistories.find(h => h.equipmentId === equipment.id);
      const currentPosition = positionHistory?.positions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] as Position;
      
      return {
        equipment,
        model,
        currentState,
        currentPosition
      };
    }).filter(item => item.currentPosition); // Filter out equipment without position data
  },
  
  getEquipmentStateHistory: (equipmentId) => {
    const { equipmentStateHistories, equipmentStates } = get();
    
    const stateHistory = equipmentStateHistories.find(h => h.equipmentId === equipmentId);
    if (!stateHistory) return [];
    
    return stateHistory.states
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(record => ({
        state: equipmentStates.find(s => s.id === record.equipmentStateId) as EquipmentState,
        date: record.date
      }));
  }
}));