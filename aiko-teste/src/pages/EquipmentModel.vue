<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          icon="arrow_back"
          color="white"
          @click="$router.push('/')"
        />
        <q-toolbar-title>Situação dos Equipamentos</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md bg-page">
        <div class="filter-container">
          <q-select
          bg-color="white"
            filled
            v-model="selectedModel"
            label="Filtrar por Modelo"
            :options="modelOptions"
            emit-value
            map-options
            rounded outlined
            clearable
            class="filter-select"
          />
        </div>

        <div class="card-container">
          <q-card
            v-for="model in filteredModels"
            :key="model.id"
            class="q-mb-md"
          >
            <q-card-section class="q-pa-md">
              <div class="text-h6 q-mb-sm">{{ model.name }}</div>
            </q-card-section>
            <q-expansion-item
              expand-separator
              class="rounded-borders"
              :label="model.name"
              dense
            >
              <template v-slot:header>
                <q-item class="q-mb-sm">
                  <q-item-section>
                    <span class="text-subtitle-h6">Ver equipamentos</span>
                  </q-item-section>
                </q-item>
              </template>
              <q-list>
                <q-item
                  v-for="equipment in filteredEquipments(model.id)"
                  :key="equipment.id"
                  class="equipment-item"
                  @click="goToAllEquipments(equipment.id)"
                >
                  <q-item-section @click="$router.push('/equipamentos')">
                    <span>{{ equipment.name }}</span>
                    <q-item-label>
                      Situação atual: 
                      <span
                        :style="{ color: getStateColor(equipment.currentStateId) }"
                      >
                        {{ getStateName(equipment.currentStateId) }}
                      </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const equipmentModels = ref([]);
const equipments = ref([]);
const equipmentStates = ref({});
const positionHistory = ref([]);
const selectedModel = ref(null);
const router = useRouter();

const fetchData = async () => {
  try {
    const [modelsResponse, equipmentsResponse, statesResponse, historyResponse] =
      await Promise.all([
        fetch("/data/equipmentModel.json").then((res) => res.json()),
        fetch("/data/equipment.json").then((res) => res.json()),
        fetch("/data/equipmentState.json").then((res) => res.json()),
        fetch("/data/equipmentStateHistory.json").then((res) => res.json()),
      ]);

    equipmentModels.value = modelsResponse;
    equipments.value = equipmentsResponse;
    equipmentStates.value = statesResponse.reduce((acc, state) => {
      acc[state.id] = state;
      return acc;
    }, {});
    positionHistory.value = historyResponse;

    equipments.value.forEach((equipment) => {
      const history = positionHistory.value.find(
        (h) => h.equipmentId === equipment.id
      );
      if (history && history.states.length > 0) {
        const lastState = history.states.reduce((prev, curr) =>
          new Date(prev.date) > new Date(curr.date) ? prev : curr
        );
        equipment.currentStateId = lastState.equipmentStateId;
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const modelOptions = computed(() =>
  equipmentModels.value.map((model) => ({
    label: model.name,
    value: model.id,
  }))
);

const filteredModels = computed(() => {
  if (!selectedModel.value) {
    return equipmentModels.value;
  }
  return equipmentModels.value.filter((model) => model.id === selectedModel.value);
});

const getStateName = (stateId) => {
  return equipmentStates.value[stateId]?.name || "Desconhecido";
};

const getStateColor = (stateId) => {
  return equipmentStates.value[stateId]?.color || "#000000";
};

const filteredEquipments = (modelId) => {
  return equipments.value.filter(
    (equipment) => equipment.equipmentModelId === modelId
  );
};

const goToAllEquipments = (equipmentId) => {
  router.push({ name: "AllEquipments", params: { equipmentId } });
};

onMounted(() => {
  fetchData();
});
</script>

<style src="../css/equipamentemodel.css"></style>
