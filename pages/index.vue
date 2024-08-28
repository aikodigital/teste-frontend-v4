<script lang="ts" setup>
/** Components */
import EquipmentList from '~/components/EquipmentList.vue';
import StateHistoryList from '~/components/StateHistoryList.vue';

const { currentView } = useView();
</script>

<template>
  <div class="flex">
    <EquipmentMap />

    <component :is="currentView === 'equipment' ? EquipmentList : StateHistoryList" />
  </div>
</template>
