<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  productivityData: { equipmentId: string; productivity: number } | null
}>()

const formatProductivity = (percent: number) => `${percent.toFixed(2)}%`
</script>

<template>
  <div v-if="productivityData">
    <h2>Productivity for Equipment ID: {{ productivityData.equipmentId }}</h2>
    <p>Productivity: {{ formatProductivity(productivityData.productivity) }}</p>
  </div>
</template>

<style scoped>

</style>
