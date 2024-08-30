<script lang="ts" setup>
import type { IEquipmentState, IState } from '~/types/types'
import { formatDate } from '~/utils/dateFormater'
import { getStateColor, getStateName } from '~/utils/stateUtils'

const props = defineProps<{
  events: IEquipmentState[]
  states: IState[]
}>()

const reversedEvents = computed(() => props.events.slice().reverse())
</script>

<template>
  <div class="w-full">
    <div class="flex w-full flex-col gap-3">
      <div v-for="event in reversedEvents" :key="event.date" class="-before:translate-x-1/2 relative z-50 grid size-full grid-cols-[1fr_20px_1fr] items-start gap-3 before:absolute before:bottom-[-18px] before:left-1/2 before:h-full before:w-px before:transform before:bg-slate-400 last:before:content-none">
        <div class="text-left text-sm text-gray-600">
          {{ formatDate(event.date) }}
        </div>
        <div class="flex justify-center">
          <StateDot class="mt-1.5" :animate="false" :color="getStateColor(event.equipmentStateId)" />
        </div>
        <div class="">
          <p class="font-medium">
            {{ getStateName(event.equipmentStateId) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
