<template>
  <div>
    <h2>Equipment History</h2>
    <div v-if="history">
      <p><strong>Equipment:</strong> {{ history.equipmentId }}</p>
      <ul>
        <li v-for="entry in history.states" :key="entry.date">
          {{ entry.date }} - {{ getStateName(entry.equipmentStateId) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const history = ref<any>(null);

function getStateName(id: string) {
  return store.state.equipmentState.find((s: any) => s.id === id)?.name || 'Unknown';
}

function setHistory(equipmentId: string) {
  history.value = store.state.equipmentStateHistory.find((h: any) => h.equipmentId === equipmentId);
}

</script>
