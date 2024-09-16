<template>
  <v-dialog v-model:visible="visible" max-width="600">
    <v-card>
      <div class="title-container">
        <div>
          <v-card-title>{{ equipmentDetails?.name }}</v-card-title>
          <v-card-subtitle>{{ equipmentDetails?.currentState?.name }} </v-card-subtitle>
          <v-card-subtitle
            >{{
              `${calculateProductivity(equipmentDetails?.stateHistory ?? [])}% de Produtividade`
            }}
          </v-card-subtitle>
          <v-card-subtitle>
            Ganho Desde Início:
            {{ calculateEarnings(equipmentDetails?.stateHistory ?? [], equipmentModel ?? {}) }}
          </v-card-subtitle>
        </div>
        <v-btn @click="closeModel" class="close-button" width="32" variant="text">
          <img width="32" src="../assets/imgs/close.png" />
        </v-btn>
      </div>
      <v-card-text>
        <h4 class="mb-2">Histórico de Estados</h4>
        <v-data-table
          density="compact"
          items-per-page="5"
          :items="equipmentDetails?.stateHistory"
          :sort-by="[{ key: 'date', order: 'desc' }]"
          hide-default-header
          :items-per-page-options="[5, 10, 15]"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ new Date(item.date).toLocaleString() }}</td>
              <td>
                <v-chip
                  :color="item.stateColor"
                  :text="item.stateName"
                  class="text-uppercase"
                  size="small"
                  label
                  variant="text"
                ></v-chip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue'
import { useEquipmentStore } from '@/stores/useEquipmentStore'

interface EquipmentState {
  date: string
  stateName: string
}

interface HourlyRates {
  [key: string]: number
}

const props = defineProps<{
  equipmentId?: string
  equipmentModelId?: string
}>()

const emit = defineEmits<{
  (e: 'updateVisible', value: boolean): void
}>()

const store = useEquipmentStore()
const visible = ref<boolean>(false)

const equipmentDetails = computed(() => {
  if (props.equipmentId) {
    return store.getEquipmentDetails(props.equipmentId) || null
  }
  return null
})

const equipmentModel = computed(() => {
  if (props.equipmentModelId) {
    return store.getEquipmentModelData(props.equipmentModelId) || null
  }
  return null
})

function calculateProductivity(data: EquipmentState[]): string {
  let totalOperatingHours = 0

  for (let i = 0; i < data.length - 1; i++) {
    const currentState = data[i]
    const nextState = data[i + 1]

    if (currentState.stateName.toLowerCase() === 'operando') {
      const startTime = new Date(currentState.date)
      const endTime = new Date(nextState.date)

      // Calculate the time difference in hours
      const hoursDiff = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
      totalOperatingHours += hoursDiff
    }
  }

  // Calculate the total hours the machine existed
  const startTime = new Date(data[0].date)
  const endTime = new Date(data[data.length - 1].date)
  const totalExistedHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)

  return ((totalOperatingHours / totalExistedHours) * 100).toFixed(2)
}

function calculateEarnings(equipmentStates: EquipmentState[], hourlyRates: HourlyRates): number {
  let totalEarnings = 0

  for (let i = 0; i < equipmentStates.length - 1; i++) {
    const currentState = equipmentStates[i]
    const nextState = equipmentStates[i + 1]

    // Calculate the time in hours between the current state and the next state
    const diffInHours =
      (new Date(nextState.date).getTime() - new Date(currentState.date).getTime()) /
      (1000 * 60 * 60)

    // Get the hourly rate for the current state
    const hourlyRate = hourlyRates[currentState.stateName] || 0

    // Add the earnings/loss for the period to the total
    totalEarnings += diffInHours * hourlyRate
  }

  return totalEarnings
}

function closeModel() {
  visible.value = false
  emit('updateVisible', visible.value)
}
</script>

<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
}

.close-button {
  height: auto;
}
</style>
