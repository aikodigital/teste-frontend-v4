import { defineStore } from 'pinia'
import equipmentPositionHistory from '@/data/equipmentPositionHistory.json'
import equipmentStateHistory from '@/data/equipmentStateHistory.json'
import equipmentState from '@/data/equipmentState.json'
import equipment from '@/data/equipment.json'
import equipmentModel from '@/data/equipmentModel.json'
import { ref, type Ref } from 'vue'

export type Position = {
  date: string
  lat: number
  lon: number
}

export interface IEquipmentsPosition {
  equipmentId: string
  position: Position
}

export type State = {
  id: string
  name: string
  color: string
  date?: Date
}

export interface IEquipmentsState {
  equipmentId: string
  state: State
}

export interface IEquipment {
  name: string
  model: string
  equipmentId: string
  state: State
  position: Position
  icon: String
  stateHistory?: State[]
}

export const useEquipment = defineStore('useEquipment', () => {
  const equipmentsLatestPosition: Ref<IEquipmentsPosition[]> = ref([])
  const equipmentsLatestState: Ref<IEquipmentsState[]> = ref([])
  const southwestEquipment: Ref<IEquipmentsPosition> = ref({} as IEquipmentsPosition)
  const northeastEquipment: Ref<IEquipmentsPosition> = ref({} as IEquipmentsPosition)
  const allEquipments: Ref<IEquipment[]> = ref([])
  const selectedEquipment: Ref<IEquipment | null> = ref(null)
  const selectedEquipmentStateHistory: Ref<State[]> = ref([])

  function getPositions() {
    const equipmentsPositions = equipmentPositionHistory.map((equipment) => {
      const positions = equipment.positions.sort((a, b) => {
        return new Date(b.date).getDate() - new Date(a.date).getDate()
      })

      return { equipmentId: equipment.equipmentId, position: positions[0] }
    })

    equipmentsLatestPosition.value = equipmentsPositions
  }

  function findExtremeMarkers() {
    let southwest = equipmentsLatestPosition.value[0]
    let northeast = equipmentsLatestPosition.value[0]

    equipmentsLatestPosition.value.forEach((position) => {
      if (
        position.position.lat < southwest.position.lat ||
        (position.position.lat === southwest.position.lat &&
          position.position.lon < southwest.position.lon)
      ) {
        southwest = position
      }

      if (
        position.position.lat > northeast.position.lat ||
        (position.position.lat === northeast.position.lat &&
          position.position.lon > northeast.position.lon)
      ) {
        northeast = position
      }
    })

    southwestEquipment.value = southwest
    northeastEquipment.value = northeast
  }

  function getStates() {
    const equipmentsStatesById = equipmentStateHistory.map((equipment) => {
      const states = equipment.states.sort((a, b) => {
        return new Date(b.date).getDate() - new Date(a.date).getDate()
      })

      return { equipmentId: equipment.equipmentId, state: states[0] }
    })

    const equipmentsStates = equipmentsStatesById.map((equipment) => {
      const state = equipmentState.find((state) => state.id === equipment.state.equipmentStateId)

      return { equipmentId: equipment.equipmentId, state: state || ({} as State) }
    })

    equipmentsLatestState.value = equipmentsStates
  }

  function equipmentData(equipmentId: string) {
    if (!equipmentsLatestState.value.length) {
      getStates()
    }

    if (!equipmentsLatestPosition.value.length) {
      getPositions()
    }

    if (!selectedEquipmentStateHistory.value.length) {
      stateHistory(equipmentId)
    }

    const state = equipmentsLatestState.value.find(
      (equipment) => equipment.equipmentId === equipmentId
    )
    const position = equipmentsLatestPosition.value.find(
      (equipment) => equipment.equipmentId === equipmentId
    )

    const name = equipment.find((equipment) => equipment.id === equipmentId)
    const model = equipmentModel.find((equipment) => name?.equipmentModelId === equipment.id)

    return {
      equipmentId,
      state: state?.state || ({} as State),
      position: position?.position || ({} as Position),
      icon: '',
      name: name?.name || '',
      model: model?.name || '',
      stateHistory: selectedEquipmentStateHistory.value
    }
  }

  function getAllEquipments() {
    equipment.forEach((e) => {
      allEquipments.value.push(equipmentData(e.id))
    })
  }

  function selectEquipment(equipmentId: string) {
    selectedEquipment.value = equipmentData(equipmentId)
  }

  function stateHistory(equipmentId: string) {
    const equipmentsStatesById = equipmentStateHistory.find(
      (equipment) => equipment.equipmentId === equipmentId
    )
    equipmentsStatesById?.states.map((equipment) => {
      const state = equipmentState.find((state) => state.id === equipment.equipmentStateId)

      if (state)
        selectedEquipmentStateHistory.value?.push({ ...state, date: new Date(equipment.date) })
    })
  }

  return {
    allEquipments,
    equipmentsLatestPosition,
    equipmentsLatestState,
    northeastEquipment,
    selectedEquipment,
    southwestEquipment,
    selectedEquipmentStateHistory,
    equipmentData,
    findExtremeMarkers,
    getAllEquipments,
    getPositions,
    getStates,
    selectEquipment,
    stateHistory
  }
})
