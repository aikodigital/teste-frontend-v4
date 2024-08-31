import { getEquipmentStates } from "@/services/EquipmentStateService";
import { EquipmentStateJson } from "@/types/EquipmentState";
import { defineStore } from "pinia";

export const useEquipmentStateStore = defineStore("equipmentState", {
  state: () => {
    return {
      equipmentStates: [] as Array<EquipmentStateJson>,
    };
  },
  actions: {
    async fetchEquipmentStates() {
      this.equipmentStates = await getEquipmentStates();
    },
  },
})