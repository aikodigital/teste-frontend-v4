<template>
  <div class="Grafico">
    <DoughnutChart :chartData="chartDataDoughnut" :options="chartOptionsDoughnut" />
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
import { DoughnutChart } from 'vue-chart-3'
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
})

const corStore = useCorStore()

const chartDataDoughnut = computed<ChartData<'doughnut', number[], string>>(() => ({
  labels: Object.keys(props.horasPorStatus),
  datasets: [
    {
      data: Object.values(props.horasPorStatus),
      backgroundColor: Object.keys(props.horasPorStatus).map((k) => corStore.obterCorPorStatus(k)),
      borderRadius: 8,
    },
  ],
}))

const chartOptionsDoughnut = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Disponibilidade',
      font: {
        size: 16,
      },
      color: '#3F292C',
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || ''
          const value = context.raw || 0
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = Math.round((value / total) * 100)
          return `${label}: ${value}h (${percentage}%)`
        },
      },
    },
  },
  cutout: '70%',
  animation: {
    animateScale: true,
    animateRotate: true,
  },
})
</script>
