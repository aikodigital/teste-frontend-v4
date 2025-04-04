<template>
  <div v-if="equipment" class="side-panel">
    <h3>{{ equipment.name }}</h3>
    <p>
      <strong>{{ $t("detailMap.stateActual") }}:</strong>
      {{ state?.name || "Desconhecido" }}
    </p>

    <h4>{{ $t("detailMap.stateHistory") }}</h4>
    <ul class="history-list">
      <li v-for="history in stateHistory" :key="history.date">
        <span class="state-dot" :style="{ background: history.color }"></span>
        {{ history.date }} - {{ history.name }}
      </li>
    </ul>

    <button @click="$emit('close')">Fechar</button>
  </div>
</template>

<script setup lang="ts">
import type { Equipment, EquipmentState } from "@/types/types";
import { defineProps, defineEmits } from "vue";

defineProps<{
  equipment: Equipment | null;
  state: EquipmentState | null;
  stateHistory: { date: string; name: string; color: string }[];
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<style scoped>
.side-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  border-left: 1px solid #ccc;
  padding: 1rem;
  z-index: 1000;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.history-list {
  list-style: none;
  padding: 0;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  margin-bottom: 1rem;
}

.history-list li {
  display: flex;
  align-items: center;
  padding: 4px 0;
}

.state-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}
</style>
