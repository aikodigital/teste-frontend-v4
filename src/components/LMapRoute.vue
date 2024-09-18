<template>
  <div style="position: relative; width: 100%">
    <!-- Mapa sempre está presente no DOM, mas o spinner será exibido sobre ele -->
    <div id="mapContainer" :style="{ opacity: loading ? 0.5 : 1 }" />
    <!-- Circular progress como um overlay -->
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      size="100"
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <h6>Carregando Rota</h6>
    </v-progress-circular>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import positionHistory from "../data/equipmentPositionHistory.json";

export default {
  name: "LMapRoute",
  props: {
    selectedEquipmentId: {
      type: String,
      required: true,
    },
    selectedDate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      markers: [],
      routeControl: null, // Para armazenar o controle de rota
      loading: false, // Estado de carregamento
    };
  },
  watch: {
    // Atualizar os marcadores quando o equipamento ou a data forem modificados
    selectedEquipmentId(newEquipmentId) {
      this.loadMarkersFromJson(newEquipmentId, this.selectedDate);
    },
    selectedDate(newDate) {
      this.loadMarkersFromJson(this.selectedEquipmentId, newDate);
    },
  },
  mounted() {
    this.createMapLayer();
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    loadMarkersFromJson(equipmentId, selectedDate) {
      this.loading = true;
      this.markers = [];

      // Filtrar equipamento e data, se disponível
      const equipment = positionHistory.find(
        (eq) => eq.equipmentId === equipmentId
      );

      if (equipment) {
        const filteredPositions = selectedDate
          ? equipment.positions.filter(
              (position) =>
                new Date(position.date).toLocaleDateString("pt-BR") ===
                selectedDate
            )
          : equipment.positions;

        filteredPositions.forEach((position) => {
          const formattedDate = new Date(position.date).toLocaleDateString(
            "pt-BR"
          );
          this.markers.push({
            latitude: position.lat,
            longitude: position.lon,
            descricao: `Data: ${formattedDate}`,
          });
        });

        // Adiciona a rota somente se o mapa estiver pronto
        if (this.map) {
          this.addRoute();
        }
      } else {
        this.loading = false;
      }
    },

    createMapLayer() {
      // Inicialize o mapa localmente
      const map = L.map("mapContainer").setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      this.map = map; // Armazena o mapa localmente

      map.whenReady(() => {
        console.log("Mapa carregado com sucesso!");
        this.setMarkers(map); // Certifique-se de que o mapa está pronto antes de adicionar marcadores
      });
    },

    addRoute() {
      if (!this.map || this.markers.length === 0) {
        this.loading = false; // Finaliza o loading se não houver marcadores
        return;
      }

      const waypoints = this.markers.map((marker) =>
        L.latLng(marker.latitude, marker.longitude)
      );

      // Remove o controle de rota anterior, se existir
      if (this.routeControl) {
        this.map.removeControl(this.routeControl);
      }

      // Adiciona a nova rota e cria marcadores com popups
      this.routeControl = L.Routing.control({
        waypoints,
        createMarker: (i, waypoint) => {
          const color =
            i === 0 ? "green" : i === waypoints.length - 1 ? "red" : "darkblue";
          const number = i + 1; // Número no marcador

          // Criar o marcador com o número centralizado
          const icon = L.divIcon({
            className: "custom-icon",
            html: `<div style="background-color: ${color}; color: white; border-radius: 50%; width: 30px; height: 30px; text-align: center; line-height: 30px; font-size: 14px; font-weight: bold;">${number}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          });

          // Criar o marcador
          const marker = L.marker(waypoint.latLng, { icon });

          // Adicionar o popup com a data, latitude e longitude
          const { descricao, latitude, longitude } = this.markers[i];
          marker.bindPopup(`
            <div>
              <p><strong>Data:</strong> ${descricao}</p>
              <p><strong>Latitude:</strong> ${latitude}</p>
              <p><strong>Longitude:</strong> ${longitude}</p>
            </div>
          `);

          return marker;
        },
        routeWhileDragging: false,
      }).addTo(this.map);

      this.routeControl.on("routesfound", () => {
        // Finaliza o loading após a rota ser traçada
        this.loading = false;
      });

      this.routeControl.on("routingerror", () => {
        // Finaliza o loading em caso de erro
        this.loading = false;
      });
    },

    setMarkers() {
      const bounds = [];

      this.markers.forEach((markerData, i) => {
        const color =
          i === 0
            ? "green"
            : i === this.markers.length - 1
            ? "red"
            : "darkblue";
        const number = i + 1; // Número no marcador

        // Criar o marcador com o número centralizado
        const icon = L.divIcon({
          className: "custom-icon",
          html: `<div style="background-color: ${color}; color: white; border-radius: 50%; width: 30px; height: 30px; text-align: center; line-height: 30px; font-size: 14px; font-weight: bold;">${number}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        const marker = L.marker([markerData.latitude, markerData.longitude], {
          icon,
        }).bindPopup(`
          <div>
            <p><strong>Data:</strong> ${markerData.descricao}</p>
            <p><strong>Latitude:</strong> ${markerData.latitude}</p>
            <p><strong>Longitude:</strong> ${markerData.longitude}</p>
          </div>
        `);

        marker.addTo(this.map);

        bounds.push([markerData.latitude, markerData.longitude]);
      });

      if (this.map && bounds.length > 0) {
        this.map.fitBounds(bounds);
      }
    },
  },
};
</script>

<style scoped>
#mapContainer {
  top: 0;
  left: 0;
  width: 100%;
  height: 65vh;
  z-index: 1;
}
.custom-icon {
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
}
</style>
