<script lang="ts" setup>
import { getEquipmentIcon } from '~/utils/getEquipmentIcon'
import { getStateColor, getStateName } from '~/utils/stateUtils'

const props = withDefaults(defineProps<{
  name: string
  model: string
  state: string
  id: string
}>(), {
  name: 'Caminhão de carga',
  model: 'CA-0001',
  state: 'Operando',
})

const emit = defineEmits<(e: 'card-clicked', id: string) => void>()
</script>

<template>
  <button class="flex w-full items-center justify-start gap-4 rounded-md px-3 py-5 transition-all hover:bg-foreground/10" @click="() => emit('card-clicked', props.id)">
    <div class="flex size-10 items-center justify-center rounded-full bg-foreground/15 lg:size-16">
      <Icon :name="getEquipmentIcon(props.model)" class="size-8 lg:size-12" />
    </div>
    <div class="flex flex-col items-start gap-1">
      <h2 class="text-base lg:text-lg">
        {{ model }} - <span class="font-medium">{{ name }}</span>
      </h2>
      <p class="flex items-center gap-1 text-foreground/70">
        <StateDot :animate="false" :color="getStateColor(props.state)" />
        {{ getStateName(props.state) }}
      </p>
    </div>
  </button>
</template>
