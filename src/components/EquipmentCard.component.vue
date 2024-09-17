<template>
  <v-card v-bind="$attrs" class="mx-auto flex-shrink-0" width="350" :color="equipment.state.color">
    <v-card-title>
      <span class="text-subtitle-1 font-weight-black text-white">
        {{ equipment.name }}
      </span>
    </v-card-title>
    <v-card-subtitle class="mb-2 mt-n2">
      <span class="font-weight-bold text-white">{{ equipment.model }}</span>
    </v-card-subtitle>
    <v-card-text class="bg-surface-light">
      <div class="d-flex flex-column">
        <span class="font-weight-bold">
          {{ equipment.state.name }}
        </span>
        <div class="d-flex mt-5 ga-6 text-overline font-weight-bold">
          <span>{{ equipment.position.lat }}</span>
          <span>{{ equipment.position.lon }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { IEquipment } from '@/stores/equipment.store'

defineProps<{
  equipment: IEquipment
}>()
</script>
