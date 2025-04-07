import { defineStore } from "pinia";

// Tipagens para os dados utilizados
interface Position {
  date: string;
  lat: number;
  lon: number;
}

interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
  type: string;
}

interface EquipmentModel {
  id: string;
  name: string;
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface EquipmentStateHistory {
  equipmentId: string;
  states: { equipmentStateId: string; date: string }[];
}

export const useEquipmentStore = defineStore("equipment", {
  state: () => ({
    // Dados brutos carregados dos arquivos
    equipments: [] as Equipment[],
    positionHistory: {} as Record<string, Position[]>,
    equipmentModels: [] as EquipmentModel[],
    equipmentStates: [] as EquipmentState[],
    stateHistory: {} as Record<string, { equipmentStateId: string; date: string }[]>,

    // Equipamento selecionado e linha do tempo ativa
    selectedEquipmentId: null as string | null,
    openTimelineEquipmentId: null as string | null,

    // Intervalo total de datas baseado nos dados de posição
    historicalRange: {
      start: new Date(0),
      end: new Date(),
    },

    // Filtros aplicáveis na interface
    filters: {
      type: null as string | null,
      status: null as string | null,
      period: "custom" as "1d" | "7d" | "30d" | "custom",
      dateRange: {
        start: new Date(0),
        end: new Date(),
      },
      search: "",
    },

    // Dados filtrados usados em mapa, tabela e gráficos
    filteredData: {
      equipments: [] as Equipment[],
      positionHistory: {} as Record<string, Position[]>,
      stateHistory: {} as Record<string, { equipmentStateId: string; date: string }[]>,
    },
  }),

  actions: {
    // Carrega os equipamentos
    async loadEquipments() {
      const eq = await fetch("/data/equipment.json").then((res) => res.json());
      this.equipments = this.filteredData.equipments = eq;
    },

    // Carrega histórico de posições e define o intervalo global (historicalRange)
    async loadPositionHistory() {
      const pos = await fetch("/data/equipmentPositionHistory.json").then(
        (res) => res.json()
      );

      // Monta o histórico agrupado por equipamento
      this.positionHistory = this.filteredData.positionHistory =
        Object.fromEntries(pos.map((p: any) => [p.equipmentId, p.positions]));

      // Extrai todas as datas válidas
      const allDates = Object.values(this.positionHistory)
        .flat()
        .map((p: Position) => new Date(p.date).getTime())
        .filter((t) => !isNaN(t)); // 🔒 segurança contra datas inválidas

      // Calcula range histórico
      if (allDates.length) {
        this.historicalRange = {
          start: new Date(Math.min(...allDates)),
          end: new Date(Math.max(...allDates)),
        };
      } else {
        this.historicalRange = {
          start: new Date(0),
          end: new Date(),
        };
      }
    },
    async loadEquipmentModels() {
      const models = await fetch("/data/equipmentModel.json").then((res) =>
        res.json()
      );
      this.equipmentModels = models;
    },

    // Carrega os estados possíveis dos equipamentos
    async loadEquipmentStates() {
      const states = await fetch("/data/equipmentState.json").then((res) =>
        res.json()
      );
      this.equipmentStates = states;
    },

    // Carrega histórico de estados dos equipamentos
    async loadStateHistory() {
      const history = await fetch("/data/equipmentStateHistory.json").then((res) =>
        res.json()
      );
      this.stateHistory = Object.fromEntries(
        history.map((entry: EquipmentStateHistory) => [entry.equipmentId, entry.states])
      );
    },

    // Aplica os filtros (busca, tipo, status e período)
    updateFilteredEquipments() {
      const { type, status, search, period } = this.filters;

      // Use historicalRange para definir o intervalo padrão

      const end = new Date(this.historicalRange.end);
      end.setHours(23, 59, 59, 999);
      let start = new Date(this.historicalRange.start);

      if (period === "1d") {
        start = new Date(end);
        start.setDate(end.getDate() - 1);
        start.setHours(0, 0, 0, 0);
      } else if (period === "7d") {
        start = new Date(end);
        start.setDate(end.getDate() - 7);
        start.setHours(0, 0, 0, 0);
      } else if (period === "30d") {
        start = new Date(end);
        start.setDate(end.getDate() - 30);
        start.setHours(0, 0, 0, 0);
      } else {
        start = new Date(this.filters.dateRange.start);
      }

      this.filters.dateRange = { start, end };

      const searchTerm = (search || "").toLowerCase().trim();

      // Filtra equipamentos
      const filteredEquipments = this.equipments.filter((equipment) => {
        const model = this.equipmentModels.find(
          (m) => m.id === equipment.equipmentModelId
        );
        const modelName = model?.name || "";

        const stateHist = this.stateHistory[equipment.id] || [];
        const lastStateId =
          stateHist.length > 0
            ? stateHist[stateHist.length - 1].equipmentStateId
            : null;
        const state = this.equipmentStates.find((s) => s.id === lastStateId);
        const stateName = state?.name || "";

        const matchesSearch =
          equipment.name.toLowerCase().includes(searchTerm) ||
          modelName.toLowerCase().includes(searchTerm);

        return (
          (!type || modelName === type) &&
          (!status || stateName === status) &&
          matchesSearch
        );
      });

      this.filteredData.equipments = filteredEquipments;

      // Aplica os filtros de data ao histórico
      this.filteredData.positionHistory = {};
      this.filteredData.stateHistory = {};

      for (const equip of filteredEquipments) {
        const allPositions = this.positionHistory[equip.id] || [];
        this.filteredData.positionHistory[equip.id] = allPositions.filter((pos) => {
          const d = new Date(pos.date);
          return d >= start && d <= end;
        });

        const allStates = this.stateHistory[equip.id] || [];
        this.filteredData.stateHistory[equip.id] = allStates.filter((s) => {
          const d = new Date(s.date);
          return d >= start && d <= end;
        });
      }
    },

    // Utilitários para obter dados de posição e estado
    getLastPosition(equipmentId: string): Position | null {
      const positions = this.positionHistory[equipmentId];
      if (!positions || positions.length === 0) return null;
      return positions.slice(-1)[0];
    },

    getFormattedLastPosition(equipmentId: string): string {
      const pos = this.getLastPosition(equipmentId);
      if (!pos) return "Data desconhecida";
      return new Date(pos.date).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      });
    },

    getEquipmentStateName(stateId: string): string {
      const state = this.equipmentStates.find((s) => s.id === stateId);
      return state ? state.name : "Estado desconhecido";
    },

    getEquipmentStateColor(stateId: string): string {
      const state = this.equipmentStates.find((s) => s.id === stateId);
      return state ? state.color : "#ccc";
    },

    getStateHistoryForSelected(): { equipmentStateId: string; date: string }[] {
      if (!this.selectedEquipmentId) return [];
      return this.stateHistory[this.selectedEquipmentId] || [];
    },

    getEquipmentName(id: string): string {
      const equip = this.equipments.find((e) => e.id === id);
      return equip?.name ?? "Sem nome";
    },

    getModelName(modelId: string): string {
      const model = this.equipmentModels.find((m) => m.id === modelId);
      return model?.name ?? "Modelo desconhecido";
    },

    // Ações para seleção de equipamento
    selectEquipment(id: string) {
      this.selectedEquipmentId = id;
    },

    setOpenTimelineEquipment(id: string | null) {
      this.openTimelineEquipmentId = id;
    },
  },
});
