<template>
  <div id="map" style="height: 800px; width: 960px;"></div>
</template>

<script>
import L from 'leaflet';
import equipment from '../data/equipment.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';

export default {
  name: 'MapView',
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const map = L.map('map').setView([-19.126536, -45.947756], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      equipmentPositionHistory.forEach((equip) => {
        const positions = equip.positions;
        const lastPosition = positions[positions.length - 1];

        if (lastPosition) {
          const equipInfo = equipment.find(e => e.id === equip.equipmentId);
          const stateHistory = equipmentStateHistory.find(e => e.equipmentId === equip.equipmentId);

          let lastState = null;

          if (stateHistory && stateHistory.states.length > 0) {
            const lastStateEntry = stateHistory.states[stateHistory.states.length - 1];
            lastState = equipmentState.find(state => state.id === lastStateEntry.equipmentStateId);
          }

          let historyHtml = '';

          if (stateHistory && stateHistory.states.length > 0) {
            historyHtml = '<hr><strong>Histórico:</strong><ul>';
            stateHistory.states.forEach((entry) => {
              const state = equipmentState.find(s => s.id === entry.equipmentStateId);
              const date = new Date(entry.date).toLocaleString('pt-BR');
              historyHtml += `<li>${date}: <span style="color:${state?.color || '#000'}">${state?.name || 'Desconhecido'}</span></li>`;
            });
            historyHtml += '</ul>';
          }

          const popupContent = `
            <div>
              <strong>${equipInfo?.name || 'Equipamento'}</strong><br/>
              Estado atual: <span style="color:${lastState?.color || '#000'}">${lastState?.name || 'Desconhecido'}</span>
              ${historyHtml}
            </div>
          `;

          L.circleMarker([lastPosition.lat, lastPosition.lon], {
            radius: 10,
            fillColor: lastState?.color || '#ccc',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          })
            .addTo(map)
            .bindPopup(popupContent);
        }
      });
    }
  }
};
</script>
