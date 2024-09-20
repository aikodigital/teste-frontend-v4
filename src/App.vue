<template>
    <main class="content-area">
        <HeaderApp />
        <MapView />
        <StateHistory v-if="stateHistoryStore.showStateHistory" />
    </main>
</template>

<script setup lang="ts">
import HeaderApp from "./components/HeaderApp.vue";
import MapView from "./components/MapView.vue";
import StateHistory from "./components/StateHistory.vue";
import { useStateHistoryStore } from "@/stores/stateHistory.ts";

const stateHistoryStore = useStateHistoryStore();
</script>

<style scoped>
.content-area {
    display: flex;
    margin-top: 40px;
}
</style>
