<template>
  <div class="flex flex-wrap justify-center gap-4 p-3">
    <div class="flex items-center gap-2">
      <RadioButton v-model="period" inputId="day" name="pizza" value="day" />
      <label for="day">Dia</label>
    </div>
    <div class="flex items-center gap-2">
      <RadioButton v-model="period" inputId="month" name="pizza" value="month" />
      <label for="month">Mês</label>
    </div>
    <div class="flex items-center gap-2">
      <RadioButton v-model="period" inputId="year" name="pizza" value="year" />
      <label for="year">Ano</label>
    </div>
  </div>
  <div class="card">
    <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
  </div>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart'
import { ref, onMounted, computed, watch, type ComputedRef } from 'vue'
import {
  calculateDailyProductivity,
  calculateProductivity,
  calculateTotalHours,
  calculateTotalOperatingTime,
} from '@/utils/productivity'
import RadioButton from 'primevue/radiobutton'
import type { Equipment, EquipmentStateHistory, Period, States } from '@/types'
import { useEquipmentsStore } from '@/stores/equipments'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'
import { equipmentState } from '@/data/equipmentState'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(utc)

const props = defineProps<{
  equipmentId?: string
}>()

const period = ref<Period>('day')
const storeEquipment = useEquipmentsStore()

const equipmentStateHistory: ComputedRef<EquipmentStateHistory | undefined> = computed(() => {
  return storeEquipment.states.find((st) => st.equipmentId === props.equipmentId)
})

const statesDaysAgo: ComputedRef<States[] | undefined> = computed(() => {
  const currentDate = dayjs('2021-02-07').utc().startOf('day')
  const sevenDaysAgo = currentDate.subtract(6, 'days').utc().startOf('day')

  return equipmentStateHistory.value?.states.filter((st) => {
    const stateDate = dayjs(st.date).utc().startOf('day')
    return stateDate.isSameOrAfter(sevenDaysAgo) && stateDate.isSameOrBefore(currentDate)
  })
})

const statesMonth: ComputedRef<States[] | undefined> = computed(() => {
  const startOfMonth = dayjs('2021-02-01').utc().startOf('day')
  const endOfMonth = dayjs('2021-02-28').utc().endOf('day')

  return equipmentStateHistory.value?.states.filter((st) => {
    const stateDate = dayjs(st.date).utc().startOf('day')
    return stateDate.isSameOrAfter(startOfMonth) && stateDate.isSameOrBefore(endOfMonth)
  })
})

const statesYear: ComputedRef<States[] | undefined> = computed(() => {
  const startOfYear = dayjs('2021-01-01').utc().startOf('day')
  const endOfYear = dayjs('2021-12-31').utc().endOf('day')

  return equipmentStateHistory.value?.states.filter((st) => {
    const stateDate = dayjs(st.date).utc().startOf('day')
    return stateDate.isSameOrAfter(startOfYear) && stateDate.isSameOrBefore(endOfYear)
  })
})

const equipment: ComputedRef<Equipment | undefined> = computed(() => {
  return storeEquipment.equipments.find((eq) => eq.id === props.equipmentId)
})

watch(period, () => {
  chartData.value = setChartData()
})

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const chartData = ref()
const chartOptions = ref()

const setLabels = computed(() => {
  switch (period.value) {
    case 'day': {
      const uniqueDates: string[] = []
      statesDaysAgo.value?.forEach((st) => {
        const stateDate = new Date(st.date)
        const dateString = stateDate.toISOString().split('T')[0]

        if (!uniqueDates.includes(dateString)) {
          uniqueDates.push(dateString)
        }
      })

      return uniqueDates
    }
    case 'month': {
      const monthNames = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ]
      return [monthNames[new Date('2021-02-07').getMonth()]]
    }
    case 'year': {
      return [`${new Date('2021-02-07').getFullYear()}`]
    }
    default:
      return null
  }
})

const setData = computed(() => {
  const operatingStateId = equipmentState.find((state) => state.name === 'Operando')?.id

  if (period.value === 'day' && statesDaysAgo.value?.length) {
    const productivityByDay = calculateDailyProductivity(statesDaysAgo.value, operatingStateId!)

    return productivityByDay.map((productivity) => calculateProductivity(productivity.hours, 24))
  }

  if (period.value === 'month' && statesMonth.value?.length) {
    const totalOperatingTime = calculateTotalOperatingTime(statesMonth.value, operatingStateId!)
    return [calculateProductivity(totalOperatingTime, calculateTotalHours(2021, 2))]
  }

  if (period.value === 'year' && statesYear.value?.length) {
    const totalOperatingTime = calculateTotalOperatingTime(statesYear.value, operatingStateId!)
    return [calculateProductivity(totalOperatingTime, calculateTotalHours(2021))]
  }

  return null
})

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: setLabels.value,
    datasets: [
      {
        label: equipment.value?.name,
        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        data: setData.value,
      },
    ],
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  }
}
</script>

<style scoped></style>
