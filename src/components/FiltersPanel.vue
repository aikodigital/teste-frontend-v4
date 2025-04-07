<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Filtro</h5>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <label class="form-label">Pesquisar equipamento</label>
        <div class="input-group">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Nome ou modelo..."
            v-model="searchInput"
            @keyup.enter="handleSearch"
          >
          <button class="btn btn-outline-secondary" @click="handleSearch">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
      
      <div class="mb-3">
        <label class="form-label">Filtrar por estado</label>
        <select class="form-select" v-model="selectedStates" multiple>
          <option v-for="state in equipmentStates" :key="state.id" :value="state.id">
            {{ state.name }}
          </option>
        </select>
      </div>
      
      <div class="mb-3">
        <label class="form-label">Filtrar por modelo</label>
        <select class="form-select" v-model="selectedModels" multiple>
          <option v-for="model in equipmentModels" :key="model.id" :value="model.id">
            {{ model.name }}
          </option>
        </select>
      </div>
      
      <button class="btn btn-outline-success w-100" @click="resetFilters">
        Limpar filtros
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { EquipmentState, EquipmentModel } from '@/models';

const props = defineProps({
  equipmentStates: {
    type: Array as () => EquipmentState[],
    required: true
  },
  equipmentModels: {
    type: Array as () => EquipmentModel[],
    required: true
  }
});

const emit = defineEmits(['update:selectedStates', 'update:selectedModels', 'search']);

const selectedStates = ref<string[]>([]);
const selectedModels = ref<string[]>([]);
const searchInput = ref('');

watch(selectedStates, (newVal) => {
  emit('update:selectedStates', newVal);
});

watch(selectedModels, (newVal) => {
  emit('update:selectedModels', newVal);
});

function handleSearch() {
  emit('search', searchInput.value);
}

function resetFilters() {
  selectedStates.value = [];
  selectedModels.value = [];
  searchInput.value = '';
  emit('search', '');
}
</script>