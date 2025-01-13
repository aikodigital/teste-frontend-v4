<template>
  <div class="flex flex-col items-center justify-center p-4 gap-2.5">
    <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-[15rem]" />
    <p class="text-sm text-gray-500">O ganho total do equipamento é: {{ earningsByequipment }}</p>
  </div>
</template>

<script setup lang="ts">
import { equipmentState } from '@/data/equipmentState'
import { useEquipmentsStore } from '@/stores/equipments'
import type { Equipment, EquipmentModel, EquipmentStateHistory } from '@/types'
import { calculateTotalOperatingTime } from '@/utils/productivity'
import Chart from 'primevue/chart'
import { ref, onMounted, computed, type ComputedRef } from 'vue'

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const storeEquipment = useEquipmentsStore()

const props = defineProps<{
  equipmentId?: string
}>()

const equipmentStateHistory: ComputedRef<EquipmentStateHistory | undefined> = computed(() => {
  return storeEquipment.states.find((st) => st.equipmentId === props.equipmentId)
})

const equipment: ComputedRef<Equipment | undefined> = computed(() => {
  return storeEquipment.equipments.find((eq) => eq.id === props.equipmentId)
})

const equipmentModelById: ComputedRef<EquipmentModel | undefined> = computed(() => {
  return storeEquipment.models.find((model) => model.id === equipment.value?.equipmentModelId)
})

const hoursStatesByEquipmentId: Record<string, number> = (() => {
  const operatingStateId = equipmentState.find((state) => state.name === 'Operando')?.id
  const maintenanceStateId = equipmentState.find((state) => state.name === 'Manutenção')?.id

  if (!operatingStateId || !maintenanceStateId) {
    throw new Error('Operating or maintenance state ID not found')
  }

  return {
    Operando: calculateTotalOperatingTime(equipmentStateHistory.value!.states, operatingStateId),
    Manutenção: calculateTotalOperatingTime(
      equipmentStateHistory.value!.states,
      maintenanceStateId,
    ),
  }
})()

const earningsByequipment = computed(() => {
  const operatingStateId = equipmentState.find((state) => state.name === 'Operando')?.id
  const maintenanceStateId = equipmentState.find((state) => state.name === 'Manutenção')?.id

  if (!operatingStateId || !maintenanceStateId) {
    return 0
  }

  const operatingHourlyEarnings = equipmentModelById.value?.hourlyEarnings.find(
    (earning) => earning.equipmentStateId === operatingStateId,
  )
  const maintenanceHourlyEarnings = equipmentModelById.value?.hourlyEarnings.find(
    (earning) => earning.equipmentStateId === maintenanceStateId,
  )

  const operatingEarnings =
    hoursStatesByEquipmentId.Operando * (operatingHourlyEarnings?.value || 0)
  const maintenanceEarnings =
    hoursStatesByEquipmentId.Manutenção * (maintenanceHourlyEarnings?.value || 0)

  return operatingEarnings + maintenanceEarnings
})

const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  return {
    labels: [
      `Operação (${hoursStatesByEquipmentId.Operando} horas)`,
      `Manutenção (${hoursStatesByEquipmentId.Manutenção} horas)`,
    ],
    datasets: [
      {
        data: [hoursStatesByEquipmentId.Operando, hoursStatesByEquipmentId.Manutenção],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-green-500'),
          documentStyle.getPropertyValue('--p-red-500'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-green-400'),
          documentStyle.getPropertyValue('--p-red-400'),
        ],
      },
    ],
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
  }
}
</script>

<style scoped></style>
