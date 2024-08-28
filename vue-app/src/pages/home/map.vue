<script setup lang="ts">
import L from "leaflet";
import EquipmentService from "@/common/services/EquipmentService";
import { Map } from "leaflet";
import { onMounted, ref } from "vue";
import { pickColor } from "@/common/utils/helpers";
import EquipmentWithLastPosition from "@/common/types/EquipmentWithLastPosition";
import router from "@/router";

const map = ref({} as Map);

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

function setMarks(){
  const equipments = EquipmentService.listEquipmentsWithLastPosition();
  equipments.forEach((equipment, index) => {
    const icon = L.divIcon({ className: `w-2 h-2 rounded-full ${pickColor(index)}` });
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

function setView(equipment: EquipmentWithLastPosition){
  map.value!.setView([equipment.lastPosition!.lat, equipment.lastPosition!.lon], 15);
}

defineExpose({
  setView,
})

onMounted(() => {
  initializeMap();
  setMarks();
})
</script>
<template>
  <section class="w-full pr-8 ">
    <div id="map" class="w-full h-full mr-8 rounded-md" />
  </section>
</template>