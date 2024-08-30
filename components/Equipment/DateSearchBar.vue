<script setup lang="ts">
import type EquipmentDateFilters from '~/types/EquipmentDateFilters';

interface SearchBarProps {
  filters: EquipmentDateFilters
}

const props = defineProps<SearchBarProps>()
const emit = defineEmits(['search'])

const filters = ref<EquipmentDateFilters>(props.filters)
</script>

<template>
  <div id="search-bar-container">
    <div class="search-bar-input">
      <label for="dateStart">Do início do dia</label>
      <input id="dateStart" type="date" v-model="filters.start" onkeydown="return false" />
    </div>
    <div class="search-bar-input">
      <label for="dateEnd">Até o fim do dia</label>
      <input id="dateEnd" type="date" v-model="filters.end" onkeydown="return false" />
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

    input {
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
