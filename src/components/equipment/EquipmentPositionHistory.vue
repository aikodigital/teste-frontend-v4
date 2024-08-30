<script lang="ts" setup>
import ScrollPanel from 'primevue/scrollpanel'
import Timeline from 'primevue/timeline'

interface EquipmentPositionHistoryProps {
  equipmentPositionHistory: EquipmentPosition[]
}

const { equipmentPositionHistory } = defineProps<EquipmentPositionHistoryProps>()
</script>

<template>
  <ScrollPanel style="width: 100%; height: 500px">
    <Timeline :value="equipmentPositionHistory">
      <template #opposite="slotProps">
        <small
          class="text-surface-500 dark:text-surface-400"
          data-cy="equipment-position-date"
          >{{ slotProps.item.date }}</small
        >
      </template>
      <template #content="slotProps">
        <p
          class="m-0"
          data-cy="equipment-position-lat"
        >
          {{ `Lat: ${slotProps.item.lat}` }}
        </p>
        <p
          class="m-0"
          data-cy="equipment-position-lon"
        >
          {{ `Lon: ${slotProps.item.lon}` }}
        </p>
      </template>
    </Timeline>
  </ScrollPanel>
</template>
