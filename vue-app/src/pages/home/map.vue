<script setup lang="ts">
import L from "leaflet";
import { Map } from "leaflet";
import { onMounted, ref } from "vue";
import { formatDate, pickColor } from "@/common/utils/helpers";
import EquipmentWithLastPosition from "@/common/types/EquipmentWithLastPosition";
import router from "@/router";
import { listEquipmentsWithLastPosition } from "@/common/services/EquipmentService";
import { getEquipmentPositionHistory } from "@/common/services/PositionService";
import { twMerge } from "tailwind-merge";

const props = defineProps<{
  class?: string;
}>();

const map = ref({} as Map);
const emit = defineEmits(['stateDate']);
function detailEquipment(id: string) {
  router.push({ name: 'equipment', params: { id } });
}

function initializeMap(){
      map.value = L.map('map');
      map.value.setView([-19.126536, -45.947756], 10);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map.value as Map);
}

function setMarksHome(){
  const equipments = listEquipmentsWithLastPosition();
  equipments.forEach((equipment, index) => {
    const icon = L.divIcon({ className: `w-2 h-2 rounded-full ${pickColor(index)} hover:opacity-50` });
    const mark = L.marker([equipment.lastPosition!.lat, equipment.lastPosition!.lon], {
      alt: equipment.id,
      icon: icon
    });
    const state = equipment.lastState?.name;
    mark.addTo(map.value as Map)
    .bindTooltip(`${equipment.name} ${ state ? "(" + state + ")" : ''}
      - [Clique para mais informações]`);

    mark.addEventListener('click', () => {
      detailEquipment(equipment.id);
    });
  });
}

function setMarksEquipment(){
  const getColor = (index: number, length: number) => {
    if(index === 0) return 'bg-sky-500';
    if(index === length - 1) return 'bg-amber-500';
    return 'bg-teal-800';
  }
  const { id } = router.currentRoute.value.params
  const historyPosition = getEquipmentPositionHistory(id as string);
  const total = historyPosition?.positions.length || 0;
  
  historyPosition?.positions.forEach((position, index) => {
    const icon = L.divIcon({ className: `w-2 h-2 hover:opacity-50 rounded-full ${getColor(index, total )}` });
    const mark = L.marker([position!.lat, position!.lon], {
      alt: position.date,
      icon: icon
    });
    mark.bindTooltip(`Data: ${formatDate(position.date)} ${index === 0 ? '(início)' : index === total - 1 ? '(Fim)' : ''}`);
    mark.addTo(map.value as Map)
    mark.addEventListener('click', () => {
      emit("stateDate", position.date);
    });
    if(index === 0) map.value!.setView([position.lat, position.lon], 10)
  })
    var myLines = {
        "type": "LineString" as 'LineString' | 'LineString',
        "coordinates": historyPosition?.positions.map(position => [position!.lon, position!.lat])
    };

  var myStyle = {
      "color": "#ff7800",
      "weight": 1,
      "opacity": 0.65
  };

  const layer = L.geoJSON();
  layer.addData(myLines);
  L.geoJSON(myLines, {
      style: myStyle
  }).addTo(map.value as Map);

    
  }

function setView(equipment: EquipmentWithLastPosition){
  map.value!.setView([equipment.lastPosition!.lat, equipment.lastPosition!.lon], 15);
}

defineExpose({
  setView,
})

onMounted(() => {
  initializeMap();
  if(router.currentRoute.value.name === 'home') return setMarksHome();
  setMarksEquipment();
})
</script>
<template>
  <section :class="twMerge('w-full pr-8', props.class)">
    <h1 class="text-xl text-zinc-50 font-semibold mb-4">
      Histórico de Posições
  </h1>
    <div id="map" class="w-full h-full mr-8 rounded-md" />
  </section>
</template>