<template>
    <main class="content-area">
        <HeaderApp @updateSearch="handleSearchUpdate" />
        <ChecklistInput @updateFilter="handleFilterUpdate" />
        <MapView :search="searchInput" :filter="filterInput" />
        <StateHistory v-if="stateHistoryStore.showStateHistory" />
    </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeaderApp from "./components/HeaderApp.vue";
import ChecklistInput from "./components/ChecklistInput.vue";
import MapView from "./components/MapView.vue";
import StateHistory from "./components/StateHistory.vue";
import { useStateHistoryStore } from "@/stores/stateHistory";

const stateHistoryStore = useStateHistoryStore();
const searchInput = ref<string[]>([]);
const filterInput = ref<string[]>([]);

const handleSearchUpdate = (input: string[]) => {
    searchInput.value = input;
};

const handleFilterUpdate = (filter: string[]) => {
    filterInput.value = filter;
};
</script>

<style scoped>
.content-area {
    display: flex;
    margin-top: 40px;
}
</style>
