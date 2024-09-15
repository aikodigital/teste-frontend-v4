<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          color="white"
          @click="$router.push('/')"
        />
        <q-toolbar-title>Localização dos equipamentos</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md bg-page">
        <div class="map-wrapper">
          <div id="map" class="map-container"></div>
        </div>

        <!-- Diálogo para o histórico de posições -->
        <q-dialog v-model="dialogOpen">
  <q-card class="dialog-card">
    <!-- Seção do cabeçalho -->
    <q-card-section class="dialog-header">
      <div class="text-h6 dialog-title">
        Histórico de Posições - {{ selectedEquipmentName }}
      </div>
    </q-card-section>

    <!-- Seção de conteúdo com a lista -->
    <q-card-section class="dialog-content">
      <q-list bordered class="position-list">
        <q-item
          v-for="pos in selectedEquipmentHistory"
          :key="pos.date"
          class="position-item"
        >
          <q-item-section>
            <div><strong>Data:</strong> {{ pos.date }}</div>
            <div><strong>Latitude:</strong> {{ pos.lat }}</div>
            <div><strong>Longitude:</strong> {{ pos.lon }}</div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <!-- Seção com o botão de fechar -->
    <q-card-actions align="right" class="dialog-actions">
      <q-btn
        flat
        label="Fechar"
        @click="dialogOpen = false"
        class="close-button"
      />
    </q-card-actions>
  </q-card>
</q-dialog>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const map = ref(null);
const equipmentData = ref([]);
const positionData = ref([]);
const dialogOpen = ref(false);
const selectedEquipmentHistory = ref([]);
const selectedEquipmentName = ref(""); // Nome do equipamento selecionado
const router = useRouter();

const initializeMap = () => {
  map.value = L.map("map").setView([-18.5122, -44.555], 7);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
    map.value
  );
};

const openHistoryDialog = (equipmentName, positions) => {
  selectedEquipmentName.value = equipmentName; // Atualiza o nome do equipamento
  selectedEquipmentHistory.value = positions;
  dialogOpen.value = true;
};

const updateMapWithLatestPositions = () => {
  positionData.value.forEach((entry) => {
    const equipment = equipmentData.value.find(
      (e) => e.id === entry.equipmentId
    );
    if (equipment) {
      const latestPosition = entry.positions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )[0];
      if (latestPosition) {
        const marker = L.marker([latestPosition.lat, latestPosition.lon])
          .bindPopup(
            `
            <div class="info-popup">
              <img 
                src="https://via.placeholder.com/150?text=Imagem+do+equipamento" 
                alt="Imagem do equipamento"
                class="florestal-image" 
              />
              <br>
              <b class="nome-equipamento">Nome: ${equipment.name}</b><br>
              <span class="ultima-posicao">Data da última posição: ${latestPosition.date}</span><br>
              <a href="#" class="open-history">Ver histórico de posições</a>
            </div>
            `
          )
          .addTo(map.value);

        marker.on("popupopen", () => {
          const link = document.querySelector(".open-history");
          link.addEventListener("click", (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            openHistoryDialog(equipment.name, entry.positions); // Envia o nome e as posições
          });
        });
      }
    }
  });
};

const loadData = async () => {
  try {
    const equipmentResponse = await fetch("/data/equipment.json");
    equipmentData.value = await equipmentResponse.json();

    const positionResponse = await fetch("/data/equipmentPositionHistory.json");
    positionData.value = await positionResponse.json();

    updateMapWithLatestPositions();
  } catch (error) {
    console.error("Erro ao carregar os dados", error);
  }
};

onMounted(() => {
  initializeMap();
  loadData();
});
</script>

<style src="../css/equipamenteposition.css"></style>
