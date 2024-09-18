import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEquipmentStore = defineStore('equipment', () => {

  const map = ref(); // Armazena a referência do mapa
  const equipmentData = ref([]); // Armazena os dados de equipamentos
  const equipmentPositionHistory = ref([]); // Histórico de posições
  const equipmentState = ref([]); // Estados dos equipamentos
  const equipmentStateHistory = ref([]); // Histórico de estados

  // Carregar dados dos equipamentos
  const setEquipmentData = (data:any) => {
    equipmentData.value = data;
  };

  // Carregar histórico de posições
  const setPositionHistory = (data:any) => {
    equipmentPositionHistory.value = data;
  };

  // Carregar estados dos equipamentos
  const setEquipmentState = (data:any) => {
    equipmentState.value = data;
  };

  // Carregar histórico de estados
  const setStateHistory = (data:any) => {
    equipmentStateHistory.value = data;
  };

  // Inicializar o mapa
  const initializeMap = async (mapContainer:HTMLElement | null) => {

    const { Map, TileLayer } = await import('leaflet');

    if (mapContainer) {
   
      map.value = new Map(mapContainer).setView([-19.126536, -45.947756], 7);
      new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value);
     
    }

  };


  return {
    map,
    equipmentData,
    equipmentPositionHistory,
    equipmentState,
    equipmentStateHistory,
    setEquipmentData,
    setPositionHistory,
    setEquipmentState,
    setStateHistory,
    initializeMap
  };
});
