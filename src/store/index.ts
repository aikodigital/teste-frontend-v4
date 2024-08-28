import { createStore } from 'vuex';
import { EquipmentRepository } from '../repositories/EquipmentRepository';
import { EquipmentState } from '../models/EquipmentState';
import { Equipment } from 'src/models/Equipment';

// Define the shape of your state
interface State {
  equipments: EquipmentState[];
  selectedEquipmentId: string | null; // Allow 'selectedEquipmentId' to be either 'string' or 'null'
}

export default createStore<State>({
  state: {
    equipments: EquipmentRepository.getAll(),
    selectedEquipmentId: null, // Initial value is 'null'
  },
  mutations: {
    selectEquipment(state, equipmentId: string) {
      state.selectedEquipmentId = equipmentId; // Assigning 'string' is now valid
    },
  },
  actions: {
    selectEquipment({ commit }, equipmentId: string) {
      commit('selectEquipment', equipmentId);
    },
  },
  getters: {
    selectedEquipment(state) {
      return state.equipments.find(
        (equipment) => equipment.id === state.selectedEquipmentId,
      );
    },
  },
});
