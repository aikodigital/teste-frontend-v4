<template>
  <form class="mx-auto" @submit.prevent>
    <label class="block !mb-2 text-lg text-gray-900 dark:text-white">Pesquisar</label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input v-model="searchQuery" @input="onSearch" @keydown.down.prevent="incrementSuggestionIndex"
        @keydown.up.prevent="decrementSuggestionIndex" @keydown.enter.prevent="selectSuggestion()"
        @focus="showSuggestions = true" @blur="hideSuggestions" type="text" placeholder="Buscar equipamento..."
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500" />
      <div v-if="filteredSuggestions.length && searchQuery && showSuggestions"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
        <ul class="py-1">
          <li v-for="(suggestion, index) in filteredSuggestions" :key="suggestion.id"
            :class="['px-4 py-2 hover:bg-gray-100 cursor-pointer', { 'bg-gray-100': index === selectedIndex }]"
            @click="selectSuggestion(suggestion)">
            {{ suggestion.name }}
          </li>
        </ul>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useEquipmentStore } from '../stores/equipment.js'

const searchQuery = ref('')
const selectedIndex = ref(-1)
const showSuggestions = ref(true)
const equipmentStore = useEquipmentStore()

const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return []
  return equipmentStore.equipments
    .filter(equipment =>
      equipment.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .slice(0, 5) // Limita a 5 sugestões
})

// Navegação pelo teclado
function incrementSuggestionIndex() {
  if (selectedIndex.value < filteredSuggestions.value.length - 1) {
    selectedIndex.value++
  }
}

function decrementSuggestionIndex() {
  if (selectedIndex.value > -1) {
    selectedIndex.value--
  }
}

function selectSuggestion(suggestion) {
  // Se uma sugestão foi clicada
  if (typeof suggestion === 'object') {
    searchQuery.value = suggestion.name
    equipmentStore.searchEquipment(suggestion.name)
  } else {
    // Se Enter foi pressionado sem navegação ativa
    if (selectedIndex.value >= 0) {
      const selectedSuggestion = filteredSuggestions.value[selectedIndex.value]
      searchQuery.value = selectedSuggestion.name
      equipmentStore.searchEquipment(selectedSuggestion.name)
    } else {
      // Sem sugestão selecionada, pesquisa pelo texto digitado
      equipmentStore.searchEquipment(searchQuery.value)
    }
  }
  selectedIndex.value = -1 // Reseta a seleção
  showSuggestions.value = false // Esconde as sugestões após seleção
}

let searchTimeout = null
function onSearch() {
  selectedIndex.value = -1 // Reseta seleção a cada nova digitação
  showSuggestions.value = true // Mostra sugestões ao digitar
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    console.log('Performing search for:', searchQuery.value)
    equipmentStore.searchEquipment(searchQuery.value)
  }, 300)
}

function hideSuggestions() {
  // Delay para permitir cliques em sugestões antes de esconder
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

// Limpeza no unmount
onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
})

// Sincroniza com a store caso o searchQuery seja alterado lá
watch(() => equipmentStore.searchQuery, (newQuery) => {
  if (newQuery !== searchQuery.value) {
    searchQuery.value = newQuery
  }
}, { immediate: true })
</script>

<style scoped>
.suggestions-enter-active,
.suggestions-leave-active {
  transition: opacity 0.2s ease;
}

.suggestions-enter-from,
.suggestions-leave-to {
  opacity: 0;
}
</style>
