<script lang="ts" setup>
/** Data */
import eph from '~/data/equipmentPositionHistory.json';

/** Interfaces */
import type { IEquipmentPositionHistory } from '~/interfaces/IEquipmentPositionHistory';

const equipmentPositionHistory = ref<IEquipmentPositionHistory[]>(eph);
const zoom = ref(2);
</script>

<template>
  <div>
    <LMap style="height: 700px" :zoom="zoom" :center="[47.21322, -1.559482]" :use-global-leaflet="false">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base" name="OpenStreetMap" />

      <div v-for="equipment in equipmentPositionHistory">
        <LMarker
          :lat-lng="[equipment.positions[equipment.positions.length - 1].lat, equipment.positions[equipment.positions.length - 1].lon]">
          <LPopup>
            {{ equipment.equipmentId }}
          </LPopup>
        </LMarker>
      </div>
    </LMap>
  </div>
</template>
