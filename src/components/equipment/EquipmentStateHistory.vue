<script lang="ts" setup>
import ScrollPanel from 'primevue/scrollpanel'
import Timeline from 'primevue/timeline'

interface EquipmentStateHistoryProps {
  equipmentStateHistory: EquipmentHistoryState[]
}

const { equipmentStateHistory } = defineProps<EquipmentStateHistoryProps>()
</script>

<template>
  <ScrollPanel style="width: 100%; height: 500px">
    <Timeline :value="equipmentStateHistory">
      <template #marker="slotProps">
        <span>
          <i
            class="pi pi-circle-fill"
            :style="{ color: slotProps.item.color }"
            data-cy="equipment-state-color"
          ></i>
        </span>
      </template>
      <template #opposite="slotProps">
        <small
          class="text-surface-500 dark:text-surface-400"
          data-cy="equipment-state-date"
        >
          {{ slotProps.item.date }}
        </small>
      </template>
      <template #content="slotProps">
        <span data-cy="equipment-state-status">
          {{ slotProps.item.status }}
        </span>
      </template>
    </Timeline>
  </ScrollPanel>
</template>
