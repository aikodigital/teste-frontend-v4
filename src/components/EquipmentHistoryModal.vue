<script setup lang="ts">
import { ref, computed } from 'vue'
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
</script>

<template>
  <v-dialog v-model:visible="visible" max-width="600">
    <v-card>
      <v-card-title>{{ equipmentDetails?.name }}</v-card-title>
      <v-card-subtitle>{{ equipmentDetails?.currentState?.name }} </v-card-subtitle>
      <v-card-text>
        <h4 class="mb-2">Histórico de Estados</h4>
        <v-data-table
          density="compact"
          items-per-page="5"
          :items="equipmentDetails?.stateHistory"
          :sort-by="[{ key: 'date', order: 'desc' }]"
          hide-default-header
          :items-per-page-options="[5, 10]"
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
