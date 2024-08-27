<template>
  <div id="map"></div>
  <EquipmentHistoryModal
    :isVisible="isModalVisible"
    :selectedEquipment="selectedEquipment"
    @update:isVisible="isModalVisible = $event"
    @prevPage="prevPage"
    @nextPage="nextPage"
    :currentPage="currentPage"
    :totalPages="totalPages"
    :paginatedStates="paginatedStates"
    :getStatusColor="getStatusColor"
    :formatDate="formatDate"
  />
</template>

<script>
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import EquipmentHistoryModal from "./EquipmentHistoryModal.vue";
import { format } from "date-fns";
export default {
  name: "AppMap",
  components: {
    EquipmentHistoryModal,
  },
  data() {
    return {
      isModalVisible: false,
      selectedEquipment: null,
      equipmentStates: {},
      equipmentModels: {},
      equipments: [],
      currentPage: 1,
      itemsPerPage: 10,
      statusColors: {
        Operando: "#2ecc71",
        Parado: "#f1c40f",
        Manutenção: "#e74c3c",
      },
    };
  },
  computed: {
    paginatedStates() {
      if (!this.selectedEquipment) return [];
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.selectedEquipment.states.slice(start, end);
    },
    totalPages() {
      if (!this.selectedEquipment) return 1;
      return Math.ceil(
        this.selectedEquipment.states.length / this.itemsPerPage
      );
    },
  },
  methods: {
    loadEquipmentData() {
      axios
        .all([
          axios.get("/data/equipmentPositionHistory.json"),
          axios.get("/data/equipmentState.json"),
          axios.get("/data/equipmentModel.json"),
          axios.get("/data/equipmentStateHistory.json"),
          axios.get("/data/equipment.json"),
        ])
        .then(
          axios.spread(
            (
              positionHistory,
              stateData,
              modelData,
              stateHistory,
              equipmentData
            ) => {
              this.equipmentStates = this.mapById(stateData.data);
              this.equipmentModels = this.mapById(modelData.data);
              this.equipments = equipmentData.data;

              const bounds = L.latLngBounds();

              positionHistory.data.forEach((equipment) => {
                const { equipmentId, positions } = equipment;
                const latestPosition = positions[positions.length - 1];
                const { lat, lon } = latestPosition;
                if (lat !== undefined && lon !== undefined) {
                  const marker = L.marker([lat, lon])
                    .addTo(this.map)
                    .on("click", () => this.showEquipmentHistory(equipmentId))
                    .on("mouseover", () =>
                      this.showEquipmentState(equipmentId)
                    );
                  bounds.extend(marker.getLatLng());

                  // Armazena o marcador junto com o equipamento
                  const equipmentItem = this.equipments.find(
                    (eq) => eq.id === equipmentId
                  );
                  if (equipmentItem) {
                    equipmentItem.marker = marker;
                  }
                } else {
                  console.error(
                    "Dados inválidos para posição:",
                    latestPosition
                  );
                }
              });

              if (bounds.isValid()) {
                this.map.fitBounds(bounds);
              } else {
                this.map.setView([51.505, -0.09], 13);
              }
            }
          )
        )
        .catch((error) => {
          console.error("Erro ao carregar dados do JSON:", error);
          this.map.setView([51.505, -0.09], 13);
        });
    },
    mapById(dataArray) {
      return dataArray.reduce((map, item) => {
        map[item.id] = item;
        return map;
      }, {});
    },
    showEquipmentState(equipmentId) {
      axios
        .get(`/data/equipmentStateHistory.json`)
        .then((response) => {
          const equipmentHistory = response.data.find(
            (history) => history.equipmentId === equipmentId
          );
          if (equipmentHistory) {
            const states = equipmentHistory.states;
            const latestState = states[states.length - 1];
            const stateInfo =
              this.equipmentStates[latestState.equipmentStateId];
            const equipmentItem = this.equipments.find(
              (equipment) => equipment.id === equipmentId
            );
            const marker = equipmentItem.marker;
            L.popup({ offset: L.point(0, -40) })
              .setLatLng(marker.getLatLng())
              .setContent(
                `<div>
              <div>Equipamento: ${equipmentItem.name}</div>
              <div>Estado Atual: <span style="color: ${this.getStatusColor(
                stateInfo.name
              )}">${stateInfo.name}</span></div>
            </div>`
              )
              .openOn(this.map);
          } else {
            console.error(
              "Histórico de estados não encontrado para o equipamento:",
              equipmentId
            );
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar estado atual do equipamento:", error);
        });
    },
    showEquipmentHistory(equipmentId) {
      axios
        .get(`/data/equipmentStateHistory.json`)
        .then((response) => {
          const equipmentHistory = response.data.find(
            (history) => history.equipmentId === equipmentId
          );
          if (equipmentHistory) {
            this.selectedEquipment = {
              id: equipmentId,
              states: equipmentHistory.states.map((state) => {
                return {
                  date: state.date,
                  status: this.equipmentStates[state.equipmentStateId].name,
                };
              }),
            };
            this.isModalVisible = true;
            this.currentPage = 1;
          } else {
            console.error(
              "Histórico de estados não encontrado para o equipamento:",
              equipmentId
            );
          }
        })
        .catch((error) => {
          console.error(
            "Erro ao carregar histórico de estados do equipamento:",
            error
          );
        });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    formatDate(dateString) {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
    },
    getStatusColor(status) {
      return this.statusColors[status] || "#000000";
    },
  },
  mounted() {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    this.map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.loadEquipmentData();
  },
};
</script>

<style scoped>
h3 {
  color: #002255;
}
#map {
  width: 100%;
  height: 100vh;
}
.pagination-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
}

.pagination-controls button {
  background-color: #00c100;
  color: white;
  border: none;
}

.pagination-controls span {
  color: #002255;
  font-weight: 700;
}

.list__states {
  color: #444444;
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}
</style>
