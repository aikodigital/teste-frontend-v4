<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { onBeforeUnmount, ref } from "vue";
import { onMounted } from "vue";
import { useResizeObserver, useThrottleFn } from "@vueuse/core";

withDefaults(defineProps<{
  zoom?: number
}>(), {
  zoom: 11
});

const map = ref<InstanceType<typeof LMap>>();

const isMounted = ref(false);
const mapWrapper = ref<HTMLDivElement>();

onMounted(() => {
  isMounted.value = true;
});

useResizeObserver(mapWrapper, useThrottleFn(() => {
  if (map.value) {
    map.value?.leafletObject?.invalidateSize();
  }
}));

onBeforeUnmount(() => {
  isMounted.value = false;
});

</script>

<template>
  <div
    ref="mapWrapper"
    class="w-full h-full"
  >
    <LMap
      v-if="isMounted"
      ref="map"
      :zoom="zoom"
      :use-global-leaflet="false"
      :center="[-19.167338, -46.00347]"
      v-bind="$attrs"
      v-on="$attrs"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <slot />
    </LMap>
  </div>
</template>
