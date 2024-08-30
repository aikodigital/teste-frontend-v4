<script setup lang="ts">
import Header from "../home/header.vue";
import TableState from "./table-state.vue";
import Map from "../home/map.vue";
import { ref } from "vue";
import TableProduction from "./table-production.vue";
const table_state = ref<InstanceType<typeof TableState>>();

</script>
<template>
<section class="w-full h-full bg-red-400">
    <Header/>
    <div class="flex flex-row ">
        <TableState ref="table_state"/>
        <Map ref="map" @state-date="table_state?.setFilterData" class="!w-1/2 pr-0 h-[550px]"/>
        <TableProduction />
    </div>
</section>
</template>
<style scoped>
section {
    background-image: url("@/assets/img/background.png");
}
</style>
