<script lang="ts" setup>
/** Components */
import DailyPercentage from '~/components/DailyPercentage.vue';
import EquipmentList from '~/components/EquipmentList.vue';
import StateHistoryList from '~/components/StateHistoryList.vue';

const { currentView } = useView();

const componentMap = {
  equipment: EquipmentList,
  stateHistory: StateHistoryList,
  percentage: DailyPercentage,
};
</script>

<template>
  <div class="flex">
    <EquipmentMap />

    <component :is="componentMap[currentView]" />
  </div>
</template>
