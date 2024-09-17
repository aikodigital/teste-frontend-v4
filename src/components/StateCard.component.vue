<template>
  <v-card class="d-flex rounded-0" width="350" elevation="0">
    <v-divider :color="state.color" thickness="4" vertical opacity="1" />
    <div class="d-flex flex-column ml-2">
      <div v-if="state.date" class="d-flex ga-2 align-center text-overline font-weight-bold">
        <span class="material-symbols-outlined" style="font-size: 16px"> calendar_today </span>
        <span>{{ stateDate(state.date) }}</span>
      </div>
      <span class="font-weight-bold">{{ state.name.toLocaleUpperCase() }}</span>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import type { State } from '@/stores/equipment.types'
import { format } from 'date-fns'
import { computed } from 'vue'

defineProps<{
  state: State
}>()

const stateDate = (date: Date) =>
  computed(() => {
    return format(date, 'dd/MM/yyyy')
  })
</script>
