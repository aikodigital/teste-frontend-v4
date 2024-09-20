<template>
    <main class="content-area">
        <MapView />
        <StateHistory v-if="stateHistoryStore.showStateHistory" />
    </main>
</template>

<script setup lang="ts">
import MapView from "./components/MapView.vue";
import StateHistory from "./components/StateHistory.vue";
import { useStateHistoryStore } from "@/stores/stateHistory.ts";

const stateHistoryStore = useStateHistoryStore();
</script>

<style scoped>
.content-area {
    display: flex;
}
</style>
