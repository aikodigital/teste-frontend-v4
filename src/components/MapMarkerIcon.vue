<script setup lang="ts">
import type { EquipmentData } from '@/types/EquipmentTypes'
import { modelToImage } from '@/utils/MarkersImages'

const props = defineProps<{
  equipments: EquipmentData
  effect?: boolean
}>()

const tagImageEquipment = props.equipments.id ? modelToImage(props.equipments.model.name) : ''
</script>

<template>
  <div
    :class="['flex items-center justify-center relative', effect ? 'w-12 h-12 z-10' : 'w-4 h-4']"
  >
    <span
      :style="{ backgroundColor: effect ? props.equipments.isLatestState.color : 'blue' }"
      :class="['rounded-full flex items-center justify-center', effect ? 'w-12 h-12' : 'w-4 h-4']"
    >
      <img
        v-if="tagImageEquipment && effect"
        :src="tagImageEquipment"
        :alt="props.equipments.name"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6"
      />
    </span>
    <span
      v-if="tagImageEquipment && effect"
      :style="{ backgroundColor: props.equipments.isLatestState.color }"
      class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
    ></span>
  </div>
</template>
