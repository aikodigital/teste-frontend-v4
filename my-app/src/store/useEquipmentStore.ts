import { create } from 'zustand';


// Interface para os dados de um equipamento
interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
}

// Interface para o estado de um equipamento
interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

// Interface para a posição de um equipamento
interface EquipmentPosition {
  id: string;
  lat: number;
  lng: number;
  date: string;
}

// Interface para o estado da store
interface EquipmentStore {
  equipmentList: Equipment[];
  equipmentStates: EquipmentState[];
  equipmentPositions: EquipmentPosition[];
  fetchEquipmentData: () => Promise<void>;
  fetchEquipmentState: () => Promise<void>;
  fetchEquipmentPositions: () => Promise<void>;
}

// Criação da store usando Zustand
export const useEquipmentStore = create<EquipmentStore>((set) => ({
  equipmentList: [],
  equipmentStates: [],
  equipmentPositions: [],
  
  // Fetch equipamentos (exemplo usando JSON local)
  fetchEquipmentData: async () => {
    const response = await fetch('/data/equipment.json');
    const data = await response.json();
    set({ equipmentList: data });
  },

  // Fetch estados dos equipamentos (exemplo usando JSON local)
  fetchEquipmentState: async () => {
    const response = await fetch('/data/equipmentState.json');
    const data = await response.json();
    set({ equipmentStates: data });
  },

  // Fetch posições dos equipamentos (exemplo usando JSON local)
  fetchEquipmentPositions: async () => {
    const response = await fetch('/data/equipmentPositionHistory.json');
    const data = await response.json();
    set({ equipmentPositions: data });
  },
}));
