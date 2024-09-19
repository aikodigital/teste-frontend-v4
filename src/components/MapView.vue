<template>
    <div style="height: 600px; width: 800px">
        <l-map
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
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import positionsData from "@/data/equipmentPositionHistory.json";

interface Position {
  date: string;
  lat: number;
  lon: number;
}

interface Equipment {
  equipmentId: string;
  positions: Position[];
}

const zoom = ref<number>(10);

const latestPositions = computed(() => {
    if (positionsData.length > 0) {
        return positionsData.map((equipment: Equipment) => {
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

const getLatestPosition = (equipment: Equipment) => {
    if (equipment.positions && equipment.positions.length > 0) {
        return equipment.positions.reduce((latest, current) => {
            return new Date(current.date) > new Date(latest.date)
                ? current
                : latest;
        }, equipment.positions[0]);
    }
    return null;
};

// onMounted(async () => {
//   fetchPositionHistory()
// });

// async fetchPositionHistory() {
//     try {
//         const response = await fetch("/equipmentPositionHistory.json");
//         console.log('response', response)

//         this.positionsData = await response.json();
//         console.log('positionsData', this.positionsData)
//         this.setLatestPositions();
//     } catch (error) {
//         console.error("Erro ao carregar dados:", error);
//     }
// },
</script>

<style></style>
