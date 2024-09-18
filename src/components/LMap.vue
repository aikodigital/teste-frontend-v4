<template>
   <div id="mapContainer" />

    <!-- Diálogo que mostra o histórico completo dos estados -->
    <v-dialog v-model="showHistoryDialog" max-width="500px">
      <v-card>
        <v-card-title
          class="d-flex justify-space-between align-center mt-3 ml-14 text-xs-h8"
        >
          <span class="text-h8">Histórico de Estados</span>
          <v-btn size="x-small" variant="text" icon @click="closeDialog">
            <v-icon icon="mdi-close"></v-icon>
          </v-btn>
        </v-card-title>
        <v-divider
          color="teal"
          class="border-opacity-100"
          :thickness="2"
          inset
        ></v-divider>

        <v-card-text>
          <v-list dense>
            <v-list-item
              v-for="(state, index) in selectedEquipmentStateHistory"
              :key="index"
            >
              <v-list-item-content class="my-2">
                <v-list-item-title class="mb-1">
                  <v-icon left>mdi-calendar</v-icon>
                  <!-- Ícone ao lado da data -->
                  {{ formatDate(state.date) }}
                </v-list-item-title>
                <v-list-item-subtitle class="mb-1">
                  <v-icon :color="getStateColor(state.equipmentStateId)" left
                    >mdi-circle</v-icon
                  >
                  <!-- Ícone ao lado do estado -->
                  {{ getStateName(state.equipmentStateId) }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-divider :thickness="3" color="gray"></v-divider>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-row justify="center">
          <v-card-actions  class="mb-5">
          <v-btn variant="flat" color="teal" @click="closeDialog">Fechar</v-btn>
        </v-card-actions>
        </v-row>
        
      </v-card>
    </v-dialog>
 
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import equipmentData from "../data/equipment.json"; // Equipamentos
import equipmentModelData from "../data/equipmentModel.json"; // Modelos
import equipmentStateData from "../data/equipmentState.json"; // Estados
import equipmentStateHistory from "../data/equipmentStateHistory.json"; // Histórico de Estados
import equipmentPositionHistory from "../data/equipmentPositionHistory.json"; // Histórico de Posições

export default {
  name: "LMap",
  data() {
    return {
      positionHistory: equipmentPositionHistory,
      stateHistory: equipmentStateHistory,
      equipmentStates: equipmentStateData, // Dados importados do JSON
      showHistoryDialog: false, // Controle do diálogo de histórico
      selectedEquipmentId: null, // ID do equipamento selecionado para exibir o histórico
      selectedEquipmentStateHistory: [], // Histórico de estados do equipamento selecionado
    };
  },
  mounted() {
    this.createMapLayer();
  },
  beforeUnmount() {
    // Remover o mapa e suas camadas, se necessário
    if (this.map) {
      this.map.eachLayer((layer) => {
        this.map.removeLayer(layer); // Remover todos os layers para evitar problemas
      });
      this.map.remove(); // Remove completamente o mapa
    }
  },
  methods: {
    createMapLayer() {
      // Inicialize o mapa localmente
      const map = L.map("mapContainer").setView([-23.5505, -46.6333], 5);

      L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.whenReady(() => {
        this.setMarkers(map);
      });
    },

    createStateIcon(stateColor) {
      try {
        const iconUrl = require("../assets/aiko.png");

        return L.divIcon({
          className: "custom-icon",
          html: `
            <div style="position: relative; width: 40px; height: 40px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="60" viewBox="0 0 24 24" fill="${stateColor}">
                <path d="M12 2C8.14 2 5 5.14 5 9c0 3.39 3.27 7.94 6.36 11.54.4.47 1.12.47 1.51 0C15.73 16.94 19 12.39 19 9c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
              </svg>
              <img src="${iconUrl}" style="position: absolute; top: 5%; left:55%; width: 25px; height: 12px; transform: translate(-50%, -50%);" />
            </div>
          `,
        });
      } catch (error) {
        console.error("Erro ao criar o ícone de estado:", error);
      }
    },

    setMarkers(map) {
      const bounds = [];

      this.positionHistory.forEach((equipment) => {
        const latestPosition = this.getLatestPosition(equipment.positions);
        const equipmentInfo = this.getEquipmentInfo(equipment.equipmentId);

        if (latestPosition && equipmentInfo) {
          const stateColor = equipmentInfo.stateColor;

          const customIcon = this.createStateIcon(stateColor);

          if (latestPosition.lat !== null && latestPosition.lon !== null) {
            const marker = L.marker([latestPosition.lat, latestPosition.lon], {
              icon: customIcon,
            })
              .addTo(map)
              .bindPopup(
                `
                  <div style="text-align: center; margin-bottom: 10px;">
                    <div style="font-size: 16px; font-weight: bold; color: ${
                      equipmentInfo.stateColor
                    };">
                      ${equipmentInfo.stateName}
                    </div>
                    <div>
                      <img src="${this.getModelImage(
                        equipmentInfo.modelName
                      )}" alt="${
                  equipmentInfo.modelName
                }" style="width: 60px; height: 60px;" />
                    </div>
                  </div>
                  <b>Equipamento:</b> ${equipmentInfo.name} <br>
                  <b>Modelo:</b> ${equipmentInfo.modelName} <br>
                  <b>Última posição:</b> ${this.formatDate(latestPosition.date)}
                `
              );

            marker.on("mouseover", () => {
              marker.openPopup();
            });

            marker.on("click", () => {
              this.selectedEquipmentId = equipment.equipmentId;

              // Carregar o histórico de estados antes de abrir o diálogo
              this.loadEquipmentStateHistory(equipment.equipmentId);

              // Exibir o diálogo depois de carregar o histórico
              this.showHistoryDialog = true;
            });

            bounds.push([latestPosition.lat, latestPosition.lon]);
          }
        }
      });

      if (map && bounds.length > 0) {
        map.fitBounds(bounds);
      }
    },

    // Função para obter o estado mais recente baseado na última posição
    getLatestStateBasedOnPosition(equipmentId, lastPositionDate) {
      const stateHistory = this.stateHistory.find(
        (history) => history.equipmentId === equipmentId
      );

      if (!stateHistory) return null;

      // Encontrar o estado cujo intervalo inclui a última data de posição
      const latestState = stateHistory.states.find((state) => {
        const startDate = new Date(state.date);
        const endDate = new Date(state.endDate || state.date); // Supondo que `endDate` pode não estar presente e usar a mesma data para ambos os campos

        return lastPositionDate >= startDate && lastPositionDate <= endDate;
      });

      return latestState
        ? this.getStateInfo(latestState.equipmentStateId)
        : null;
    },

    // Função para obter as informações do estado
    getStateInfo(stateId) {
      const state = equipmentStateData.find((s) => s.id === stateId);
      return state
        ? { name: state.name, color: state.color }
        : { name: "Desconhecido", color: "#000000" };
    },

    // Função para carregar o histórico do equipamento
    async loadEquipmentStateHistory(equipmentId) {
      this.selectedEquipmentStateHistory =
        this.getEquipmentStateHistory(equipmentId);
    },

    getStateColor(equipmentStateId) {
      // Retorna a cor correspondente ao ID do estado
      const state = this.equipmentStates.find((s) => s.id === equipmentStateId);
      return state ? state.color : "gray"; // Retorna cinza se o estado não for encontrado
    },

    closeDialog() {
      this.showHistoryDialog = false;
    },

    getLatestPosition(positions) {
      return positions.reduce((latest, position) => {
        return new Date(position.date) > new Date(latest.date)
          ? position
          : latest;
      }, positions[0]);
    },

    getEquipmentInfo(equipmentId) {
      const equipment = equipmentData.find((eq) => eq.id === equipmentId);
      if (!equipment) return null;

      const model = equipmentModelData.find(
        (model) => model.id === equipment.equipmentModelId
      );
      const latestState = this.getLatestState(equipmentId);
      const state = equipmentStateData.find(
        (state) => state.id === latestState?.equipmentStateId
      );

      return {
        name: equipment.name,
        modelName: model ? model.name : "Desconhecido",
        stateName: state ? state.name : "Desconhecido",
        stateColor: state ? state.color : "#000000",
      };
    },

    getLatestState(equipmentId) {
      // 1. Busca o histórico de estados do equipamento
      const stateHistory = this.stateHistory.find(
        (history) => history.equipmentId === equipmentId
      );
      if (!stateHistory) return null;

      // 2. Busca o histórico de posições do equipamento
      const positionHistory = this.positionHistory.find(
        (history) => history.equipmentId === equipmentId
      );
      if (!positionHistory) return null;

      // 3. Encontra a data mais recente no positionHistory
      const latestPosition = positionHistory.positions.reduce(
        (latest, position) => {
          return new Date(position.date) > new Date(latest.date)
            ? position
            : latest;
        },
        positionHistory.positions[0]
      );

      // 4. Compara a data mais recente de positionHistory com os estados de stateHistory
      let previousState = null;

      for (const state of stateHistory.states) {
        if (new Date(state.date) === new Date(latestPosition.date)) {
          // 5. Se as datas coincidirem, retorna o equipmentStateId
          return state;
        } else if (new Date(state.date) > new Date(latestPosition.date)) {
          // 6. Se o estado atual passa a data de positionHistory, retorna o estado anterior
          return previousState ? previousState : stateHistory.states[0];
        }

        // 7. Atualiza o estado anterior caso a data não tenha ultrapassado
        previousState = state;
      }

      // 8. Se nenhum estado ultrapassou, retorna o estado mais recente disponível
      return previousState;
    },

    getEquipmentStateHistory(equipmentId) {
      const stateHistory = this.stateHistory.find(
        (history) => history.equipmentId === equipmentId
      );
      return stateHistory ? stateHistory.states : [];
    },

    getStateName(stateId) {
      const state = equipmentStateData.find((s) => s.id === stateId);
      return state ? state.name : "Desconhecido";
    },

    getModelImage(modelName) {
      const modelImageMap = {
        "Caminhão de carga": require("../assets/caminhao.png"),
        Harvester: require("../assets/escavadora.png"),
        "Garra traçadora": require("../assets/garra-de-escavadeira.png"),
      };

      return modelImageMap[modelName] || require("../assets/aiko.png");
    },

    formatDate(dateString) {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      };
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("pt-BR", options).format(date);
    },
  },
};
</script>



<style scoped>
#mapContainer {
  top: 0;
  left: 0;
  width: 100%;
  height: 75vh;
  z-index: 1;
}
.custom-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
