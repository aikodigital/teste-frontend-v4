<template>
    <div class="map-container">
        <div class="map-area">
            <l-map
                v-if="latestPositions.length > 0"
                ref="map"
                v-model:zoom="zoom"
                :center="mapCenter"
                :use-global-leaflet="false"
            >
                <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                ></l-tile-layer>

                <l-marker
                    v-for="(position, index) in latestPositions"
                    :key="index"
                    :lat-lng="[position?.lat, position?.lon]"
                >
                    <l-popup>
                        Equipamento ID: {{ position?.equipmentId }}<br />
                        Última posição: {{ position?.date }}
                    </l-popup>
                </l-marker>
            </l-map>
            <div v-else>
                Não foi possível localizar as últimas posições dos equipamentos.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

interface Position {
    date: string;
    lat: number;
    lon: number;
}

interface EquipmentPosition {
    equipmentId: string;
    positions: Position[];
}

const zoom = ref<number>(10);
const positionsData = ref<EquipmentPosition[]>([]);

const latestPositions = computed(() => {
    if (positionsData.value.length > 0) {
        return positionsData.value.map((equipment: EquipmentPosition) => {
            const latestPosition = getLatestPosition(equipment);
            if (latestPosition) {
                return {
                    ...latestPosition,
                    equipmentId: equipment.equipmentId,
                };
            }
            return null;
        });
    } else {
        return [];
    }
});

const mapCenter = computed(() => {
    if (latestPositions.value.length > 0) {
        return latestPositions.value[0];
    } else {
        return [];
    }
});

const getLatestPosition = (equipment: EquipmentPosition) => {
    if (equipment.positions && equipment.positions.length > 0) {
        return equipment.positions.reduce((latest, current) => {
            return new Date(current.date) > new Date(latest.date)
                ? current
                : latest;
        }, equipment.positions[0]);
    }
    return null;
};

const fetchPositionHistory = async () => {
    try {
        // Simulando uma requisição a uma API no backend.
        const response = await fetch("/data/equipmentPositionHistory.json");
        positionsData.value = await response.json();
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
};

onMounted(async () => {
    fetchPositionHistory();
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
    width: 70vw;
}

.map-area {
    height: 100%;
    width: 800px;
}
</style>
