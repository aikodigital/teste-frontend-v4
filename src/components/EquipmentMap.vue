<template>
  <div ref="mapContainer" class="h-100 w-100"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineExpose } from 'vue';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Equipment } from '@/models';

const props = defineProps({
  equipmentList: {
    type: Array as () => Equipment[],
    required: true
  }
});

const emit = defineEmits(['marker-click']);

const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null;
let markers: L.Marker[] = [];

function getIcon(stateColor: string) {
  return L.divIcon({
    className: 'equipment-marker',
    html: `
      <div style="
        background-color: ${stateColor};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
      ">
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
}

onMounted(() => {
  if (mapContainer.value) {
    map = L.map(mapContainer.value).setView([-19.126536, -45.947756], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    updateMarkers();
  }
});

function updateMarkers() {
  markers.forEach(marker => {
    if (map) map.removeLayer(marker);
  });
  markers = [];
  
  if (!map) return;
  
  props.equipmentList.forEach(equipment => {
    if (!equipment.latestPosition) return;
    
    const { lat, lon } = equipment.latestPosition;
    const marker = L.marker([lat, lon], {
      icon: getIcon(equipment.latestState?.color || '#999')
    });
    
    marker.bindPopup(`
      <div class="equipment-popup">
        <h6>${equipment.name}</h6>
        <p><strong>Modelo:</strong> ${equipment.model?.name || 'Unknown'}</p>
        <p><strong>Status:</strong> 
          <span class="badge" style="background-color: ${equipment.latestState?.color || '#999'}">
            ${equipment.latestState?.name || 'Unknown'}
          </span>
        </p>
        <p><strong>Última atualização:</strong> ${new Date(equipment.latestPosition.date).toLocaleString()}</p>
        <button class="btn btn-sm btn-success w-100 mt-2" data-action="details">
          Ver detalhes
        </button>
      </div>
    `);
    
    marker.on('popupopen', () => {
      const popup = marker.getPopup();
      if (popup) {
        const element = popup.getElement();
        if (element) {
          element.querySelector('[data-action="details"]')?.addEventListener('click', () => {
            emit('marker-click', equipment);
          });
        }
      }
    });
    
    marker.addTo(map!);
    markers.push(marker);
  });
  
  if (markers.length > 0) {
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
  }
}

function centerMap() {
  if (map && markers.length > 0) {
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
  } else if (map) {
    map.setView([-19.126536, -45.947756], 13);
  }
}

watch(() => props.equipmentList, updateMarkers, { deep: true });

defineExpose({
  centerMap
});
</script>