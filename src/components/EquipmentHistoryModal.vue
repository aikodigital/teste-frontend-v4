<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useEquipmentStore } from '@/stores/useEquipmentStore'

const props = defineProps<{ equipmentId: string }>()

const store = useEquipmentStore()
const visible = ref<boolean>(false)

const equipmentDetails = computed(() => {
  if (props.equipmentId) {
    return store.getEquipmentDetails(props.equipmentId)
  }
  return null
})

onMounted(async () => {
  await store.fetchEquipmentData()
  await store.fetchEquipmentStates()
  await store.fetchEquipmentStateHistory()
  await store.fetchEquipmentPositionHistory()
})

watch(
  () => props.equipmentId,
  async () => {
    if (props.equipmentId) {
      await store.fetchEquipmentData()
      await store.fetchEquipmentStates()
      await store.fetchEquipmentStateHistory()
      await store.fetchEquipmentPositionHistory()
    }
  }
)
</script>

<template>
  <v-dialog v-model:visible="visible" max-width="800">
    <v-card>
      <v-card-title>{{ equipmentDetails?.name }}</v-card-title>
      <v-card-subtitle>{{ equipmentDetails?.currentState?.name }}</v-card-subtitle>
      <v-card-text>
        <v-data-table
          density="compact"
          :items="equipmentDetails?.stateHistory"
          items-per-page="5"
          :sort-by="[{ key: 'date', order: 'desc' }]"
          hide-default-header
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ new Date(item.date).toLocaleString() }}</td>
              <td>{{ item.equipmentStateId }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
