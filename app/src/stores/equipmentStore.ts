import { defineStore } from 'pinia';
import equipmentData from '../../../data/equipment.json';
import equipmentModelData from '../../../data/equipmentModel.json';
import equipmentPositionHistoryData from '../../../data/equipmentPositionHistory.json';
import equipmentStateData from '../../../data/equipmentState.json';
import equipmentStateHistoryData from '../../../data/equipmentStateHistory.json';

export interface Position {
   lat: number;
   lng: number;
}

export interface Equipment {
   id: string;
   name: string;
   equipmentModelId: string;
}

export interface EquipmentModel {
   id: string;
   name: string;
   hourlyEarnings: { equipmentStateId: string; value: number }[];
}

export interface EquipmentState {
   id: string;
   name: string;
   color: string;
}

export interface EquipmentStateHistory {
   equipmentId: string;
   states: { date: string; equipmentStateId: string }[];
}

export interface EquipmentPositionHistory {
   equipmentId: string;
   positions: { date: string; lat: number; lon: number }[];
}

export const useEquipmentStore = defineStore('equipment', {
   state: () => ({
      equipments: equipmentData as Equipment[],
      models: equipmentModelData as EquipmentModel[],
      positionsHistories: equipmentPositionHistoryData as EquipmentPositionHistory[],
      states: equipmentStateData as EquipmentState[],
      stateHistories: equipmentStateHistoryData as EquipmentStateHistory[],
   }),
   actions: {
      getEquipment(id: string) {
         return this.equipments.find((equip) => equip.id === id);
      },
      getState(id: string) {
         return this.states.find((equip) => equip.id === id);
      },
      getModel(id: string) {
         return this.models.find((model) => model.id === id);
      },
      getPositionHistory(id: string) {
         return this.positionsHistories.find((history) => history.equipmentId === id);
      },
      getStateHistory(id: string) {
         const history = this.stateHistories.find((history) => history.equipmentId === id);
         return history || { states: [] };
      },
   },
});
