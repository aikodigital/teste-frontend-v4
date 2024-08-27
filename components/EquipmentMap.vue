<script lang="ts" setup>
/** Core */
import type { PointExpression } from 'leaflet';

const { recentEquipments } = useEquipments();

const equipmentsRecentPositions = getEquipmentsRecentPosition(recentEquipments.value);
const centralPosition = ref<PointExpression>(getCentralPosition(equipmentsRecentPositions));
const zoom = ref<number>(getZoomLevel(equipmentsRecentPositions));
</script>

<template>
  <div class="h-screen w-3/4 border-2 border-black rounded flex-1">
    <LMap ref="map" style="height: 100%" :zoom="zoom" :center="centralPosition" :useGlobalLeaflet="false">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layerType="base" name="OpenStreetMap" />

      <div v-for="equipment in recentEquipments" :key="equipment.id">
        <EquipmentMarker v-for="equipment in recentEquipments" :key="equipment.id" :equipment="equipment" />
      </div>
    </LMap>
  </div>
</template>
