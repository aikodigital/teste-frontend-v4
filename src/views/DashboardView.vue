<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-md-3">
        <FiltersPanel 
          v-model:selectedStates="selectedStates"
          v-model:selectedModels="selectedModels"
          :equipmentStates="equipmentStates"
          :equipmentModels="equipmentModels"
          @search="handleSearch"
        />
        
        <ProductivityStats 
          v-if="filteredEquipment.length > 0"
          :equipmentList="filteredEquipment"
          class="mt-3"
        />
      </div>
      
      <div class="col-md-9">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Mapa de equipamentos</h5>
            <div class="d-flex gap-2">
              <button 
                class="btn btn-sm btn-outline-secondary"
                @click="showAllEquipment"
              >
                Limpar visualização
              </button>
              <button 
                class="btn btn-sm btn-success"
                @click="centerMap"
              >
                Centralizar Mapa
              </button>
            </div>
          </div>
          <div class="card-body p-0" style="height: 100vh;">
            <EquipmentMap 
              ref="mapRef"
              :equipmentList="filteredEquipment"
              @marker-click="handleMarkerClick"
            />
          </div>
        </div>
      </div>
    </div>

    <EquipmentHistoryModal 
      v-if="selectedEquipment"
      :equipment="selectedEquipment"
      @close="selectedEquipment = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useEquipmentStore } from '@/stores/equipmentStore';
import FiltersPanel from '@/components/FiltersPanel.vue';
import EquipmentMap from '@/components/EquipmentMap.vue';
import ProductivityStats from '@/components/ProductivityStats.vue';
import EquipmentHistoryModal from '@/components/EquipmentHistoryModal.vue';
import type { Equipment } from '@/models';

const store = useEquipmentStore();
const mapRef = ref<InstanceType<typeof EquipmentMap> | null>(null);
const selectedEquipment = ref<Equipment | null>(null);
const selectedStates = ref<string[]>([]);
const selectedModels = ref<string[]>([]);
const searchQuery = ref('');

onMounted(() => {
  store.fetchEquipmentData();
});

const filteredEquipment = computed(() => {
  return store.equipmentWithDetails.filter(equipment => {
    if (selectedStates.value.length > 0 && equipment.latestState) {
      if (!selectedStates.value.includes(equipment.latestState.id)) {
        return false;
      }
    }
    
    if (selectedModels.value.length > 0) {
      if (!selectedModels.value.includes(equipment.equipmentModelId)) {
        return false;
      }
    }
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      if (!equipment.name.toLowerCase().includes(query) && 
          !equipment.model?.name.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    return true;
  });
});

function handleMarkerClick(equipment: Equipment) {
  selectedEquipment.value = equipment;
}

function handleSearch(query: string) {
  searchQuery.value = query;
}

function centerMap() {
  if (mapRef.value) {
    mapRef.value.centerMap();
  }
}

function showAllEquipment() {
  selectedStates.value = [];
  selectedModels.value = [];
  searchQuery.value = '';
  centerMap();
}

const equipmentStates = computed(() => store.equipmentStates);
const equipmentModels = computed(() => store.equipmentModels);
</script>