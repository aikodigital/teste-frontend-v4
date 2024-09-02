<template>
  <v-select
    v-model="selectedState"
    label="Select"
    return-object
    clearable
    :items="equipmentsStates.default"
    :item-props="itemProps"
    variant="solo"
  />
</template>

<script setup lang="ts">
import * as equipmentsStates from '@/assets/data/equipmentState.json';
import type { IStates } from '~/interfaces/equipments.interface';
import { useEventBus } from '@/utils/eventBus.ts';
import { ref, watch } from 'vue';

const { emit } = useEventBus();
const selectedState = ref<IStates | null>(null);

watch(selectedState, (newValue) => {
  emit('stateChanged', newValue);
});

function itemProps(item: IStates) {
  return {
    title: item.name,
  };
}
</script>
