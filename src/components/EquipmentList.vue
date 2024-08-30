<script setup lang="ts">
import { ref, computed } from 'vue'
import { defineEmits } from 'vue'
import equipmentData from '../data/equipment.json'
import equipmentModel from '../data/equipmentModel.json'
import equipmentState from '../data/equipmentState.json'
import equipmentStateHistory from '../data/equipmentStateHistory.json'
import EquipmentDetailModal from './EquipmentDetailModal.vue'

const isModalActive = ref(false)
const selectedEquipmentId = ref('')
const searchQuery = ref('')
const selectedStateFilter = ref('')
const selectedModelFilter = ref('')

// Controle do dropdown
const isFilterDropdownOpen = ref(false)

const toggleDropdown = () => {
  isFilterDropdownOpen.value = !isFilterDropdownOpen.value
}

// Configurações de paginação
const pageSize = 4
const currentPage = ref(1)

const filteredEquipmentList = computed(() => {
  let filteredList = equipmentData

  // Filtra por estado
  if (selectedStateFilter.value) {
    filteredList = filteredList.filter((equipment) => {
      const stateHistory = equipmentStateHistory.find(
        (history) => history.equipmentId === equipment.id
      )
      if (stateHistory && stateHistory.states.length > 0) {
        const latestStateId = stateHistory.states[stateHistory.states.length - 1].equipmentStateId
        return latestStateId === selectedStateFilter.value
      }
      return false
    })
  }

  // Filtra por modelo
  if (selectedModelFilter.value) {
    filteredList = filteredList.filter(
      (equipment) => equipment.equipmentModelId === selectedModelFilter.value
    )
  }

  // Pesquisa
  if (searchQuery.value) {
    filteredList = filteredList.filter((equipment) =>
      equipment.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filteredList
})

const paginatedEquipmentList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredEquipmentList.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredEquipmentList.value.length / pageSize)
})

// Funções de navegação
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const getModelName = (modelId: string) => {
  const model = equipmentModel.find((m) => m.id === modelId)
  return model ? model.name : 'Desconhecido'
}
const getCurrentState = (equipmentId: string) => {
  const stateHistory = equipmentStateHistory.find((history) => history.equipmentId === equipmentId)
  if (stateHistory && stateHistory.states.length > 0) {
    const latestStateId = stateHistory.states[stateHistory.states.length - 1].equipmentStateId
    return equipmentState.find((s) => s.id === latestStateId) || { name: 'Desconhecido', color: '' }
  }
  return { name: 'Desconhecido', color: '' }
}

const handleShowHistory = (equipmentId: string) => {
  selectedEquipmentId.value = equipmentId
  isModalActive.value = true
}

// Computa os estados e modelos únicos para os filtros
const uniqueStates = computed(() => {
  return [
    ...new Set(
      equipmentStateHistory.flatMap((history) =>
        history.states.map((state) => state.equipmentStateId)
      )
    )
  ]
    .map((id) => equipmentState.find((state) => state.id === id))
    .filter((state) => state !== undefined)
})

const uniqueModels = computed(() => {
  return [...new Set(equipmentData.map((equipment) => equipment.equipmentModelId))]
    .map((id) => equipmentModel.find((model) => model.id === id))
    .filter((model) => model !== undefined)
})

const emit = defineEmits(['request-details'])
const requestDetails = (equipmentId: string | null) => {
  if (equipmentId) {
    emit('request-details', equipmentId)
  } else {
    console.error('equipmentId está undefined')
    emit('request-details', null)
  }
}
</script>
<template>
  <div class="filters">
    <div class="search">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Pesquisar por nome do equipamento..."
        class="search-input"
      />
    </div>
  </div>
  <div class="filter-dropdown">
    <button @click="toggleDropdown" class="filter-button is-size-6">
      <span><i class="fa-solid fa-filter fa-sm"></i></span> Filtro
    </button>
    <transition name="fade">
      <div v-if="isFilterDropdownOpen" class="filter-menu box">
        <div class="columns">
          <div class="column is-narrow has-text-right is-size-6">
            <div>
              <label class="label is-size-6">Estado Atual:</label>
            </div>
            <div>
              <label class="label is-size-6 mt-1">Modelo:</label>
            </div>
          </div>
          <div class="column">
            <div class="has-text-left">
              <select id="state-filter" v-model="selectedStateFilter">
                <option value="">Todos</option>
                <option v-for="state in uniqueStates" :key="state.id" :value="state.id">
                  {{ state.name }}
                </option>
              </select>
            </div>
            <div class="mt-4 has-text-left">
              <select id="model-filter" v-model="selectedModelFilter">
                <option value="">Todos</option>
                <option v-for="model in uniqueModels" :key="model.id" :value="model.id">
                  {{ model.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Modelo</th>
          <th>Estado Atual</th>
          <th>Histórico</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="equipment in paginatedEquipmentList" :key="equipment.id">
          <td>{{ equipment.name }}</td>
          <td>{{ getModelName(equipment.equipmentModelId) }}</td>
          <td :style="{ color: getCurrentState(equipment.id).color }">
            {{ getCurrentState(equipment.id).name }}
          </td>
          <td>
            <button @click="handleShowHistory(equipment.id)" class="button is-info">
              <i class="fa-solid fa-list" style="color: #cfcfcf"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <EquipmentDetailModal
      :equipmentId="selectedEquipmentId"
      :isModalActive="isModalActive"
      @update:isModalActive="isModalActive = $event"
    />
  </div>

  <div class="pagination-controls">
    <button @click="prevPage" :disabled="currentPage === 1">
      <i class="fa-solid fa-angles-left"></i>
    </button>
    <span>Página {{ currentPage }} de {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      <i class="fa-solid fa-angles-right"></i>
    </button>
  </div>
</template>

<style scoped lang="scss">
.filter-button {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.filter-menu {
  margin-top: 0.5rem;
  padding: 1rem;
  background-color: #f2f0f0;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.filter-group {
  margin-bottom: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.search {
  margin-top: 10px;
}

.search-input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
