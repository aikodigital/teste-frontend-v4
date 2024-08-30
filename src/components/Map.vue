<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import leaflet, { type LatLngTuple } from 'leaflet'
import { computed, onMounted, watch } from 'vue'
import { useEquipmentsStore } from '~/stores/equipments'
import {
  formatDate,
  returnEquipmentBasedOnId,
  returnEquipmentStateBasedOnDate,
} from '~/utils/formatValue'
import { notify } from '~/utils/notify'

interface Props {
  equipmentFiltered?: string
  statusFiltered?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['changeSelectedEquipment'])
let map: leaflet.Map
let markers: leaflet.Marker[] = []
let polylines: leaflet.Polyline[] = []
const equipmentsStore = useEquipmentsStore()
const brokenCarIcon = leaflet.icon({
  iconUrl: '/src/assets/images/red-marker.png',
  iconSize: [38, 38],
  iconAnchor: [20, 32],
  shadowAnchor: [4, 62],
  popupAnchor: [0, -15],
})

const workingCarIcon = leaflet.icon({
  iconUrl: '/src/assets/images/green-marker.png',
  iconSize: [38, 38],
  iconAnchor: [20, 32],
  shadowAnchor: [4, 62],
  popupAnchor: [-1, -15],
})

const stoppedCarIcon = leaflet.icon({
  iconUrl: '/src/assets/images/yellow-marker.png',
  iconSize: [38, 38],
  iconAnchor: [18, 38],
  shadowAnchor: [4, 62],
  popupAnchor: [1, -30],
})

const equipmentsHistory = computed(() => {
  return equipmentsStore.$state.positionHistory
})

function returnIconBaseOnState(state: string | undefined) {
  if (state) {
    switch (state) {
      case 'Parado':
        return stoppedCarIcon
      case 'Operando':
        return workingCarIcon
      default:
        return brokenCarIcon
    }
  }
}

function displayEquipmentHistory(equipmentId: string, stateId?: string) {
  const equipmentHistory = equipmentsHistory.value.find(equipment => equipment.equipmentId === equipmentId)

  if (equipmentHistory) {
    markers.forEach(marker => map.removeLayer(marker))
    markers = []

    polylines.forEach(polyline => map.removeLayer(polyline))
    polylines = []

    const latlngs: LatLngTuple[] = []

    for (let i = 0; i < equipmentHistory.positions.length; i++) {
      const equipmentState = returnEquipmentStateBasedOnDate(equipmentHistory.equipmentId, equipmentHistory.positions[i].date)
      const date = formatDate(equipmentHistory.positions[i].date)

      if (!stateId || (equipmentState?.id === stateId)) {
        const marker = leaflet
          .marker([equipmentHistory.positions[i].lat, equipmentHistory.positions[i].lon], { icon: returnIconBaseOnState(equipmentState?.name) })
          .addTo(map)
          .bindPopup(
            `
          Estado atual: <strong>${equipmentState?.name}</strong> <br>
          Data: <strong>${date}</strong> <br>
          Saved Marker at (<strong>${equipmentHistory.positions[i].lat.toFixed(2)},${equipmentHistory.positions[i].lon.toFixed(
  2,
)}</strong>)
          `,
          )
          .on('mouseover', () => {
            marker.openPopup()
          })
          .on('mouseout', () => {
            marker.closePopup()
          })

        markers.push(marker)
        latlngs.push([equipmentHistory.positions[i].lat, equipmentHistory.positions[i].lon])
      }
    }

    const polyline = leaflet.polyline(latlngs, { color: 'blue' }).addTo(map)
    polylines.push(polyline)
  }
  else {
    notify(`Nenhum equipamento encontrado com o ID: ${equipmentId} 😟`, 'error')
  }
}

function displayTheLastPositionOfAllEquipments() {
  markers.forEach(marker => map.removeLayer(marker))
  markers = []

  polylines.forEach(polyline => map.removeLayer(polyline))
  polylines = []

  for (let i = 0; i < equipmentsHistory.value.length; i++) {
    const equipmentState = returnEquipmentStateBasedOnDate(equipmentsHistory.value[i].equipmentId, equipmentsHistory.value[i].positions[0].date)
    const date = formatDate(equipmentsHistory.value[i].positions[0].date)

    const marker = leaflet
      .marker([equipmentsHistory.value[i].positions[0].lat, equipmentsHistory.value[i].positions[0].lon], { icon: returnIconBaseOnState(equipmentState?.name) })
      .addTo(map)
      .bindPopup(
        `
          Equipamento: <strong>${returnEquipmentBasedOnId(equipmentsHistory.value[i].equipmentId)}</strong> <br>
          Estado atual: <strong>${equipmentState?.name}</strong> <br>
          Data: <strong>${date}</strong> <br>
          Saved Marker at (<strong>${equipmentsHistory.value[i].positions[0].lat.toFixed(2)},${equipmentsHistory.value[i].positions[0].lon.toFixed(
  2,
)}</strong>)
        `,
      )
      .on('mouseover', () => {
        marker.openPopup()
      })
      .on('click', () => {
        emit('changeSelectedEquipment', equipmentsHistory.value[i].equipmentId)
        displayEquipmentHistory(equipmentsHistory.value[i].equipmentId)
      })
      .on('mouseout', () => {
        marker.closePopup()
      })

    markers.push(marker)
  }
}

onMounted(() => {
  map = leaflet
    .map('map')
    .setView([equipmentsHistory.value[0].positions[0].lat, equipmentsHistory.value[0].positions[0].lon], 13)

  leaflet
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map)

  displayTheLastPositionOfAllEquipments()
})

watch(
  () => props.equipmentFiltered,
  (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
      const status = props.statusFiltered ? props.statusFiltered : undefined
      displayEquipmentHistory(newValue, status)
    }
    else if (!newValue) {
      displayTheLastPositionOfAllEquipments()
    }
  },
)

watch(
  () => props.statusFiltered,
  (newValue, oldValue) => {
    if (newValue !== oldValue && props.equipmentFiltered) {
      displayEquipmentHistory(props.equipmentFiltered, newValue)
    }

    if (newValue !== oldValue && newValue && !props.equipmentFiltered) {
      notify('Por favor selecione um equipamento 😭', 'warning')
    }

    if (!newValue) {
      displayTheLastPositionOfAllEquipments()
    }
  },
)
</script>

<template>
  <div
    id="map"
    class="w-full h-full"
  />
</template>
