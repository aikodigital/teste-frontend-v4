import { defineStore } from "pinia";

export const useEquipmentDataStore = defineStore("equipmentData", {
  state: () => ({
    equipment: [] as { id: string; equipmentModelId: string; name: string }[],
    equipmentModels: [] as {
      id: string;
      name: string;
      hourlyEarnings: { equipmentStateId: string; value: number }[];
    }[],
    positions: [] as {
      equipmentId: string;
      positions: { date: string; lat: number; lon: number }[];
    }[],
    states: [] as { id: string; name: string; color: string }[],
    stateHistory: [] as {
      equipmentId: string;
      states: { equipmentStateId: string; date: string }[];
    }[],
  }),

  actions: {
    async fetchEquipment() {
      if (this.equipment.length === 0) {
        const response = await fetch("/data/equipment.json");
        this.equipment = await response.json();
      }
    },

    async fetchEquipmentModels() {
      if (this.equipmentModels.length === 0) {
        const response = await fetch("/data/equipmentModel.json");
        this.equipmentModels = await response.json();
      }
    },

    async fetchPositions() {
      if (this.positions.length === 0) {
        const response = await fetch("/data/equipmentPosition.json");
        this.positions = await response.json();
      }
    },

    async fetchStates() {
      if (this.states.length === 0) {
        const response = await fetch("/data/equipmentState.json");
        this.states = await response.json();
      }
    },

    async fetchStateHistory() {
      if (this.stateHistory.length === 0) {
        const response = await fetch("/data/equipmentStateHistory.json");
        this.stateHistory = await response.json();
      }
    },

    getEquipmentById(id: string) {
      return this.equipment.find((eq) => eq.id === id);
    },

    getStateById(id: string) {
      return this.states.find((st) => st.id === id);
    },

    getLatestState(equipmentId: string) {
      const history = this.stateHistory.find(
        (h) => h.equipmentId === equipmentId
      );
      return history?.states.length
        ? history.states[history.states.length - 1]
        : undefined;
    },
  },
});
