<script setup lang="ts">
import type { PositionHistory } from '@/stores/equipments/positionHistory';
import type { State } from '@/stores/equipments/state';
import { fromLonLat } from 'ol/proj';
import { computed } from 'vue';

const props = defineProps<{ points: { state: Omit<State, 'id'>; position: PositionHistory }[] }>();

const center = computed(() => {
  const { lon, lat } = props.points.reduce(
    ({ lon, lat }, { position }) => ({
      lon: lon + position.lon,
      lat: lat + position.lat,
    }),
    { lon: 0, lat: 0 },
  );

  return fromLonLat([lon / props.points.length, lat / props.points.length]);
});
</script>

<template>
  <ol-map class="w-100 h-100">
    <ol-view :center="center" :zoom="10" />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature v-for="({ position, state }, index) in points" :key="`point-${index}`">
          <ol-geom-point
            :coordinates="fromLonLat([position.lon, position.lat])"
            :title="state.name"
          ></ol-geom-point>
          <ol-style>
            <ol-style-circle :radius="5">
              <ol-style-fill :color="state.color"></ol-style-fill>
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>
