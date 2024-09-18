import { defineStore } from 'pinia'
import equipmentPositionHistory from '@/data/equipmentPositionHistory.json'
import equipmentStateHistory from '@/data/equipmentStateHistory.json'
import equipmentState from '@/data/equipmentState.json'
import equipment from '@/data/equipment.json'
import equipmentModel from '@/data/equipmentModel.json'
import { ref, type Ref } from 'vue'
import type {
  IEquipment,
  IEquipmentsPosition,
  IEquipmentsState,
  Position,
  State
} from './equipment.types'
import { useMap } from './map.store'

export const useEquipment = defineStore('useEquipment', () => {
  const equipments: Ref<IEquipment[]> = ref([])
  const equipmentsLatestPosition: Ref<IEquipmentsPosition[]> = ref([])
  const equipmentsLatestState: Ref<IEquipmentsState[]> = ref([])
  const selectedEquipment: Ref<IEquipment | null> = ref(null)

  const mapStore = useMap()

  const iconsRecord: Record<string, string> = {
    'Caminhão de carga': 'local_shipping',
    Harvester: 'agriculture',
    'Garra traçadora': 'auto_towing',
    Operando: 'manufacturing',
    Manutenção: 'handyman',
    Parado: 'cancel'
  }

  function getPositions() {
    const latestPositions = equipmentPositionHistory.map((equipment) => {
      const positions = equipment.positions.sort((a, b) => {
        return new Date(b.date).getDate() - new Date(a.date).getDate()
      })

      return { equipmentId: equipment.equipmentId, position: positions[0] }
    })

    equipmentsLatestPosition.value = latestPositions
  }

  function getStates() {
    equipmentStateHistory.forEach((equipment) => {
      const { equipmentId, states } = equipment

      const latestState = states.sort(
        (a, b) => new Date(b.date).getDate() - new Date(a.date).getDate()
      )[0]

      const findState = equipmentState.find((state) => state.id === latestState.equipmentStateId)

      if (findState) {
        equipmentsLatestState.value.push({
          equipmentId,
          state: {
            ...findState,
            icon: iconsRecord[findState.name],
            date: new Date(latestState.date)
          }
        })
      }
    })
  }

  function getEquipmentStateHistory(equipmentId: string) {
    const equipmentsStatesById = equipmentStateHistory.find(
      (equipment) => equipment.equipmentId === equipmentId
    )

    if (!equipmentsStatesById) return []

    return equipmentsStatesById.states.map((equipment) => {
      const state = equipmentState.find((state) => state.id === equipment.equipmentStateId)

      if (state) {
        return {
          ...state,
          date: new Date(equipment.date),
          icon: iconsRecord[state.name]
        }
      }

      return {} as State
    })
  }

  function equipmentData(equipmentId: string) {
    if (!equipmentsLatestState.value.length) {
      getStates()
    }

    if (!equipmentsLatestPosition.value.length) {
      getPositions()
    }

    const stateHistory = getEquipmentStateHistory(equipmentId)
    const positionHistory = equipmentPositionHistory.find(
      (equipment) => equipment.equipmentId === equipmentId
    )
    const state = equipmentsLatestState.value.find(
      (equipment) => equipment.equipmentId === equipmentId
    )

    const position = equipmentsLatestPosition.value.find(
      (equipment) => equipment.equipmentId === equipmentId
    )

    const findEquipment = equipment.find((equipment) => equipment.id === equipmentId)
    const model =
      equipmentModel.find((equipment) => findEquipment?.equipmentModelId === equipment.id)?.name ||
      ''

    return {
      equipmentId,
      stateHistory,
      model,
      positionHistory: positionHistory?.positions || [],
      state: state?.state || ({} as State),
      position: position?.position || ({} as Position),
      icon: iconsRecord[model],
      name: findEquipment?.name || ''
    }
  }

  function getAllEquipments() {
    equipments.value = equipment.map((e) => {
      return equipmentData(e.id)
    })
  }

  function selectEquipment(equipmentId?: string) {
    if (equipmentId) {
      selectedEquipment.value = equipmentData(equipmentId)
    } else {
      selectedEquipment.value = null
    }

    mapStore.updateMap()
  }

  function filterEquipments(models: string[], states: string[], term?: string) {
    getAllEquipments()

    if (models.length) {
      equipments.value = equipments.value.filter((equipment) => {
        return models.some((model) => {
          return equipment.model.includes(model)
        })
      })
    }
    if (states.length) {
      equipments.value = equipments.value.filter((equipment) => {
        return states.some((state) => {
          return equipment.state && equipment.state.name.includes(state)
        })
      })
    }
    if (term) {
      equipments.value = equipments.value.filter((equipment) => {
        return (
          equipment.model.toLowerCase().includes(term) ||
          equipment.name.toLowerCase().includes(term) ||
          (equipment.state && equipment.state.name.toLowerCase().includes(term))
        )
      })
    }
  }

  return {
    equipments,
    selectedEquipment,
    getAllEquipments,
    getPositions,
    selectEquipment,
    filterEquipments
  }
})
