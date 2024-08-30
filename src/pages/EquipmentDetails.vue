<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ equipment.name }}</div>
      <q-separator spaced />
      <div>
        <div v-for="state in history.states" :key="state.date">
          <p>{{ formatDate(state.date) }} - Estado: {{ getStateName(state.equipmentStateId) }}</p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  equipment: Object,
  states: Array,
  history: Object
});

const getStateName = (stateId) => {
  const state = props.states.find(s => s.id === stateId);
  return state ? state.name : "Desconhecido";
};

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};
</script>
