import { createStore } from 'vuex';

interface State {
  equipment: any[];
  equipmentState: any[];
  equipmentModel: any[];
  equipmentStateHistory: any[];
  equipmentPositionHistory: any[];
}

export default createStore<State>({
  state: {
    equipment: [],
    equipmentState: [],
    equipmentModel: [],
    equipmentStateHistory: [],
    equipmentPositionHistory: []
  },
  mutations: {
    setEquipment(state, data) {
      state.equipment = data;
    },
    setEquipmentState(state, data) {
      state.equipmentState = data;
    },
    setEquipmentModel(state, data) {
      state.equipmentModel = data;
    },
    setEquipmentStateHistory(state, data) {
      state.equipmentStateHistory = data;
    },
    setEquipmentPositionHistory(state, data) {
      state.equipmentPositionHistory = data;
    }
  },
  actions: {
    async fetchData({ commit }) {
      // Carregar os dados dos arquivos JSON e armazenar no estado
      const [equipment, equipmentState, equipmentModel, equipmentStateHistory, equipmentPositionHistory] = await Promise.all([
        import('./data/equipment.json'),
        import('./data/equipmentState.json'),
        import('./data/equipmentModel.json'),
        import('./data/equipmentStateHistory.json'),
        import('./data/equipmentPositionHistory.json')
      ]);

      commit('setEquipment', equipment.default);
      commit('setEquipmentState', equipmentState.default);
      commit('setEquipmentModel', equipmentModel.default);
      commit('setEquipmentStateHistory', equipmentStateHistory.default);
      commit('setEquipmentPositionHistory', equipmentPositionHistory.default);
    }
  }
});
