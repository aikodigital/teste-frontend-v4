import { defineStore } from "pinia";
import { Equipment } from "../types/Equipment";
import { getEquipments } from "../services/EquipmentService";

export const useEquipmentStore = defineStore("equipment", {
  state: () => ({
    equipments: [] as Array<Equipment>,
  }),
  actions: {
    async fetchEquipments() {
      this.equipments = await getEquipments(["position", "state", "model"]);
    }
  }
});