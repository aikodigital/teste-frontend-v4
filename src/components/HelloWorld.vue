<template>
  <v-row justify="center">
    <div id="mapContainer" />
  </v-row>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Importar os ícones manualmente
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export default {
  name: "LMap",
  data() {
    return {
      map: null,
      markers: [
        { latitude: -23.5505, longitude: -46.6333, descricao: "São Paulo" },
        { latitude: -22.9068, longitude: -43.1729, descricao: "Rio de Janeiro" },
        { latitude: -15.7801, longitude: -47.9292, descricao: "Brasília" },
        { latitude:  -2.53073, longitude: -44.3068, descricao: "São Luís" },
      ],
    };
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
    createMapLayer() {
      this.map = L.map("mapContainer");
      L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      if (this.markers.length) {
        this.setMarkers();
      }
    },
    setMarkers() {
      const bounds = [];

      // Definir ícone manualmente
      const defaultIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41], // Tamanho do ícone
        iconAnchor: [12, 41], // Ponto de ancoragem do ícone
        popupAnchor: [1, -34], // Ponto de ancoragem do popup
        shadowSize: [41, 41], // Tamanho da sombra
      });

      this.markers.forEach((marker) => {
        L.marker([marker.latitude, marker.longitude], { icon: defaultIcon })
          .addTo(this.map)
          .bindPopup(marker.descricao);

        // Adicionar a posição do marcador aos bounds
        bounds.push([marker.latitude, marker.longitude]);
      });

      // Ajustar o zoom e a posição do mapa para incluir todos os marcadores
      this.map.fitBounds(bounds);
    },
  },
};
</script>

<style scoped>
#mapContainer {
  width: 50vw;
  height: calc(100vh - 50px);
}
</style>
