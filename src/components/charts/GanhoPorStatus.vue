<template>
  <div class="Grafico">
    <BarChart :chartData="chartDataBar" :options="chartOptionsBar" />
  </div>
</template>

<style scoped>
.Grafico {
  flex: 1;
}
</style>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import type { Equipamento, GanhosPorStatus, HorasPorStatus } from '@/types/Equipamento'
import { useCorStore } from '@/stores/cor'
import { BarChart } from 'vue-chart-3'
import { Chart, registerables, type ChartData } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  equipamento: {
    type: Object as PropType<Equipamento>,
    required: true,
  },
  horasPorStatus: {
    type: Object as PropType<HorasPorStatus>,
    required: true,
  },
  ganhosPorStatus: {
    type: Object as PropType<GanhosPorStatus>,
    required: true,
  },
})

const corStore = useCorStore()

const chartDataBar = computed<ChartData<'bar', number[], string>>(() => ({
  labels: Object.keys(props.ganhosPorStatus),
  datasets: [
    {
      data: Object.values(props.ganhosPorStatus),
      backgroundColor: Object.keys(props.ganhosPorStatus).map((k) => corStore.obterCorPorStatus(k)),
      borderRadius: 8,
    },
  ],
}))

const chartOptionsBar = ref({
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Ganho por status',
      font: { size: 16 },
      color: '#3F292C',
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Ganho',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Status',
      },
    },
  },
  animation: {
    animateScale: true,
    animateRotate: true,
  },
})
</script>
