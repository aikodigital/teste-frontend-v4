import { defineStore } from "pinia";
import type {
  Equipment,
  EquipmentModel,
  EquipmentPosition,
  EquipmentState,
  EquipmentStateHistory,
} from "@/types/types";

export const useEquipmentDataStore = defineStore("equipmentData", {
  state: () => ({
    equipment: [] as Equipment[],
    equipmentModels: [] as EquipmentModel[],
    positions: [] as EquipmentPosition[],
    states: [] as EquipmentState[],
    stateHistory: [] as EquipmentStateHistory[],
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
        const response = await fetch("/data/equipmentPositionHistory.json");
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

    getEquipmentById(id: string): Equipment | undefined {
      return this.equipment.find((eq) => eq.id === id);
    },

    getStateById(id: string): EquipmentState | undefined {
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
