<script setup lang="ts">
import { ref } from "vue";
import Header from "./header.vue";
import Map from "./map.vue";
import Table from "./table.vue";
import EquipmentService from "@/common/services/EquipmentService";
import EquipmentWithLastPosition from "@/common/types/EquipmentWithLastPosition";


const map = ref<InstanceType<typeof Map>>();

function navigateMap(equipment: EquipmentWithLastPosition){
  map.value!.setView(equipment);
}
</script>
<template>
    <section class="w-full h-full bg-zinc-800">
      <Header/>
      <div class="flex flex-row">
        <Table :equipments="EquipmentService.listEquipmentsWithLastPosition()"
          @navigate="navigateMap"  
        />
        <Map ref="map"/>
      </div>
    </section>
  </template>
  