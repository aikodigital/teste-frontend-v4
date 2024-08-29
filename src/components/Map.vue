<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import leaflet from 'leaflet';
import { computed, onMounted, watch } from "vue";
import { useEquipmentsStore } from "~/stores/equipments";
import { formatDate, returnEquipmentBasedOnId } from "~/utils/formatValue";
import { notify } from "~/utils/notify";

interface Props {
  equipmentFiltered?: string
}

let map: leaflet.Map
let markers: leaflet.Marker[] = []
let userGeoMarker: leaflet.Marker
const equipmentsStore = useEquipmentsStore()
const props = defineProps<Props>()

const equipmentsHistory = computed(() => {
  return equipmentsStore.$state.positionHistory
})

function displayEquipmentHistory(equipmentId: string) {
  const equipmentHistory = equipmentsHistory.value.find(equipment => equipment.equipmentId === equipmentId);

  if (equipmentHistory) {
    markers.forEach(marker => map.removeLayer(marker))
    markers = []

    for (let i = 0; i < equipmentHistory.positions.length; i++) {
      const marker = leaflet
        .marker([equipmentHistory.positions[i].lat, equipmentHistory.positions[i].lon])
        .addTo(map)
        .bindPopup(
          `
            Data: <strong>${formatDate(equipmentHistory.positions[i].date)}</strong> <br>
            Saved Marker at (<strong>${equipmentHistory.positions[i].lat.toFixed(2)},${equipmentHistory.positions[i].lon.toFixed(
              2
            )}</strong>)
          `
        );

      markers.push(marker)
    }
  } else {
    notify(`Nenhum equipamento encontrado com o ID: ${equipmentId}`, 'error');
  }
}

function displayTheLastPositionOfAllEquipments() {
  markers.forEach(marker => map.removeLayer(marker))
  markers = []

  for (let i = 0; i < equipmentsHistory.value.length; i++) {
    const marker = leaflet
      .marker([equipmentsHistory.value[i].positions[0].lat, equipmentsHistory.value[i].positions[0].lon])
      .addTo(map)
      .bindPopup(
        `
          Equipamento: <strong>${returnEquipmentBasedOnId(equipmentsHistory.value[i].equipmentId)}</strong> <br>
          Data: <strong>${formatDate(equipmentsHistory.value[i].positions[0].date)}</strong> <br>
          Saved Marker at (<strong>${equipmentsHistory.value[i].positions[0].lat.toFixed(2)},${equipmentsHistory.value[i].positions[0].lon.toFixed(
            2
          )}</strong>)
        `
      );

    markers.push(marker)
  }
}

onMounted(() => {
  map = leaflet
    .map("map")
    .setView([equipmentsHistory.value[0].positions[0].lat, equipmentsHistory.value[0].positions[0].lon], 13)

  leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  displayTheLastPositionOfAllEquipments()
})

watch(
  () => props.equipmentFiltered,
  (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
      displayEquipmentHistory(newValue)
    }
  }
)
</script>

<template>
  <div
    id="map"
    class="w-full h-full"
  />
</template>
