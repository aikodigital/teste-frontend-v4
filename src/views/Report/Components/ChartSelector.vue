<template>
  <div class="chart-selector">
    <label for="chartSelect">Escolha o tipo de gráfico:</label>
    <select id="chartSelect" v-model="selected" @change="emitSelection">
      <option value="bar">Gráfico de Barras</option>
      <option value="pie">Gráfico de Pizza</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const selected = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    selected.value = newValue;
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function emitSelection(event: Event) {
  emit("update:modelValue", selected.value);
}
</script>

<style scoped>
.chart-selector {
  margin: 1rem 0;
}

select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
</style>
