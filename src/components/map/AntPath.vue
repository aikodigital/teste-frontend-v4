<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from "vue";
import L from "leaflet";
import "leaflet-ant-path";

// Props: coordenadas e objeto do mapa
const props = defineProps<{
  latLngs: [number, number][];
  mapObject: any;
}>();

let antPath: any;

// Cria a linha animada no mapa
onMounted(() => {
  if (props.mapObject && props.latLngs.length > 0) {
    antPath = (L as any).polyline.antPath(props.latLngs, {
      paused: false,
      reverse: false,
      delay: 800,
      dashArray: [10, 20],
      weight: 3,
      color: "#0000FF",
      pulseColor: "#FFFFFF",
    }).addTo(props.mapObject);
  }
});

// Atualiza a linha quando as coordenadas mudam
watch(
  () => props.latLngs,
  (newVal) => {
    if (antPath) {
      antPath.setLatLngs(newVal);
    }
  }
);

// Remove a linha do mapa ao desmontar
onBeforeUnmount(() => {
  if (antPath && props.mapObject) {
    props.mapObject.removeLayer(antPath);
  }
});
</script>
