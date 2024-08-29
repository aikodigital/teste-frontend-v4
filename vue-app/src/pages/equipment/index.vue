<script setup lang="ts">
import Header from "../home/header.vue";
import TableState from "./table-state.vue";
import Map from "../home/map.vue";
import { ref } from "vue";

const table_state = ref<InstanceType<typeof TableState>>();

</script>
<template>
<section class="w-full h-full bg-zinc-800">
    <Header/>
    <div class="flex flex-row ">
        <TableState ref="table_state"/>
        <Map ref="map" @state-date="table_state?.setFilterData"/>
    </div>
</section>
</template>
