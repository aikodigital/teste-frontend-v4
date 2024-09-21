<template>
    <div class="map-container">
        <div class="map-area">
            <l-map v-if="searchedLatestPositions.length > 0" ref="map" v-model:zoom="zoom"
                :center="[searchedLatestPositions[0].lat, searchedLatestPositions[0].lon]" :use-global-leaflet="false">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                    name="OpenStreetMap"></l-tile-layer>

                <l-marker v-for="(position, index) in searchedLatestPositions" :key="index"
                    :lat-lng="[position.lat, position.lon]" :icon="getCustomIcon(position.color)" @mouseover="showPopup"
                    @mouseout="showPopup" @click="openStateHistory(position)">
                    <l-popup ref="popups" v-if="position">
                        <PopUp :position="position" />
                    </l-popup>
                </l-marker>
            </l-map>
            <div v-else class="no-data-box">
                <div class="no-data">
                    <h2>Nenhum equipamento encontrado.</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import * as L from "leaflet";
import PopUp from "./PopUp.vue";
import { useApiStore } from "@/stores/api";
import { usePositionHistoryStore } from "@/stores/positionHistory";
import { useStateHistoryStore } from "@/stores/stateHistory";
import { type LatestEquipmentInfo } from "@/types/types";

import greenIconUrl from "@/assets/marker-icon-green.png";
import redIconUrl from "@/assets/marker-icon-red.png";
import yellowIconUrl from "@/assets/marker-icon-yellow.png";
import blueIconUrl from "@/assets/marker-icon-blue.png";

const apiStore = useApiStore();
const positionHistoryStore = usePositionHistoryStore();
const stateHistoryStore = useStateHistoryStore();

const zoom = ref<number>(10);
const lastEquipmentId = ref<string | null>(null);

const props = defineProps<{
    search: string[];
    filter: string[];
}>();

const searchedLatestPositions = computed(() => {
    if (props.search.length > 0 || props.filter.length > 0) {
        return latestPositions.value.filter((position) => {
            const searchTerms = props.filter.length > 0 ? props.filter.map(term => term.toLowerCase()) : props.search.map(term => term.toLowerCase());

            return searchTerms.some(searchTerm =>
                position.equipmentId.toLowerCase().includes(searchTerm) ||
                position.equipmentName.toLowerCase().includes(searchTerm) ||
                position.equipmentModelId.toLowerCase().includes(searchTerm) ||
                position.equipmentModelName.toLowerCase().includes(searchTerm) ||
                position.currentStateName.toLowerCase().includes(searchTerm) ||
                position.date.toLowerCase().includes(searchTerm)
            );
        });
    } else {
        return latestPositions.value;
    }
});

const latestPositions = computed(() => {
    if (positionHistoryStore.latestEquipmentInfo.length > 0) {
        return positionHistoryStore.latestEquipmentInfo;
    } else {
        return [];
    }
});

const showPopup = (e: L.LeafletMouseEvent) => {
    e.target.togglePopup();
};

const openStateHistory = (equipment: LatestEquipmentInfo) => {
    if (lastEquipmentId.value === equipment.equipmentId || lastEquipmentId.value === null) {
        stateHistoryStore.setStateHistoryView(!stateHistoryStore.showStateHistory);
    }
    lastEquipmentId.value = equipment.equipmentId;

    stateHistoryStore.getStateHistory(equipment.equipmentId);
};

const getCustomIcon = (color: string) => {
    let iconUrl = getIconUrlByColor(color);
    return L.icon({
        iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
    });
};

const getIconUrlByColor = (color: string) => {
    switch (color) {
        case "#e74c3c":
            return redIconUrl;
        case "#f1c40f":
            return yellowIconUrl;
        case "#2ecc71":
            return greenIconUrl;
        default:
            return blueIconUrl;
    }
};

onMounted(async () => {
    await apiStore.fetchAllData();
    positionHistoryStore.getLatestPositionsHistory();
});
</script>

<style scoped>
.map-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    background-color: var(--light-gray-1);
    border-radius: 30px;
    height: 80vh;
    width: 60vw;
    box-shadow: 0 8px 6px -6px rgb(0, 0, 0);
}

.map-area {
    height: 100%;
    width: 800px;
}

h2 {
    font-weight: bold;
    color: white;
}

.no-data-box {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
}

.no-data {
    width: 80%;
    height: 15%;
    font-size: 18px;
    background-color: rgb(137, 26, 26);
    border-radius: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

}
</style>
