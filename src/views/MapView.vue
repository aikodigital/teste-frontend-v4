<template>
  <v-container>
    <EquipmentHistoryDialog
      v-model:modelValue="dialogVisible"
      :selectedEquipment="selectedEquipment"
      :selectedEquipmentHistory="selectedEquipmentHistory"
    />

    <LogoAiko />

    <v-row class="mt-2">
      <v-col>
        <v-text-field
          v-model="search"
          label="Pesquisar Equipamento"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select
          v-model="selectedStatus"
          :items="statusOptions"
          item-title="name"
          item-value="id"
          label="Filtrar por estado atual"
          variant="outlined"
          clearable
          :disabled="selectedModel !== null"
        />
      </v-col>
      <v-col>
        <v-select
          v-model="selectedModel"
          :items="modelOptions"
          item-title="name"
          item-value="id"
          label="Filtrar por modelo de equipamento"
          variant="outlined"
          clearable
          :disabled="selectedStatus !== null"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="10">
        <GoogleMap
          :api-key="apiKey"
          style="width: 100%; height: 600px"
          :center="mapCenter"
          :zoom="11"
          :max-zoom="12"
          :min-zoom="10"
          :disable-default-ui="true"
          :zoom-control="true"
          :no-clear="false"
          :keyboard-shortcuts="false"
        >
          <CustomMarker
            v-for="(equipment, index) in filteredEquipmentPositions"
            :key="index"
            :options="{ position: equipment.position }"
            @click="openEquipmentHistory(equipment)"
          >
            <div class="text-center">
              <v-icon
                :icon="modelStore.getModelIcon(equipment.modelId)"
                :color="equipment.statusColor"
                size="40px"
              />
              <p class="font-weight-bold">{{ equipment.name }}</p>
            </div>
          </CustomMarker>
        </GoogleMap>
      </v-col>

      <v-col cols="2">
        <LegendaMapa />
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { GoogleMap, CustomMarker } from 'vue3-google-map';
import LogoAiko from '@/components/LogoAiko.vue';
import EquipmentHistoryDialog from '@/components/EquipmentHistoryDialog.vue';
import LegendaMapa from '@/components/LegendaMapa.vue';
import { useEquipmentStore } from '@/stores/EquipmentStore';
import { useModelStore } from '@/stores/ModelStore';

const apiKey = import.meta.env.VITE_API_KEY_GOOGLE;
const mapCenter = ref({ lat: -19.126536, lng: -45.947756 });
const dialogVisible = ref(false);
const selectedEquipment = ref(null);
const selectedEquipmentHistory = ref([]);
const search = ref('');
const selectedStatus = ref<string | null>(null);
const selectedModel = ref<string | null>(null);

const modelStore = useModelStore()
const equipmentStore = useEquipmentStore();

const modelOptions = computed(() => modelStore.modelOptions);
const statusOptions = computed(() => equipmentStore.statusOptions);

const filteredEquipmentPositions = computed(() =>
  equipmentStore.getFilteredEquipmentPositions(search.value, selectedStatus.value, selectedModel.value)
);

const openEquipmentHistory = (equipment) => {
  selectedEquipment.value = equipment;
  selectedEquipmentHistory.value = equipmentStore.getEquipmentHistoryById(equipment.id);
  dialogVisible.value = true
};
</script>
