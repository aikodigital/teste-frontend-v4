<template>
  <div>
    <HistoryDialog v-model:modelValue="dialogVisible" :selectedEquipment="selectedEquipment"
      :selectedEquipmentHistory="selectedEquipmentHistory" />

    <h1>Teste Front-End</h1>

    <div class="row">
      <div class="col align-content-center">
        <GoogleMap :api-key="apiKey" style="width: 800px; height: 600px" :center="mapCenter" :zoom="11" :max-zoom="12"
          :min-zoom="10" :disable-default-ui="true" :zoom-control="true" :no-clear="false" :keyboard-shortcuts="false">
          <CustomMarker v-for="(equipment, index) in filteredEquipmentPositions" :key="index"
            :options="{ position: equipment.position }" @click="openEquipmentHistory(equipment)">
            <div class="text-center">
              <i class="fas fa-2x" :class="models.getModelIcon(equipment.modelId)"
                :style="{ color: equipment.statusColor }"></i>
              <p class="font-weight-bold" style="color: black;">{{ equipment.name }}</p>
            </div>
          </CustomMarker>
        </GoogleMap>
      </div>

      <div class="col extraDiv">
        <div class="row mb-3">
          <label for="search">Pesquisar Equipamento</label>
          <input id="search" type="text" v-model="search" placeholder="Pesquisar Equipamento"
            class="text-field form-control" />
        </div>

        <div class="row mb-3">
          <label for="Filtro">Filtrar por Estado</label>
          <select id="statusSelect" class="form-control" v-model="selectedStatus" aria-placeholder="Selecionar Estado">
            <option value="" selected>Selecionar Estado</option>
            <option v-for="status in statusOptions" :key="status.id" :value="status.id">
              {{ status.name }}
            </option>
          </select>
        </div>

        <div class="row mb-3">
          <label for="Filtro">Filtrar por Modelo</label>
          <select id="modelSelect" class="form-control" v-model="selectedModel">
            <option value="" selected>Selecionar Modelo</option>
            <option v-for="model in modelOptions" :key="model.id" :value="model.id">
              {{ model.name }}
            </option>
          </select>
        </div>

        <button @click="clearFilters" class="btnModel">Limpar Filtros</button>

        <hr>

        <div class="col">
          <h4>Legenda</h4>
          <div class="row mt-5">
            <div class="col text-center">
              <i class="fa fa-truck fa-3x mb-1" style="color: #2ecc71;"></i>
              <i class="fa fa-tractor fa-3x mb-1" style="color: #2ecc71;"></i>
              <i class="fa fa-wrench fa-3x mb-1" style="color: #2ecc71;"></i>
              <p>Operando</p>
            </div>

            <div class="col">
              <i class="fa fa-truck fa-3x mb-1" style="color: #f1c40f;"></i>
              <i class="fa fa-tractor fa-3x mb-1" style="color: #f1c40f;"></i>
              <i class="fa fa-wrench  fa-3x mb-1" style="color: #f1c40f;"></i>
              <p>Parado</p>
            </div>

            <div class="col">
              <i class="fa fa-truck fa-3x mb-1" style="color: #e74c3c;"></i>
              <i class="fa fa-tractor fa-3x mb-1" style="color: #e74c3c;"></i>
              <i class="fa fa-wrench fa-3x mb-1" style="color: #e74c3c;"></i>
              <p>Manutenção</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { GoogleMap, CustomMarker } from 'vue3-google-map';
import HistoryDialog from '../components/HistoryDialog.vue';
import { getEquipments } from '../services/Equipments.ts';
import { getModels } from '../services/Models';

const apiKey = import.meta.env.VITE_GOGGLE_API_KEY;
const mapCenter = ref({ lat: -19.126536, lng: -45.947756 });
const dialogVisible = ref(false);
const selectedEquipment = ref(null);
const selectedEquipmentHistory = ref([]);
const search = ref('');
const selectedStatus = ref<string | null>(null);
const selectedModel = ref<string | null>(null);

const models = getModels()
const equipments = getEquipments();

const modelOptions = computed(() => models.modelOptions);
const statusOptions = computed(() => equipments.statusOptions);

const filteredEquipmentPositions = computed(() =>
  equipments.getFilteredEquipmentPositions(search.value, selectedStatus.value, selectedModel.value)
);

const clearFilters = () => {
  search.value = '';
  selectedStatus.value = '';
  selectedModel.value = '';
}

const openEquipmentHistory = (equipment) => {
  selectedEquipment.value = equipment;
  selectedEquipmentHistory.value = equipments.getEquipmentHistory(equipment.id);
  dialogVisible.value = true
};
</script>

<style scoped>
.extraDiv {
  border: 2px solid black;
  padding: 32px;
}
</style>
