<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          color="white"
          icon="arrow_back"
          @click="$router.push('/')"
        />
        <q-toolbar-title>Equipamentos Gerais</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md bg-page">
        <div class="list-container">
          <div class="equipment-list">
            <q-expansion-item
              v-for="equipamentoGerais in equipamentosGerais"
              :key="equipamentoGerais.id"
              class="equipment-item"
              :label="equipamentoGerais.name"
              :caption="'ID do equipamento: ' + equipamentoGerais.id"
              expand-separator
            >
              <br />
              <!-- Exibe o histórico de estados do equipamento -->
              <div v-if="positionHistory.length">
                <q-item-label class="text-subtitle1"
                  >Histórico de situações do equipamento:</q-item-label
                >
                <br />
                <q-list>
                  <q-item
                    v-for="(state, index) in getVisibleStates(
                      equipamentoGerais.id
                    )"
                    :key="index"
                    class="state-item"
                  >
                    <q-item-section>
                      <q-item-label class="text-subtitle2">
                        <span style="font-weight: 700">Data: </span
                        >{{ state.date }}
                      </q-item-label>
                      <span style="font-weight: 700">Situação: </span
                        >
                      <q-item-label
                        :style="{
                          color: getStateColor(state.equipmentStateId),
                        }"
                      >
                        {{ getStateName(state.equipmentStateId) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-btn
                  v-if="isShowMoreButtonVisible(equipamentoGerais.id)"
                  @click="showMoreStates(equipamentoGerais.id)"
                  label="Mostrar mais"
                  class="q-mt-md show-more-btn"
                />
              </div>
            </q-expansion-item>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const equipamentosGerais = ref([]);
const positionHistory = ref([]);
const equipmentStates = ref({});
const itemsToShow = ref(8);

const fetchData = async () => {
  try {
    const [equipmentsResponse, positionHistoryResponse, statesResponse] =
      await Promise.all([
        fetch("/data/equipment.json").then((res) => res.json()),
        fetch("/data/equipmentStateHistory.json").then((res) => res.json()),
        fetch("/data/equipmentState.json").then((res) => res.json()),
      ]);

    equipamentosGerais.value = equipmentsResponse;
    positionHistory.value = positionHistoryResponse;
    equipmentStates.value = statesResponse.reduce((acc, state) => {
      acc[state.id] = state;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getStateName = (stateId) => {
  return equipmentStates.value[stateId]?.name || "Desconhecido";
};

const getStateColor = (stateId) => {
  return equipmentStates.value[stateId]?.color || "#000000";
};

const getVisibleStates = (equipmentId) => {
  const equipmentHistory =
    positionHistory.value.find((p) => p.equipmentId === equipmentId)?.states ||
    [];
  return equipmentHistory.slice(0, itemsToShow.value);
};

const isShowMoreButtonVisible = (equipmentId) => {
  const equipmentHistory =
    positionHistory.value.find((p) => p.equipmentId === equipmentId)?.states ||
    [];
  return equipmentHistory.length > itemsToShow.value;
};

const showMoreStates = (equipmentId) => {
  itemsToShow.value += 8;
};

onMounted(() => {
  fetchData();
});
</script>

<style src="../css/allequipments.css"></style>
