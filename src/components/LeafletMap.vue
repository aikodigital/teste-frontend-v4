<template>
  <div>
    <div ref="mapContainer" class="map-container"></div>
    <CustomMarker
      v-for="(marker, index) in markers"
      :key="index"
      :position="marker.position"
      :content="marker.content"
      @update-marker="updateMarker"
      @click="openModal(marker.equipmentId)"
    />
    <MarkerModal
      v-if="showModal"
      :equipmentId="selectedEquipmentId || ''"
      :equipmentHistory="equipmentStateHistory"
      :show="showModal"
      :equipmentName="equipmentDetails.name || 'Desconhecido'"
      :modelName="equipmentDetails.modelName || 'Desconhecido'"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, shallowRef, watch, computed } from "vue";
import * as L from "leaflet";
import CustomMarker from "./CustomMarker.vue";
import MarkerModal from "./MarkerModal.vue";
import "leaflet/dist/leaflet.css";
import { useStore } from "vuex";

interface Marker {
  position: [number, number];
  content: string;
  equipmentId: string;
}

export default defineComponent({
  name: "LeafletMap",
  components: {
    CustomMarker,
    MarkerModal,
  },
  setup() {
    const store = useStore();
    const mapContainer = shallowRef<HTMLElement | null>(null);
    const map = shallowRef<L.Map | null>(null);
    const leafletMarkers = shallowRef<L.Marker[]>([]);
    const showModal = shallowRef(false);
    const selectedEquipmentId = shallowRef<string | null>(null);

    const markers = computed(() => store.getters.getMarkers);
    const equipmentStateHistory = computed(() => {
      if (selectedEquipmentId.value) {
        return store.getters.getEquipmentStateHistory(
          selectedEquipmentId.value
        );
      }
      return [];
    });

    // computed for access equipment details
    const equipmentDetails = computed(() => {
      if (selectedEquipmentId.value) {
        return store.getters.getEquipmentDetails(selectedEquipmentId.value);
      }
      return { name: "Desconhecido", modelName: "Modelo Desconhecido" };
    });

    const loadMarkers = () => {
      store.dispatch("loadMarkers");
    };

    onMounted(() => {
      if (mapContainer.value) {
        const tileLayer = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        );

        map.value = L.map(mapContainer.value, {
          center: [0, 0],
          zoom: 2,
          layers: [tileLayer],
        });

        map.value.whenReady(() => {
          loadMarkers();
        });
      }
    });

    const iconMap: Record<string, string> = {
      Harvester: "fa-tractor",
      "Caminhão de carga": "fa-truck",
      "Garra traçadora": "fa-snowplow",
    };

    const addMarkersToMap = () => {
      if (!map.value) return;

      leafletMarkers.value.forEach((marker) => marker.remove());
      leafletMarkers.value = [];

      const bounds = L.latLngBounds([]);
      markers.value.forEach((marker: Marker) => {
        if (map.value) {
          try {
            const equipmentId = marker.equipmentId;

            const equipmentDetail = store.state.equipmentDetails[
              equipmentId
            ] || {
              name: "Desconhecido",
              modelName: "Modelo Desconhecido",
            };
            const equipmentModelName = equipmentDetail.modelName;

            const iconClass =
              iconMap[equipmentModelName] || "fa-question-circle";

            // Crie o ícone com a cor do estado
            const markerElement = L.divIcon({
              className: "custom-icon",
              html: `<i class="fas ${iconClass}" style="font-size: 22px;"></i>`,
              iconSize: [25, 41],
            });

            const newLeafletMarker = L.marker(marker.position, {
              icon: markerElement,
            })
              .bindTooltip(marker.content, {
                permanent: false,
                direction: "top",
                opacity: 0.8,
              })
              .on("click", () => openModal(marker.equipmentId))
              .addTo(map.value);

            bounds.extend(newLeafletMarker.getLatLng());
            leafletMarkers.value.push(newLeafletMarker);
          } catch (error) {
            console.error("Error adding marker to the map:", error);
          }
        }
      });

      if (map.value && bounds.isValid()) {
        map.value.fitBounds(bounds, { padding: [20, 20] });
      }
    };

    watch(markers, addMarkersToMap, { immediate: true });

    const openModal = (equipmentId: string) => {
      selectedEquipmentId.value = equipmentId;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedEquipmentId.value = null;
    };

    const updateMarker = ({
      position,
      content,
    }: {
      position: [number, number];
      content: string;
    }) => {
      if (!map.value) return;

      let existingMarker = leafletMarkers.value.find((m) =>
        m.getLatLng().equals(L.latLng(position))
      );

      if (existingMarker) {
        existingMarker.setLatLng(position).bindTooltip(content);
      } else {
        if (map.value) {
          try {
            const newMarker = L.marker(position)
              .bindTooltip(content, {
                permanent: false,
                direction: "top",
                opacity: 0.8,
              })
              .addTo(map.value);
            leafletMarkers.value.push(newMarker);
          } catch (error) {
            console.error("Error adding marker to the map:", error);
          }
        }
      }
    };

    return {
      map,
      mapContainer,
      markers,
      updateMarker,
      openModal,
      closeModal,
      showModal,
      equipmentStateHistory,
      equipmentDetails,
      selectedEquipmentId,
      leafletMarkers,
    };
  },
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
}
</style>
