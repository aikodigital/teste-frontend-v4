import create from 'zustand';

// Definir interfaces para os dados
interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
}

interface EquipmentPosition {
  equipmentId: string;
  lat: number;
  lon: number;
  date: string;
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface StoreState {
  equipment: Equipment[];
  equipmentPositions: EquipmentPosition[];
  equipmentStates: EquipmentState[];
  loadEquipmentData: () => void;
}

// Store para gerenciar os dados
const useStore = create<StoreState>((set) => ({
  equipment: [], // Estado inicial dos equipamentos
  equipmentPositions: [], // Estado inicial das posições
  equipmentStates: [], // Estado inicial dos estados

  // Função para carregar os dados
  loadEquipmentData: async () => {
    const equipment = await fetch('/data/equipment.json').then((res) => res.json());
    const equipmentPositions = await fetch('/data/equipmentPositionHistory.json').then((res) => res.json());
    const equipmentStates = await fetch('/data/equipmentState.json').then((res) => res.json());

    set({ equipment, equipmentPositions, equipmentStates });
  },
}));

export default useStore;
