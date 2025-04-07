<template>
  <div>
    <EquipmentFilter @filter-change="handleFilterChange" />

    <div id="map" style="height: 700px; width: 960px;"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import EquipmentFilter from '../components/EquipmentFilter.vue';

import equipment from '../data/equipment.json';
import equipmentModel from '../data/equipmentModel.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';

export default {
  name: 'MapView',
  components: {
    EquipmentFilter
  },

  data() {
    return {
      selectedModelId: '',
      selectedStateId: '',
      map: null,
      markers: []
    };
  },

  mounted() {
    this.initMap();
    this.updateMarkers();
  },

  methods: {
    handleFilterChange({ modelId, stateId }) {
      this.selectedModelId = modelId;
      this.selectedStateId = stateId;
      this.updateMarkers();
    },

    initMap() {
      this.map = L.map('map').setView([-19.126536, -45.947756], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    },

    updateMarkers() {
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.markers = [];

      const filteredEquipments = equipment.filter((equip) => {
        const modelInfo = equipmentModel.find(m => m.id === equip.equipmentModelId);
        const modelMatches = !this.selectedModelId || modelInfo?.name === this.selectedModelId;

        const stateHistory = equipmentStateHistory.find(e => e.equipmentId === equip.id);
        const lastStateEntry = stateHistory?.states[stateHistory.states.length - 1];
        const lastStateId = lastStateEntry?.equipmentStateId;
        const stateMatches = !this.selectedStateId || lastStateId === this.selectedStateId;

        return modelMatches && stateMatches;
      });

      filteredEquipments.forEach((equipInfo) => {
        const equipPos = equipmentPositionHistory.find(e => e.equipmentId === equipInfo.id);
        if (!equipPos) return;

        const lastPosition = equipPos.positions[equipPos.positions.length - 1];
        if (!lastPosition) return;

        const stateHistory = equipmentStateHistory.find(e => e.equipmentId === equipInfo.id);
        const lastStateEntry = stateHistory?.states[stateHistory.states.length - 1];
        const lastState = equipmentState.find(s => s.id === lastStateEntry?.equipmentStateId);

        const popupContent = `
          <div>
            <strong>${equipInfo?.name || 'Equipamento'}</strong><br/>
            Estado atual: <span style="color:${lastState?.color || '#000'}">${lastState?.name || 'Desconhecido'}</span>
          </div>
        `;

        let historyHtml = '';
        if (stateHistory && stateHistory.states.length > 0) {
          historyHtml = '<strong>HISTÓRICO:</strong><ul style="max-height: 250px;overflow:auto;padding:8px;scrollbar-width:thin;scrollbar-color: #5f5f5f #0000001f;">';
          stateHistory.states.slice().reverse().forEach((entry) => {
            const state = equipmentState.find(s => s.id === entry.equipmentStateId);
            const rawDate = new Date(entry.date);
            const formattedDate = rawDate.toLocaleDateString('pt-BR');
            const formattedTime = rawDate.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
            const date = `${formattedDate} - ${formattedTime}`;
            historyHtml += `<li>📅 <b>${date}:</b> <span style="color:${state?.color || '#000'}">${state?.name || 'Desconhecido'}</span></li>`;
          });
          historyHtml += '</ul>';
        }

        const marker = L.circleMarker([lastPosition.lat, lastPosition.lon], {
          radius: 10,
          fillColor: lastState?.color || '#ccc',
          color: '#000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });

        marker
          .addTo(this.map)
          .bindTooltip(popupContent, {
            direction: 'top',
            offset: [0, -10],
            opacity: 0.9
          })
          .on('click', () => {
            marker.bindPopup(historyHtml).openPopup();
          });

        this.markers.push(marker);
      });
    }
  }
};
</script>
