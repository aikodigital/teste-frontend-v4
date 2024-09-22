<template>
    <div class="map-container">
        <div class="map-area">
            <l-map v-if="searchedLatestPositions.length > 0" ref="map" v-model:zoom="zoom"
                :center="[searchedLatestPositions[0].lat, searchedLatestPositions[0].lon]" :use-global-leaflet="false">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                    name="OpenStreetMap"></l-tile-layer>

                <l-marker v-for="(position, index) in searchedLatestPositions" :key="index"
                    :lat-lng="[position.lat, position.lon]"
                    :icon="getCustomIcon(position.color, position.equipmentModelName)" @mouseover="showPopup"
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
        <div v-if="positionHistoryStore.equipmentPositionHistoryInfo.length > 0 && !stateHistoryStore.showStateHistory"
            class="clean-btn"
            @click="clean">
            <img style="height: 80%;" src="@/assets/clean.png" alt="Clean icon">
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

import blueIconUrl from "@/assets/marker-icon-blue.png";

import greenClaw from "@/assets/marker-icon-green-g.png";
import redClaw from "@/assets/marker-icon-red-g.png";
import yellowClaw from "@/assets/marker-icon-yellow-g.png";

import greenTruck from "@/assets/marker-icon-green-c.png";
import redTruck from "@/assets/marker-icon-red-c.png";
import yellowTruck from "@/assets/marker-icon-yellow-c.png";

import greenHarvester from "@/assets/marker-icon-green-h.png";
import yellowHarvester from "@/assets/marker-icon-red-h.png";
import redHarvester from "@/assets/marker-icon-yellow-h.png";

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
    } else if (positionHistoryStore.equipmentPositionHistoryInfo.length > 0) {
        return positionHistoryStore.equipmentPositionHistoryInfo;
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

const getCustomIcon = (color: string, model: string) => {
    let iconUrl = getIconUrlByColor(color, model);
    return L.icon({
        iconUrl,
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
    });
};

const getIconUrlByColor = (color: string, model: string) => {
    if (color === "#e74c3c" && model === "Caminhão de carga") return redTruck;
    if (color === "#2ecc71" && model === "Caminhão de carga") return greenTruck;
    if (color === "#f1c40f" && model === "Caminhão de carga") return yellowTruck;

    if (color === "#e74c3c" && model === "Harvester") return redHarvester;
    if (color === "#2ecc71" && model === "Harvester") return greenHarvester;
    if (color === "#f1c40f" && model === "Harvester") return yellowHarvester;

    if (color === "#e74c3c" && model === "Garra traçadora") return redClaw;
    if (color === "#2ecc71" && model === "Garra traçadora") return greenClaw;
    if (color === "#f1c40f" && model === "Garra traçadora") return yellowClaw;

    return blueIconUrl;
};

const clean = () => {
    positionHistoryStore.resetPositionHistoryData();
    positionHistoryStore.getLatestPositionsHistory();
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
    position: relative;
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

.clean-btn {
    background-color: rgb(137, 26, 26);
    cursor: pointer;
    color: white;
    border-radius: 10px;
    padding: 5px;
    border: 0;
    
    position: absolute;
    top: 10px;
    right: 5px;

    height: 45px;
    width: 40px;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
