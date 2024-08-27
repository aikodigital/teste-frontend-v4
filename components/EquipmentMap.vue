<script lang="ts" setup>
/** Data */
import eph from '~/data/equipmentPositionHistory.json';

/** Interfaces */
import type { IEquipmentPositionHistory } from '~/interfaces/IEquipmentPositionHistory';

const equipmentPositionHistory = ref<IEquipmentPositionHistory[]>(eph);
const zoom = ref(2);

function getLastPosition(positions: { lat: number; lon: number }[]) {
  return positions[positions.length - 1];
}
</script>

<template>
  <div>
    <LMap style="height: 700px" :zoom="zoom" :center="[47.21322, -1.559482]" :use-global-leaflet="false">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base" name="OpenStreetMap" />

      <div v-for="equipment in equipmentPositionHistory" :key="equipment.equipmentId">
        <LMarker :lat-lng="[getLastPosition(equipment.positions).lat, getLastPosition(equipment.positions).lon]">
          <LPopup>
            {{ equipment.equipmentId }}
          </LPopup>
        </LMarker>
      </div>
    </LMap>
  </div>
</template>
