<template>
  <Dialog v-model:visible="visible" header="Histórico de Estados" :style="{ width: '70vw' }">
    <DataTable :value="stateHistory" :paginator="true" :rows="10">
      <Column field="date" header="Data" :body="dateTemplate" />
      <Column field="stateName" header="Estado" />
      <Column field="equipmentStateId" header="ID do Estado" />
      <Column field="value" header="Valor por Hora">
        <template #body="slotProps">
          {{ currencyTemplate(slotProps) }}
        </template>
      </Column>
    </DataTable>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'
import type { StateHistoryEntry } from '@/types'

const props = defineProps<{
  equipmentId: string
}>()

const emit = defineEmits(['close'])

const store = useEquipmentStore()
const visible = ref(true)

const stateHistory = computed(() => store.getStateHistoryWithValues(props.equipmentId))

function dateTemplate(slotProps) {
  return new Date(slotProps.data.date).toLocaleString()
}

function currencyTemplate(slotProps) {
  console.log('Currency Template Data:', slotProps.data)
  const value = slotProps.data.value
  if (value !== null && value !== undefined) {
    return `R$ ${Number(value).toFixed(2)}`
  }
  return 'Não definido'
}

watch(visible, (newValue) => {
  if (!newValue) emit('close')
})
</script>