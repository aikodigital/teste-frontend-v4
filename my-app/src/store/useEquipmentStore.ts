import { create } from "zustand";
import { Equipment, EquipmentModel, EquipmentState, EquipmentPositionHistory, EquipmentStateHistory } from "@/types";

interface EquipmentStoreState {
  equipment: Equipment[];
  equipmentModels: EquipmentModel[];
  equipmentStates: EquipmentState[];
  equipmentPositions: EquipmentPositionHistory[];
  equipmentStateHistories: EquipmentStateHistory[];

  // Métodos
  loadEquipmentData: () => Promise<void>;
  getLatestPosition: (equipmentId: string) => EquipmentPositionHistory['positions'][0] | null;
  getLatestState: (equipmentId: string) => EquipmentState | null;
  getStateHistory: (equipmentId: string) => { date: string; state: string }[];
  getEquipmentModel: (equipmentModelId: string) => EquipmentModel | undefined;
  getHourlyEarnings: (equipmentModelId: string, equipmentStateId: string) => number | null;

  // Novas Funções
  countEquipmentsInState: (stateName: string) => number;
}

const useEquipmentStore = create<EquipmentStoreState>((set) => ({
  equipment: [],
  equipmentModels: [],
  equipmentStates: [],
  equipmentPositions: [],
  equipmentStateHistories: [],

  // Carregar os dados dos arquivos JSON
  loadEquipmentData: async () => {
    try {
      // Carregar dados de múltiplos arquivos JSON
      const [equipment, equipmentModels, equipmentStates, equipmentPositions, equipmentStateHistories] = await Promise.all([
        fetch('/data/equipment.json').then((res) => {
          if (!res.ok) throw new Error("Erro ao carregar equipment.json");
          return res.json();
        }),

        fetch('/data/equipmentModel.json').then((res) => {
          if (!res.ok) throw new Error("Erro ao carregar equipmentModel.json");
          return res.json();
        }),

        fetch('/data/equipmentState.json').then((res) => {
          if (!res.ok) throw new Error("Erro ao carregar equipmentState.json");
          return res.json();
        }),

        fetch('/data/equipmentPositionHistory.json').then((res) => {
          if (!res.ok) throw new Error("Erro ao carregar equipmentPositionHistory.json");
          return res.json();
        }),

        fetch('/data/equipmentStateHistory.json').then((res) => {
          if (!res.ok) throw new Error("Erro ao carregar equipmentStateHistory.json");
          return res.json();
        }),
      ]);

      // Atualizar o estado com os dados carregados
      set({
        equipment,
        equipmentModels,
        equipmentStates,
        equipmentPositions,
        equipmentStateHistories,
      });

      console.log("Todos os dados foram carregados com sucesso.");
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
    }
  },

  // Obter a última posição de um equipamento
  getLatestPosition: (equipmentId: string) => {
    const positionHistory = useEquipmentStore.getState().equipmentPositions.find(
      (position) => position.equipmentId === equipmentId
    );
    if (!positionHistory || positionHistory.positions.length === 0) return null;
    return positionHistory.positions.slice(-1)[0]; // Retorna a última posição de forma segura
  },

  // Obter o último estado de um equipamento
  getLatestState: (equipmentId: string) => {
    const stateHistory = useEquipmentStore.getState().equipmentStateHistories.find(
      (state) => state.equipmentId === equipmentId
    );
    if (!stateHistory || stateHistory.states.length === 0) return null;
    const latestStateId = stateHistory.states.slice(-1)[0].equipmentStateId; // Pega o último estado de maneira segura
    return useEquipmentStore.getState().equipmentStates.find((state) => state.id === latestStateId) || null;
  },

  // Obter o histórico de estados de um equipamento
  getStateHistory: (equipmentId: string) => {
    const stateHistory = useEquipmentStore.getState().equipmentStateHistories.find(
      (state) => state.equipmentId === equipmentId
    );
    if (!stateHistory) return [];
    return stateHistory.states.map((stateEntry) => {
      const stateInfo = useEquipmentStore.getState().equipmentStates.find(
        (state) => state.id === stateEntry.equipmentStateId
      );
      return { date: stateEntry.date, state: stateInfo?.name || "Desconhecido" };
    });
  },

  // Obter o modelo de equipamento
  getEquipmentModel: (equipmentModelId: string) => {
    return useEquipmentStore.getState().equipmentModels.find((model) => model.id === equipmentModelId);
  },

  // Obter os ganhos por hora de um equipamento
  getHourlyEarnings: (equipmentModelId: string, equipmentStateId: string) => {
    const model = useEquipmentStore.getState().equipmentModels.find((m) => m.id === equipmentModelId);
    if (!model) return null;
    const earning = model.hourlyEarnings.find((earning) => earning.equipmentStateId === equipmentStateId);
    return earning ? earning.value : null;
  },

  // Função para contar os equipamentos em um determinado estado (Operando, Manutenção, Parado)
  countEquipmentsInState: (stateName: string) => {
    return useEquipmentStore.getState().equipmentStateHistories.filter((stateHistory) => {
      const latestState = stateHistory.states.slice(-1)[0]; // Obtém o último estado
      const stateInfo = useEquipmentStore.getState().equipmentStates.find(
        (state) => state.id === latestState.equipmentStateId
      );
      return stateInfo?.name === stateName;
    }).length;
  },
}));



export default useEquipmentStore;
