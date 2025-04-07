// src/store/equipmentStore.js
import { defineStore } from 'pinia'

export const useEquipmentStore = defineStore('equipment', {
  state: () => ({
    equipments: [],
    models: [],
    states: [],
    stateHistories: [],
    positionHistories: [],
    selectedEquipment: null,
    filters: {
      state: '',
      model: '',
    },
    searchQuery: '',
  }),
  getters: {
    getLatestPositions(equipmentId) {
      return equipmentId.equipments.map((eq) => {
        const posHistory = equipmentId.positionHistories.find((ph) => ph.equipmentId === eq.id)
        if (posHistory && posHistory.positions.length) {
          const latest = posHistory.positions.reduce((prev, current) =>
            new Date(prev.date) > new Date(current.date) ? prev : current,
          )
          return { ...eq, lat: latest.lat, lon: latest.lon }
        }
        return eq
      })
    },
    getCurrentState: (state) => (equipmentId) => {
      const history = state.stateHistories.find((h) => h.equipmentId === equipmentId)
      if (history && history.states.length) {
        const latest = history.states.reduce((prev, curr) =>
          new Date(prev.date) > new Date(curr.date) ? prev : curr,
        )
        return {
          state: state.states.find((s) => s.id === latest.equipmentStateId) || {},
          date: latest.date,
        }
      }
      return {}
    },
    getFilteredEquipments(state) {
      let equipments = state.equipments.map((eq) => {
        const posHistory = state.positionHistories.find((ph) => ph.equipmentId === eq.id)
        if (posHistory && posHistory.positions.length) {
          const latest = posHistory.positions.reduce((prev, current) =>
            new Date(prev.date) > new Date(current.date) ? prev : current,
          )
          return { ...eq, lat: latest.lat, lon: latest.lon }
        }
        return eq
      })
      if (state.filters.state) {
        equipments = equipments.filter((eq) => {
          const history = state.stateHistories.find((h) => h.equipmentId === eq.id)
          if (history && history.states.length) {
            const latest = history.states.reduce((prev, curr) =>
              new Date(prev.date) > new Date(curr.date) ? prev : curr,
            )
            return latest.equipmentStateId === state.filters.state
          }
          return false
        })
      }
      if (state.filters.model) {
        equipments = equipments.filter((eq) => eq.equipmentModelId === state.filters.model)
      }
      if (state.searchQuery) {
        equipments = equipments.filter((eq) =>
          eq.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
        )
      }
      return equipments
    },
    getEquipmentModel: (state) => (modelId) => {
      return state.models.find((m) => m.id === modelId) || {}
    },
  },
  actions: {
    async loadInitialData() {
      const files = [
        'equipment',
        'equipmentModel',
        'equipmentState',
        'equipmentStateHistory',
        'equipmentPositionHistory',
      ]
      const dataPromises = files.map(async (file) => {
        const res = await fetch(`./data/${file}.json`)
        return res.json()
      })
      const [equipments, models, states, stateHistories, positionHistories] =
        await Promise.all(dataPromises)
      this.equipments = equipments
      this.models = models
      this.states = states
      this.stateHistories = stateHistories
      this.positionHistories = positionHistories
    },
    async loadPositionHistory(equipmentId) {
      try {
        const response = await fetch(`./data/equipmentPositionHistory.json`)
        const data = await response.json()
        const history = data.find((h) => h.equipmentId === equipmentId)
        if (history) {
          const index = this.positionHistories.findIndex((ph) => ph.equipmentId === equipmentId)
          if (index !== -1) {
            this.positionHistories[index] = history
          } else {
            this.positionHistories.push(history)
          }
        }
      } catch (error) {
        console.error('Error loading position history:', error)
      }
    },
    getStateName(stateId) {
      const state = this.states.find((s) => s.id === stateId)
      return state ? state.name : 'N/A'
    },
    getEquipmentDetails(equipmentId) {
      console.log('Getting details for equipment:', equipmentId)
      const eq = this.equipments.find((e) => e.id === equipmentId)
      if (!eq) {
        console.warn('Equipment not found:', equipmentId)
        return null
      }
      const model = this.models.find((m) => m.id === eq?.equipmentModelId)
      const lastPosition = this.positionHistories
        .find((ph) => ph.equipmentId === equipmentId)
        ?.positions?.slice(-1)[0]
      const stateHistory =
        this.stateHistories.find((sh) => sh.equipmentId === equipmentId)?.states || []

      return {
        ...eq,
        model,
        lastPosition,
        stateHistory,
      }
    },
    selectEquipment(equipment) {
      this.selectedEquipment = equipment
    },
    // Atualiza os filtros (estado e modelo)
    filterEquipments({ state, model }) {
      this.filters = { state, model }
    },
    // Atualiza o valor da pesquisa
    searchEquipment(query) {
      if (query === undefined || query === null) {
        this.searchQuery = ''
        return
      }
      this.searchQuery = query.trim().toLowerCase()
    },
    getHoursByAllStates(equipmentId) {
      const historyObj = this.stateHistories.find((h) => h.equipmentId === equipmentId)
      if (!historyObj || !historyObj.states.length) return {}
      const sorted = [...historyObj.states].sort((a, b) => new Date(a.date) - new Date(b.date))
      const result = {}
      for (let i = 0; i < sorted.length; i++) {
        const current = sorted[i]
        const currentDate = new Date(current.date)
        let nextDate
        if (i < sorted.length - 1) {
          nextDate = new Date(sorted[i + 1].date)
        } else {
          nextDate = new Date()
        }
        const diffHours = (nextDate - currentDate) / (1000 * 60 * 60)
        result[current.equipmentStateId] = (result[current.equipmentStateId] || 0) + diffHours
      }
      return result
    },
    getHoursByState(equipmentId, stateName) {
      const stateObj = this.states.find((s) => s.name.toLowerCase() === stateName.toLowerCase())
      if (!stateObj) return 0
      const allHours = this.getHoursByAllStates(equipmentId)
      return allHours[stateObj.id] || 0
    },
  },
})
