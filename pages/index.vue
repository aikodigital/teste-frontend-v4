<script lang="ts" setup>
/** Components */
import DailyPercentage from '~/components/DailyPercentage.vue';
import EquipmentList from '~/components/EquipmentList.vue';
import StateHistoryList from '~/components/StateHistoryList.vue';

/** Recupera a visualização atual */
const { currentView } = useView();

/** Mapeamento de componentes para diferentes visualizações */
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
