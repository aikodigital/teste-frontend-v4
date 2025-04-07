<template>
  <div id="map" class="rounded-lg border-2 border-gray-200 h-[calc(100vh-12rem)] w-full"></div>
</template>

<script setup>
import { onMounted, watch, onUnmounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEquipmentStore } from '../stores/equipment.js'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

const emit = defineEmits(['marker-click', 'marker-hover', 'equipment-selected'])
const equipmentStore = useEquipmentStore()

let map = null
let markersLayer = null

const calculateDynamicCenter = () => {
  try {
    const validPositions = equipmentStore.getFilteredEquipments
      .filter(eq => eq.lat && eq.lon && !isNaN(eq.lat) && !isNaN(eq.lon))
      .map(eq => [parseFloat(eq.lat), parseFloat(eq.lon)])

    if (validPositions.length === 0) {
      console.warn('No valid positions, using default center')
      return [[-15.788, -47.879]] // Centro padrão
    }

    const bounds = L.latLngBounds(validPositions)
    return bounds.getCenter()
  } catch (error) {
    console.error('Error calculating center:', error)
    return [-15.788, -47.879]
  }
}

const centerMap = () => {
  if (!map) return
  const center = calculateDynamicCenter()
  map.flyTo(center, map.getZoom(), { animate: true, duration: 1 })
}

const initMap = () => {
  equipmentStore.loadInitialData();

  map = L.map('map').setView([-15.788, -47.879], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

}
centerMap()
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}" class="w-6 h-6 rounded-full border-2 border-white shadow-lg"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  })
}

const cleanupMap = () => {
  if (map) {
    map.remove()
    map = null
  }
}
onUnmounted(() => {
  cleanupMap()
})

const plotEquipment = () => {
  if (!map) {
    console.error('Map not initialized')
    return
  }
  try {

    if (markersLayer) {
      markersLayer.clearLayers()
    } else {
      markersLayer = L.layerGroup().addTo(map)
    }

    equipmentStore.getFilteredEquipments.forEach(equipment => {
      //console.log(equipment)
      const currentState = equipmentStore.getCurrentState(equipment.id)
      const equipDetails = equipmentStore.getEquipmentDetails(equipment.id)
      //console.log(currentState)

      if (!equipment.lat || !equipment.lon ||
        isNaN(equipment.lat) || isNaN(equipment.lon)) {
        console.error('Invalid coordinates:', equipment.id)
        return
      }

      const lat = parseFloat(equipment.lat)
      const lon = parseFloat(equipment.lon)

      const marker = L.marker([lat, lon], {
        icon: createCustomIcon(currentState?.state.color || '#666')
      })

      marker.on('click', () => {
        handleMarkerClick(equipment);
      });

      // Evento de mouseover para exibir o popup
      marker.on('mouseover', () => {
        marker.bindPopup(`
        <b>Equipamento:</b> ${equipDetails.name}<br>
        <b>Último estado:</b><br> ${currentState.state.name}<br>
        <b>Última atualização:</b><br> ${new Date(currentState.date).toLocaleString('PT-BR')}<br>
      `).openPopup();
      });

      marker.addTo(markersLayer);
    })
  } catch (error) {
    console.error('Error plotting equipment:', error)
  }
}

const handleMarkerClick = (equipment) => {
  emit('equipment-selected', equipment)
}
onMounted(() => {
  initMap()

  watch(
    () => equipmentStore.getFilteredEquipments,
    () => {
      plotEquipment()
      centerMap()
    },
    { deep: true }
  )

})
</script>

<style>
.custom-marker {
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
}

.leaflet-popup-content {
  font-family: 'Arial', sans-serif;
  font-size: 14px;
}
</style>