<script setup lang="ts">
import type EquipmentListFilters from '~/types/EquipmentListFilters';
import type EquipmentModel from '~/types/EquipmentModel';
import type EquipmentState from '~/types/EquipmentState';

interface SearchBarProps {
  filters: EquipmentListFilters
  models: EquipmentModel[]
  states: EquipmentState[]
}

interface SelectOption {
  label: string
  value: string
}

const props = defineProps<SearchBarProps>()
const emit = defineEmits(['search'])

const filters = ref<EquipmentListFilters>(props.filters)

const modelOptions = computed<SelectOption[]>(() => props.models.map(model => ({ label: model.name, value: model.id })))
const stateOptions = computed<SelectOption[]>(() => props.states.map(state => ({ label: state.name, value: state.id })))
</script>

<template>
  <div id="search-bar-container">
    <div class="search-bar-input">
      <label for="equipment">Equipamento</label>
      <input id="equipment" v-model="filters.equipment" placeholder="Nome do equipamento" />
    </div>
    <div class="search-bar-input">
      <label for="model">Modelo</label>
      <select id="model" v-model="filters.model">
        <option class="option-none" value="">Todos</option>
        <option v-for="option in modelOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <div class="search-bar-input">
      <label for="model">Estado</label>
      <select v-model="filters.state">
        <option class="option-none" value="">Todos</option>
        <option v-for="option in stateOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
#search-bar-container {
  display: flex;
  flex-wrap: wrap;
  background-color: var(--container-color);
  border-radius: 4px;
  gap: 16px;
  padding: 16px;
  align-items: center;

  .search-bar-input {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 4px;

    label {
      color: var(--primary-color);
      font-size: 12px;
      font-weight: bold;
      margin-left: 1px;
    }

    input, select {
      background-color: white;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 8px;
      outline: none;

      &:focus {
        border: 1px solid var(--primary-color);
      }
    }
  }
}
</style>
