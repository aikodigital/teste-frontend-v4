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

          const popupContent = `
            <div>
              <strong>${equipInfo?.name || 'Equipamento'}</strong><br/>
              Estado atual: <span style="color:${lastState?.color || '#000'}">${lastState?.name || 'Desconhecido'}</span>
            </div>
          `;

          const marker = L.circleMarker([lastPosition.lat, lastPosition.lon], {
            radius: 10,
            fillColor: lastState?.color || '#ccc',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          })
          marker.addTo(map)
            .bindTooltip(
              popupContent,
              {
                direction: 'top',
                offset: [0, -10],
                opacity: 0.9
              }
            )
            .on('click', () => {
              marker.bindPopup(historyHtml).openPopup();
            })   
        }
      });
    }
  }
};
</script>
