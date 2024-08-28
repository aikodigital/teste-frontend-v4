<template>
    <div id="map" style="height: 400px"></div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, PropType } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  // Define uma interface para a posição do equipamento
  interface EquipmentPosition {
    lat: number;
    lon: number;
    equipmentId: string; // Adicione qualquer outra propriedade que você estiver usando
  }
  
  export default defineComponent({
    name: 'EquipmentMap',
    props: {
      equipmentPositions: {
        type: Array as PropType<EquipmentPosition[]>,
        default: () => []
      }
    },
    setup(props) {
      onMounted(() => {
        const map = L.map('map').setView([0, 0], 2);
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
  
        // Adicione uma verificação para garantir que equipmentPositions não é vazio
        if (props.equipmentPositions && props.equipmentPositions.length) {
          props.equipmentPositions.forEach((position: EquipmentPosition) => {
            L.marker([position.lat, position.lon])
              .addTo(map)
              .bindPopup(`Equipment ID: ${position.equipmentId}`);
          });
        }
      });
    },
  });
  </script>
  
  <style scoped>
  #map {
    width: 100%;
    height: 400px;
  }
  </style>
  