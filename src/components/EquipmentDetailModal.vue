<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import equipmentStateHistory from '../data/equipmentStateHistory.json'
import equipmentState from '../data/equipmentState.json'
import equipmentModel from '../data/equipmentModel.json'

const props = defineProps({
  equipmentId: String,
  isModalActive: Boolean,
  equipment: Object

})

const emit = defineEmits(['update:isModalActive'])

const statesHistory = computed(() => {
  const history = equipmentStateHistory.find((e: any) => e.equipmentId === props.equipmentId)
  return history ? history.states : []
})
const getModelName = (modelId: string) => {
  const model = equipmentModel.find((m: any) => m.id === modelId)
  return model ? model.name : 'Desconhecido'
}

const getStateName = (stateId: string) => {
  const state = equipmentState.find((s: any) => s.id === stateId)
  return state ? state.name : 'Desconhecido'
}

const closeModal = () => {
  emit('update:isModalActive', false)
}
</script>
<template>
  <div class="modal" :class="{ 'is-active': isModalActive }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="detail-container">
        <h2>Histórico de Estados para o Equipamento</h2>
        <table class="table">
          <thead>
            <tr>
              <th class="has-text-centered">Data</th>
              <th class="has-text-centered">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="state in statesHistory" :key="state.date">
              <td>{{ new Date(state.date).toLocaleDateString() }}</td>
              <td>{{ getStateName(state.equipmentStateId) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>
<style scoped lang="scss">
.detail-container {
  padding: 40px;
  background-color: white;
}
.modal.is-active {
  z-index: 1050;
}

.modal-background {
  background-color: rgba(0, 0, 0, 0.5); 
}
.table is-striped tr {
  border-color: #B0B0B0; 
}

.table-striped-row-even-hover-background-color {
      width: 100%;
      border-collapse: collapse;
      
    }
    .table-striped-row-even-hover-background-color th,
    .table-striped-row-even-hover-background-color td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    .table-striped-row-even-hover-background-color tbody tr:nth-child(even):hover {
      background-color: #b25252; /* Cor de fundo ao passar o mouse */
    }
    .table-striped-row-even-hover-background-color tbody tr:nth-child(even) {
      background-color: #a48d8d; /* Cor de fundo para linhas pares */
    }
    
</style>
