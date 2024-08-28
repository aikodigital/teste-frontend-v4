<script setup lang="ts">
import type EquipmentFilters from '~/types/EquipmentFilters';
import type EquipmentModel from '~/types/EquipmentModel';
import type EquipmentState from '~/types/EquipmentState';

interface SearchBarProps {
  filters: EquipmentFilters
  models: EquipmentModel[]
  states: EquipmentState[]
}

interface SelectOption {
  label: string
  value: string
}

const props = defineProps<SearchBarProps>()
const emit = defineEmits(['search'])

const filters = ref<EquipmentFilters>(props.filters)

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
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  background-color: var(--container-color);
  border-radius: 4px;
  column-gap: 16px;
  padding: 16px;
  align-items: center;

  .search-bar-input {
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
