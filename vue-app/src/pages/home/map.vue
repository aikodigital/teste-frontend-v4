<template>
    <section>
      <div id="map" class="h-[600px] w-[600px]" />
    </section>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  import L from "leaflet";
  import EquipmentService from "@/common/services/index";
  import { Map } from "leaflet";
  export default defineComponent({
    data() {
      return {
        map: {} as Map,
      };
    },
    methods: {
      initializeMap(){
        const map = L.map('map');
        map.setView([-19.126536, -45.947756], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        this.map = map;
      },
      setMarks(){
        const equipments = EquipmentService.listEquipmentsWithLastPosition();
        equipments.forEach((equipment, index) => {
          const icon = L.divIcon({ className: `w-2 h-2 rounded-full custom-bg-${index}` });
          const mark = L.marker([equipment.lastPosition.lat!, equipment.lastPosition.lon!], {
            alt: equipment.id,
            icon: icon
          });
          const state = equipment.lastPosition.state?.name;
          mark.addTo(this.map as Map)
          .bindTooltip(`Equipamento: ${equipment.name} ${ state ? "(" + state + ")" : ''}
            - [Clique para mais informações]`);
        });
      },
    },
    mounted(){
      this.initializeMap();
      this.setMarks();
    },
  });
</script>
<style>
  .custom-bg-0 {
    background-color: #f43f5e; /* Tailwind rose-600 */
  }
  .custom-bg-1 {
    background-color: #fb923c; /* Tailwind orange-400 */
  }
  .custom-bg-2 {
    background-color: #facc15; /* Tailwind yellow-300 */
  }
  .custom-bg-3 {
    background-color: #84cc16; /* Tailwind lime-500 */
  }
  .custom-bg-4 {
    background-color: #14b8a6; /* Tailwind teal-500 */
  }
  .custom-bg-5 {
    background-color: #1d4ed8; /* Tailwind blue-700 */
  }
  .custom-bg-6 {
    background-color: #6d28d9; /* Tailwind violet-700 */
  }
  .custom-bg-7 {
    background-color: #dc2626; /* Tailwind red-600 */
  }
  .custom-bg-8 {
    background-color: #312e81; /* Tailwind indigo-900 */
  }
</style>