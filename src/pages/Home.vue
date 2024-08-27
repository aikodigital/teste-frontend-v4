<template>
  <div>
    <Filters :models="equipmentModelData" :states="equipmentStateData" @filter="applyFilter" />
    <div id="map"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Filters from '../components/FiltersUse.vue';
import equipmentData from '../data/equipment.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import equipmentModelData from '../data/equipmentModel.json';
import iconImage from '../assets/aiko.png';

export default {
  name: 'HomePage',
  components: { Filters },
  setup() {
    const map = ref(null);
    const markers = ref([]);
    const filteredEquipment = ref(equipmentData);

    onMounted(() => {
      map.value = L.map('map').setView([-19.126536, -45.947756], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(map.value);

      updateMarkers(filteredEquipment.value);
    });

    const updateMarkers = (equipmentList) => {
      markers.value.forEach(marker => map.value.removeLayer(marker));
      markers.value = [];

      equipmentList.forEach((equipment) => {
        const lastPosition = getLastPosition(equipment.id);
        const lastState = getLastState(equipment.id);
        const equipmentModel = getEquipmentModel(equipment.equipmentModelId);

        if (lastPosition && lastState && equipmentModel) {
          const hourlyEarnings = getHourlyEarnings(equipmentModel, lastState.id);
          const marker = L.marker([lastPosition.lat, lastPosition.lon], { icon: getEquipmentIcon(equipmentModel.id) })
            .addTo(map.value)
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
          markers.value.push(marker);
        }
      });
    };

    const applyFilter = (filter) => {
      filteredEquipment.value = equipmentData.filter(equipment => {
        const matchesModel = filter.model ? equipment.equipmentModelId === filter.model : true;
        const lastState = getLastState(equipment.id);
        const matchesState = filter.state ? lastState.id === filter.state : true;
        const matchesQuery = filter.query ? equipment.name.toLowerCase().includes(filter.query.toLowerCase()) : true;
        return matchesModel && matchesState && matchesQuery;
      });

      updateMarkers(filteredEquipment.value);
    };

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

    const getEquipmentIcon = (equipmentModelId) => {
      const iconOptions = {
        Caminhão: 'caminhao-icon.png',
        Harvester: 'harvester-icon.png',
        Garra: 'garra-icon.png',
      };
      return L.icon({
        iconUrl: iconOptions[equipmentModelId] || iconImage,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });
    };

    return {
      equipmentStateData,
      equipmentModelData,
      applyFilter,
    };
  },
};
</script>

<style scoped>
#map {
  height: 80vh;
  width: 100vw;
  position: relative;
  margin: 10px 0;
}

.popup-content {
  padding: 5px;
}
</style>
