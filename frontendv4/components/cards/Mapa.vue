<script setup>
import { ref, onMounted } from 'vue';
import equipmentData from '~/data/equipment.json';
import equipmentStateHistory from '~/data/equipmentStateHistory.json';
import equipmentPositionHistory from '~/data/equipmentPositionHistory.json';
import equipmentState from '~/data/equipmentState.json';
import {useEquipmentStore} from '~/stores/equipmentStore';
import {useHistoricoStore} from '~/stores/stateHistoricoStore';

const useHistStore = useHistoricoStore();

const mapContainer = ref(null);
const equipmentStore = useEquipmentStore();

onMounted(async () => {
  //inicializa o mapa
  await equipmentStore.initializeMap(mapContainer.value);

  // Armazenar dados na store
  equipmentStore.setEquipmentData(equipmentData);
  equipmentStore.setPositionHistory(equipmentPositionHistory);
  equipmentStore.setEquipmentState(equipmentState);
  equipmentStore.setStateHistory(equipmentStateHistory);

  // Adicionar marcadores no mapa
  equipmentData.forEach(equip => {
    const equipmentHistory = equipmentPositionHistory.find(ep => ep.equipmentId === equip.id);
    const equipmentStateHist = equipmentStateHistory.find(es => es.equipmentId === equip.id);

    if (equipmentHistory) {

      const ultimaPosicao = equipmentHistory.positions[equipmentHistory.positions.length - 1];
      const ultimoEstado = equipmentStateHist?.states[equipmentStateHist.states.length - 1];
      const stateDetails = equipmentState.find(state => state.id === ultimoEstado?.equipmentStateId);
      const markerColor = stateDetails?.color || '#000000';

      //cria o icone e a cor dinamicamente
      const iconHtml = `<div class="w-8 h-8 rounded-full flex items-center justify-center" style="background-color: ${markerColor}">
                          <svg class="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
                          </svg>
                        </div>`;

      const iconMarker = L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [30, 30],
        popupAnchor: [0, -15],
      });

      const marker = new L.Marker([ultimaPosicao.lat, ultimaPosicao.lon], { icon: iconMarker })
        .addTo(equipmentStore.map)
        //abre o popup com o nome e o estado do equipamento
        .bindPopup(`<b>${equip.name}</b> Estado: ${stateDetails?.name}`);

        //evento ao clicar no marcador
        marker.on('click', () => {

          useHistStore.handleMarkerClick(equipmentStateHist, equipmentState,equipmentHistory,equip.name);
     

})


    }
  });
});
</script>

<template>
  <div>
    <div class="flex flex-col mt-40">
      <div class="bg-blue-700 w-24 h-8 flex items-center justify-center">
        <p class="font-HankenGrotesk text-sm text-white">Mapa</p>
      </div>
      <div class="flex bg-[#FFF4CD] items-center justify-center p-8 w-96 max-w-4xl mx-auto">
          <!-- Container onde o mapa será renderizado -->
        <div class="overflow-hidden w-full h-64 max-w-full max-h-64 " ref="mapContainer">
        </div>
      </div>
  </div>
  </div> 

</template>

<style>

</style>
