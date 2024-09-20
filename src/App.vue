<template>
    <main class="content-area">
        <HeaderApp @updateSearch="setSearchInput" />
        <MapView :search="searchInput" />
        <StateHistory v-if="stateHistoryStore.showStateHistory" />
    </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeaderApp from "./components/HeaderApp.vue";
import MapView from "./components/MapView.vue";
import StateHistory from "./components/StateHistory.vue";
import { useStateHistoryStore } from "@/stores/stateHistory";

const stateHistoryStore = useStateHistoryStore();
const searchInput = ref<string>("");

const setSearchInput = (input: string) => {
    searchInput.value = input;
}
</script>

<style scoped>
.content-area {
    display: flex;
    margin-top: 40px;
}
</style>
