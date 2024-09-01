import { defineStore } from "pinia";
import { EquipmentModelJson } from "../types/EquipmentModel";
import { getEquimentModels } from "../services/EquipmentModelService";

export const useEquipmentModelStore = defineStore("equipmentModel", {
  state: () => ({
    equipmentModels: [] as Array<EquipmentModelJson>,
  }),
  actions: {
    async fetchEquipmentModels() {
      this.equipmentModels = await getEquimentModels();
    },
    getEquimentModel(id: string) {
      return this.equipmentModels.find((equipmentModel) => equipmentModel.id === id);
    }
  },
});