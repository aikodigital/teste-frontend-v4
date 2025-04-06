import Vue from 'vue'
import Vuex from 'vuex'

import equipment from '../../data/equipment.json'
import equipmentModel from '../../data/equipmentModel.json'
import equipmentState from '../../data/equipmentState.json'
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json'
import equipmentStateHistory from '../../data/equipmentStateHistory.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    equipamentosTratados: [],
    equipamentosFiltrados: [],
    dadosEquipamentos: {
      equipamentos: equipment,
      equipamentosModelo: equipmentModel,
      equipamentosEstado: equipmentState,
      equipamentosPosicaoHistory: equipmentPositionHistory,
      equipamentosEstadoHistory: equipmentStateHistory
    }
  },
  mutations: {
    GETDADOSEQUIPMENTOS (state, payload) {
      state.equipamentosTratados = payload
      state.equipamentosFiltrados = JSON.parse(JSON.stringify(payload))
    },
    SETEQUIPAMENTOSFILTRADOS (state, payload) {
      state.equipamentosFiltrados = JSON.parse(JSON.stringify(payload))
    }
  },
  actions: {
    getDadosEquipamentos: function ({ state, commit }) {
      const stateMap = new Map();
      state.dadosEquipamentos.equipamentosEstado.forEach(state => {
        stateMap.set(state.id, {
          name: state.name,
          color: state.color
        })
      })

      const modelMap = new Map()
      state.dadosEquipamentos.equipamentosModelo.forEach(model => {
        modelMap.set(model.id, {
          name: model.name,
          hourlyEarnings: model.hourlyEarnings.map(earning => ({
            equipmentStateId: earning.equipmentStateId,
            value: earning.value,
            state: stateMap.get(earning.equipmentStateId) || null
          }))
        })
      })

      const equipmentMap = new Map()
      state.dadosEquipamentos.equipamentos.forEach(equip => {
        equipmentMap.set(equip.id, {
          id: equip.id,
          equipmentModelId: equip.equipmentModelId,
          name: equip.name,
          model: modelMap.get(equip.equipmentModelId) || null,
          positions: []
        })
      })

      // 4. Adicionar e ordenar posições
      state.dadosEquipamentos.equipamentosPosicaoHistory.forEach(history => {
        const equipment = equipmentMap.get(history.equipmentId);
        if (equipment) {
          equipment.positions = history.positions.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
          });
        }
      })

      // 5. Adicionar e ordenar estados
      state.dadosEquipamentos.equipamentosEstadoHistory.forEach(history => {
        const equipment = equipmentMap.get(history.equipmentId)
        if (equipment) {
          const earningsMap = new Map();
          equipment.model.hourlyEarnings.forEach(earning => {
            earningsMap.set(earning.equipmentStateId, earning.value)
          })

          equipment.states = history.states
            .map(state => {
              const value = earningsMap.get(state.equipmentStateId) || 0;

              return {
                ...state,
                stateInfo: stateMap.get(state.equipmentStateId) || null,
                hourlyEarning: value
              }
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date))

          const statesWithValues = equipment.states.map((currentState, index) => {
            const endDate = index < equipment.states.length - 1
              ? new Date(equipment.states[index + 1].date)
              : null

            let startDate = new Date(currentState.date)
            let hourlyValue = currentState.hourlyEarning || 0
            let hours = '-'
            let totalValue = '-'
            if (endDate) {
              hours = (endDate - startDate) / (1000 * 60 * 60)
              totalValue = hourlyValue * hours
            }

            return {
              ...currentState,
              startDate: currentState.date,
              endDate: endDate,
              hoursInState: hours,
              totalValue: totalValue
            };
          });

          equipment.states = statesWithValues.sort((a, b) => new Date(b.date) - new Date(a.date))
        }
      })

      commit('GETDADOSEQUIPMENTOS', Array.from(equipmentMap.values()))
    },
    applyFilters: function ({ state, commit }, filters) {
      let equipamentosFiltrados = state.equipamentosTratados.filter(equipment => {
        // Filtro por modelo
        if (filters.model &&
          equipment.equipmentModelId !== filters.model) {
          return false
        }

        // Filtro por estado
        if (filters.status) {
          const lastState = equipment.states?.[0]?.equipmentStateId;
          if (!lastState || lastState !== filters.status) {
            return false
          }
        }

        // Filtro por equipamento
        if (filters.equipamento &&
          equipment.id !== filters.equipamento) {
          return false
        }

        return true
      });

      commit('SETEQUIPAMENTOSFILTRADOS', equipamentosFiltrados)
    }
  }
})
