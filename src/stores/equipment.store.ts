import { defineStore } from 'pinia';
import { getEquipmentsWithModelAndState, getEquipmentPositionHistory, getEquipmentStateHistory } from '../services/calcs';
import { SwalAlertError } from '../services/swal';

interface Filter {
  date: string | null;
  equipmentModelId: string | null;
  equipmentStateId: string | null;
}

export const useEquipmentsStore = defineStore('equipmentsStore', {
  state: () => ({
    equipmentSelected: null,
    positionEquipment: null,
    listEquipmentsStateHistory: [],
    listEquipments: []
  }),
  actions: {
    async getEquipments() {
      this.listEquipments = await getEquipmentsWithModelAndState();
    },
    async getPosition(equipmentId: string) {
      this.positionEquipment = await getEquipmentPositionHistory(equipmentId).history?.positions;
    },
    async setEquipment(value) {
      this.equipmentSelected = value;

      await this.getPosition(value.id);
    },
    async setNull() {
      this.equipmentSelected = null;
      this.positionEquipment = null;
    },
    async setFilters (filter: Filter) {
      if (!this.equipmentSelected) {
        return SwalAlertError('Selecione um equipamento para prosseguir');
      }

      if (this.validateFilter(filter)) {
        const equipment = this.equipmentSelected;
        let positions = this.positionEquipment;

        if (filter.date) {
          const newDate = new Date(filter.date);
          positions = positions?.filter(item => {
            const dataItem = new Date(item.date);
            return dataItem.getFullYear() === newDate.getFullYear() &&
              dataItem.getMonth() === newDate.getMonth() &&
              dataItem.getDate() === newDate.getDate();
          });
        }

        await this.setNull();
        this.equipmentSelected = equipment;
        this.positionEquipment = positions;
      }
    },
    async getStateHistory() {
      this.listEquipmentsStateHistory = [];
      this.listEquipmentsStateHistory = await getEquipmentStateHistory(this.equipmentSelected?.id);
    },
    validateFilter(filter: Filter): boolean {
      if (!filter.date && !filter.equipmentModelId && !filter.equipmentStateId) {
        SwalAlertError('Selecione ao menos um filtro para prosseguir');
        return false;
      }

      return true;
    }
  }
});
