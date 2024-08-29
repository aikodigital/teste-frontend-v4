<script lang="ts" setup>
/** Core */
import type { LatLngExpression, PointExpression } from 'leaflet';

/** Função para recuperar os equipamentos existentes */
const { recentEquipments } = useEquipments();

/** Função para recuperar os equipamentos a serem exibidos */
const { filteredEquipments } = useFilteredEquipments();

/** Coordenadas de rotas a serem exibidas no mapa */
const { positionsToShow } = useShowRoutes();
const positionsArray = computed(() => Array.from(positionsToShow.value.values()));

/** Última posição dos equipamentos */
const equipmentsRecentPositions = getEquipmentsRecentPosition(recentEquipments.value);

/** Posição que o mapa iniciará */
const centralPosition = ref<PointExpression>(getCentralPosition(equipmentsRecentPositions));

/** Zoom que o mapa iniciará */
const zoom = ref<number>(getZoomLevel(equipmentsRecentPositions));
</script>

<template>
  <div class="h-screen w-3/4 border-2 border-black rounded flex-1">
    <LMap ref="map" style="height: 100%" :zoom="zoom" :center="centralPosition" :useGlobalLeaflet="false">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layerType="base" name="OpenStreetMap" />

      <div v-for="equipment in filteredEquipments" :key="equipment.id">
        <EquipmentMarker :equipment="equipment" />
      </div>

      <LPolyline :lat-lngs="positionsArray as unknown as LatLngExpression[]" color="green" />
    </LMap>
  </div>
</template>
