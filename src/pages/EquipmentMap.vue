<template>
  <q-page padding>
    <div style="height: 88vh; width: 100%">
      <l-map :zoom="zoom" :center="center" :useGlobalLeaflet="false">
        <l-tile-layer :url="url" />
        <div v-if="positionHistories.length > 0">
          <l-marker
            v-for="equipment in equipments"
            :key="equipment.id"
            :lat-lng="[
              getLatestPosition(equipment).lat,
              getLatestPosition(equipment).lon,
            ]"
            :icon="getIconForEquipment(equipment)"
          >
            <l-popup>
              <div>
                <p>
                  {{ getEquipmentModelName(equipment) }} - {{ equipment.name }}
                </p>
                <p>Estado: {{ getCurrentState(equipment).name }}</p>
                <q-btn
                  size="md"
                  class="q-pa-sm"
                  icon="mdi-clipboard-clock-outline"
                  @click="selectEquipment(equipment)"
                >
                  <q-tooltip>Histórico</q-tooltip>
                </q-btn>
              </div>
            </l-popup>
          </l-marker>
        </div>
      </l-map>
    </div>

    <q-dialog v-model="dialogVisible" max-width="500px">
      <EquipmentDetails
        :equipment="selectedEquipment"
        :states="states"
        :history="getEquipmentHistory(selectedEquipment)"
      />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LPopup, LMarker } from "@vue-leaflet/vue-leaflet";
import EquipmentDetails from "./EquipmentDetails.vue";
import L from "leaflet";

const zoom = ref(5);
const center = ref([-19.126536, -45.947756]);
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const equipments = ref([]);
const states = ref([]);
const models = ref([]);
const stateHistories = ref([]);
const positionHistories = ref([]);
const selectedEquipment = ref(null);
const dialogVisible = ref(false);


const loadJson = async (filename) => {
  try {
    const response = await fetch(`/data/${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to load JSON:", error);
    throw error; // Re-throw error to be handled in mounted
  }
};

const getEquipmentModelName = (equipment) => {
  const model = models.value.find((m) => m.id === equipment.equipmentModelId);
  return model ? model.name : "Unknown Model";
};

const getLatestPosition = (equipment) => {
  console.log("histories", positionHistories.value);
  console.log("equipametno", equipment);
  const history = positionHistories.value.find(
    (h) => h.equipmentId === equipment.id
  );
  return history.positions[history.positions.length - 1];
};

const getCurrentState = (equipment) => {
  const history = stateHistories.value.find(
    (h) => h.equipmentId === equipment.id
  );
  const latestStateId =
    history.states[history.states.length - 1].equipmentStateId;
  return states.value.find((state) => state.id === latestStateId);
};

const getEquipmentHistory = (equipment) => {
  return stateHistories.value.find((h) => h.equipmentId === equipment.id);
};

const selectEquipment = (equipment) => {
  selectedEquipment.value = equipment;
  dialogVisible.value = true;
};

onMounted(async () => {
  equipments.value = await loadJson("equipment.json");
  states.value = await loadJson("equipmentState.json");
  models.value = await loadJson("equipmentModel.json");
  stateHistories.value = await loadJson("equipmentStateHistory.json");
  positionHistories.value = await loadJson("equipmentPositionHistory.json");
});
</script>
