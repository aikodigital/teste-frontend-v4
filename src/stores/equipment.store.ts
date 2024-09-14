import { defineStore } from 'pinia'
import equipmentPositionHistory from '@/data/equipmentPositionHistory.json'
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

export const useEquipment = defineStore('useEquipment', () => {
  const equipmentsLatestPosition: Ref<IEquipmentsPosition[]> = ref([])
  const southwestEquipment: Ref<IEquipmentsPosition> = ref({} as IEquipmentsPosition)
  const northeastEquipment: Ref<IEquipmentsPosition> = ref({} as IEquipmentsPosition)

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
    // Inicializa os marcadores extremos com o primeiro elemento da lista
    let southwest = equipmentsLatestPosition.value[0]
    let northeast = equipmentsLatestPosition.value[0]

    equipmentsLatestPosition.value.forEach((position) => {
      // Verifica se o marcador atual está mais a sudoeste
      if (
        position.position.lat < southwest.position.lat ||
        (position.position.lat === southwest.position.lat &&
          position.position.lon < southwest.position.lon)
      ) {
        southwest = position
      }

      // Verifica se o marcador atual está mais a nordeste
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

  return {
    equipmentsLatestPosition,
    southwestEquipment,
    northeastEquipment,
    getPositions,
    findExtremeMarkers
  }
})
