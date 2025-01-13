<template>
  <Card
    :class="`hover:cursor-pointer ${selected ? 'border border-gray-700' : ''}`"
    @click="$emit('onClick')"
  >
    <template #title>
      <OverlayBadge
        :severity="
          equipmentStateName === 'Operando'
            ? 'success'
            : equipmentStateName === 'Parado'
              ? 'warn'
              : 'danger'
        "
      >
        <h3 class="font-bold text-sm">
          {{ equipmentName }} <span class="text-xs text-gray-500">({{ equipmentModelName }})</span>
        </h3>
        <p :class="['text-sm', equipmentStateColor ? `text-[${equipmentStateColor}]` : '']">
          {{ equipmentStateName }}
        </p>
      </OverlayBadge>
    </template>
    <template #content>
      <p class="m-0 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import OverlayBadge from 'primevue/overlaybadge'

defineProps<{
  selected?: boolean
  id?: string
  stateName?: string
  equipmentName?: string
  equipmentModelName?: string
  equipmentStateName?: string
  equipmentStateColor?: string
}>()
</script>

<style scoped></style>
