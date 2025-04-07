<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Produtividade</h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <h6>Estado de operação</h6>
          <div class="chart-container">
            <canvas ref="stateChart"></canvas>
          </div>
        </div>
        <div class="col-12 mt-3">
          <h6>Contagem de equipamentos</h6>
          <div class="chart-container">
            <canvas ref="modelChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import type { Equipment } from '@/models';

const props = defineProps({
  equipmentList: {
    type: Array as () => Equipment[],
    required: true
  }
});

const stateChart = ref<HTMLCanvasElement | null>(null);
const modelChart = ref<HTMLCanvasElement | null>(null);
let stateChartInstance: Chart | null = null;
let modelChartInstance: Chart | null = null;

onMounted(() => {
  updateCharts();
});

watch(() => props.equipmentList, updateCharts, { deep: true });

function updateCharts() {
  if (!stateChart.value || !modelChart.value) return;
  
  if (stateChartInstance) stateChartInstance.destroy();
  if (modelChartInstance) modelChartInstance.destroy();
  
  const stateCounts: Record<string, number> = {};
  props.equipmentList.forEach(equipment => {
    const stateName = equipment.latestState?.name || 'Unknown';
    stateCounts[stateName] = (stateCounts[stateName] || 0) + 1;
  });
  
  const modelCounts: Record<string, number> = {};
  props.equipmentList.forEach(equipment => {
    const modelName = equipment.model?.name || 'Unknown';
    modelCounts[modelName] = (modelCounts[modelName] || 0) + 1;
  });
  
  stateChartInstance = new Chart(stateChart.value, {
    type: 'doughnut',
    data: {
      labels: Object.keys(stateCounts),
      datasets: [{
        data: Object.values(stateCounts),
        backgroundColor: [
          '#2ecc71', 
          '#e74c3c', 
          '#f39c12', 
          '#95a5a6' 
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
  
  modelChartInstance = new Chart(modelChart.value, {
    type: 'doughnut',
    data: {
      labels: Object.keys(modelCounts),
      datasets: [{
        label: 'Total',
        data: Object.values(modelCounts),
        backgroundColor: [
          '#2ecc71', 
          '#198754', 
          '#6F9684'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      } 
    }
  });
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 200px;
}
</style>