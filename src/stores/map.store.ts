import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import type { Position } from './equipment.types'
import { useEquipment } from './equipment.store'
import L from 'leaflet'
import router from '@/router'

export const useMap = defineStore('useMap', () => {
  const southwestEquipment: Ref<Position> = ref({} as Position)
  const northeastEquipment: Ref<Position> = ref({} as Position)

  const equipmentStore = useEquipment()

  const copyright = computed(() =>
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
  )

  const getExtremeBounds = computed(() => {
    findExtremeMarkers()

    return L.latLngBounds([
      [southwestEquipment.value.lat, southwestEquipment.value.lon],
      [northeastEquipment.value.lat, northeastEquipment.value.lon]
    ])
  })

  function findExtremeMarkers() {
    let southwest = equipmentStore.equipments[0].position
    let northeast = equipmentStore.equipments[0].position

    equipmentStore.equipments.forEach((equipment) => {
      if (
        equipment.position.lat < southwest.lat ||
        (equipment.position.lat === southwest.lat && equipment.position.lon < southwest.lon)
      ) {
        southwest = equipment.position
      }

      if (
        equipment.position.lat > northeast.lat ||
        (equipment.position.lat === northeast.lat && equipment.position.lon > northeast.lon)
      ) {
        northeast = equipment.position
      }
    })

    southwestEquipment.value = southwest
    northeastEquipment.value = northeast
  }

  function updateMap() {
    if (router.currentRoute.value.name === 'update') {
      router.push('/')
    } else router.push('/updated')
  }

  return {
    copyright,
    getExtremeBounds,
    northeastEquipment,
    southwestEquipment,
    findExtremeMarkers,
    updateMap
  }
})
