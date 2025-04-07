<template>
  <div class="Report-view">
    <h1>{{ $t("chart.charts") }}</h1>

    <ChartSelector v-model="selectedChart" />

    <BarChart v-if="selectedChart === 'bar'" />
    <PieChart v-else-if="selectedChart === 'pie'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BarChart from "@/views/Charts/Components/BarChart.vue";
import PieChart from "@/views/Charts/Components/PieChart.vue";
import ChartSelector from "@/views/Charts/Components/ChartSelector.vue";

const selectedChart = ref("bar");
</script>

<style scoped>
.Report-view {
  text-align: center;
  margin-top: 20px;
}

h1 {
  color: #333;
}

.chart-toggle {
  margin: 1rem 0;
}

select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
</style>
