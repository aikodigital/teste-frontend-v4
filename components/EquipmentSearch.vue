<template>
  <div class="relative">
    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
    <InputText
      v-model="searchQuery"
      placeholder="Pesquisar equipamento"
      @input="applySearch"
       class="pl-10 lg:w-96 w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'

const store = useEquipmentStore()
const searchQuery = ref('')

function applySearch() {
  store.setSearchQuery(searchQuery.value)
}
</script>