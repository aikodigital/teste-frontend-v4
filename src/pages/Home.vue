<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import equipmentData from '../data/equipment.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import equipmentModelData from '../data/equipmentModel.json'; // Importando os modelos de equipamentos
import iconImage from '../assets/aiko.png';

export default {
  name: 'HomePage',
  setup() {
    onMounted(() => {
      const map = L.map('map').setView([-19.126536, -45.947756], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      const getLastState = (equipmentId) => {
        const history = equipmentStateHistoryData.find((item) => item.equipmentId === equipmentId);
        if (history) {
          const lastStateEntry = history.states[history.states.length - 1];
          return equipmentStateData.find((state) => state.id === lastStateEntry.equipmentStateId);
        }
        return null;
      };

      const getLastPosition = (equipmentId) => {
        const history = equipmentPositionHistoryData.find((item) => item.equipmentId === equipmentId);
        if (history) {
          return history.positions[history.positions.length - 1];
        }
        return null;
      };

      const getEquipmentModel = (equipmentModelId) => {
        return equipmentModelData.find((model) => model.id === equipmentModelId);
      };

      const getHourlyEarnings = (equipmentModel, equipmentStateId) => {
        const earning = equipmentModel.hourlyEarnings.find(
          (earning) => earning.equipmentStateId === equipmentStateId
        );
        return earning ? earning.value : null;
      };

      const equipmentIcon = L.icon({
        iconUrl: iconImage,
        iconSize: [32, 32], 
        iconAnchor: [16, 32], 
        popupAnchor: [0, -32], 
      });

      equipmentData.forEach((equipment) => {
        const lastPosition = getLastPosition(equipment.id);
        const lastState = getLastState(equipment.id);
        const equipmentModel = getEquipmentModel(equipment.equipmentModelId);

        if (lastPosition && lastState && equipmentModel) {
          const hourlyEarnings = getHourlyEarnings(equipmentModel, lastState.id);
          const marker = L.marker([lastPosition.lat, lastPosition.lon], { icon: equipmentIcon })
            .addTo(map)
            .bindPopup(`<div class="popup-content"><b>${equipment.name}</b><br>Estado: ${lastState.name}<br>Modelo: ${equipmentModel.name}<br>Valor por hora: R$ ${hourlyEarnings}</div>`)
            .on('click', () => {
              const history = equipmentStateHistoryData.find((item) => item.equipmentId === equipment.id);
              if (history) {
                let historyHtml = `<h3>Histórico de estados de ${equipment.name}</h3><ul>`;
                history.states.forEach((stateEntry) => {
                  const state = equipmentStateData.find((s) => s.id === stateEntry.equipmentStateId);
                  const earnings = getHourlyEarnings(equipmentModel, state.id);
                  historyHtml += `<li>${new Date(stateEntry.date).toLocaleString()}: ${state.name} (R$ ${earnings}/h)</li>`;
                });
                historyHtml += '</ul>';
                marker.bindPopup(`<div class="popup-content">${historyHtml}</div>`, {
                  maxWidth: 300, 
                  maxHeight: 500, 
                }).openPopup();
              }
            });
        }
      });

      map.on('popupopen', function (e) {
        const popUpContent = e.popup.getElement().querySelector('.popup-content');
        popUpContent.style.maxHeight = '500px';
        popUpContent.style.maxWidth = '300px';
        popUpContent.style.overflowY = 'auto';
      });
    });
  },
};
</script>

<style scoped>
#map {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}

.popup-content {
  padding: 5px;
}
</style>
