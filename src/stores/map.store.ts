import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import type { Position } from './equipment.types'
import { useEquipment } from './equipment.store'
import L from 'leaflet'
import router from '@/router'

export const useMap = defineStore('useMap', () => {
  const southEquipment: Ref<Position> = ref({} as Position)
  const westEquipment: Ref<Position> = ref({} as Position)
  const northEquipment: Ref<Position> = ref({} as Position)
  const eastEquipment: Ref<Position> = ref({} as Position)

  const equipmentStore = useEquipment()

  const copyright = computed(() =>
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
  )

  const getExtremeBounds = computed(() => {
    findExtremeMarkers()

    return L.latLngBounds([
      [westEquipment.value.lat, southEquipment.value.lon],
      [eastEquipment.value.lat, northEquipment.value.lon]
    ])
  })

  function findExtremeMarkers() {
    let south = equipmentStore.equipments[0].position
    let west = equipmentStore.equipments[0].position
    let north = equipmentStore.equipments[0].position
    let east = equipmentStore.equipments[0].position

    equipmentStore.equipments.forEach((equipment) => {
      if (equipment.position.lat > north.lat) {
        north = equipment.position
      }

      if (equipment.position.lat < south.lat) {
        south = equipment.position
      }

      if (equipment.position.lon > east.lon) {
        east = equipment.position
      }

      if (equipment.position.lon < west.lon) {
        west = equipment.position
      }
    })

    southEquipment.value = south
    northEquipment.value = north
    westEquipment.value = west
    eastEquipment.value = east
  }

  function updateMap() {
    if (router.currentRoute.value.name === 'update') {
      router.push('/')
    } else router.push('/updated')
  }

  return {
    copyright,
    getExtremeBounds,
    updateMap
  }
})
