<template>
  <Timeline :value="state?.states" align="alternate" class="flex items-center w-96 md:w-full">
    <template #content="slotProps">
      <Card class="mt-4">
        <template #subtitle>
          {{ formatDate(slotProps.item.date) }}
        </template>
        <template #content>
          <div class="flex flex-col items-center justify-center">
            <img
              src="../../assets/img/eq.jpg"
              :alt="slotProps.item.name"
              width="200"
              class="shadow-sm"
            />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
        </template>
      </Card>
    </template>
  </Timeline>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/format'
import Timeline from 'primevue/timeline'
import Card from 'primevue/card'
import type { EquipmentStateHistory } from '@/types'
import { computed, type ComputedRef } from 'vue'
import { useEquipmentsStore } from '@/stores/equipments'

const storeEquipment = useEquipmentsStore()

const props = defineProps<{ equipmentId: string | undefined }>()

const state: ComputedRef<EquipmentStateHistory | undefined> = computed(() =>
  storeEquipment.states.find((st) => st.equipmentId === props.equipmentId),
)
</script>

<style scoped></style>
