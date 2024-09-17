<template>
  <div>
    <l-map
        :zoom="zoom"
        :center="center"
        style="height: 25rem; width: 100%; "
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker
          v-for="(equipment, index) in equipmentsPositions"
          :key="index"
          :lat-lng="[equipment.lat, equipment.lon]"
          :icon="icon"
          @click="onMarkerClick(equipment)"
          @mouseover="onMarkerMouseOver($event, equipment)"
        >
          <!-- <l-popup>Equipamento: {{ equipment.name }}</l-popup> -->
        </l-marker>
      </l-map>
  </div>  
    
  </template>
  
  <script>
  import { LMap, LTileLayer, LMarker,  } from 'vue2-leaflet';
  import L from 'leaflet';
import equipmentObjectService from '@/services/equipmentObjectService';
  export default {
    name: 'MapLeaflat',
    components: {
      LMap,
      LTileLayer,
      LMarker,
      // LPopup
    },
    props: {
        equipmentsPositions: {
        type: Array,
        default: () => []
    },

  },
    data() {
      return {
        zoom: 10,
        center: [-19.126536, -45.947756], // Latitude e Longitude iniciais
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // URL do mapa base
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        icon: L.icon({
        // iconUrl: '/images/marker-icon.png',
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        // shadowUrl: '/images/marker-shadow.png',
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        shadowSize: [41, 41]
      }),
      selectedEquipment: null,
      }
    },
    methods: {
      onMarkerClick(equipment) {
        this.$emit('equipment-clicked', equipment)
      },
      
      async onMarkerMouseOver(event, equipment) {
        const equipmentObject = await equipmentObjectService.createdEquipment(equipment.equipmentId)
        const stateName = await equipmentObjectService.getCurrentState(equipment.equipmentId)
        const marker = event.target;
        const tooltipContent = `
          <div>
            <strong>Código:</strong> ${equipmentObject.name}<br/>
            <strong> ${equipmentObject.nameModel}</strong><br/>
            <strong>Status:</strong> ${stateName}
          </div>`
      marker.bindTooltip(tooltipContent, { permanent: false, direction: 'top' }).openTooltip();
      },
      onMarkerMouseOut(event) {
      const marker = event.target;
      marker.closeTooltip();
    },
    },
    mounted() {
      this.$nextTick(() => {
      this.equipmentsPositions.forEach((equipment) => {
        const marker = L.marker([equipment.lat, equipment.lon], { icon: this.icon })
          .addTo(this.$refs.map.leafletObject)
          .bindTooltip(`Informação: ${equipment.name}`, { permanent: false, direction: 'top' });


        marker.on('click', () => {
          this.onMarkerClick(equipment)
        })
      })
    })
}
  }
  </script>
  
  <style scoped>

  .leaflet-container {
    height: 500px;
    width: 100%;
    z-index: 0;
  }
  </style>