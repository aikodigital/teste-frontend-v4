<script setup lang="ts">
import { useRoute } from 'vue-router';
import EquipmentDetails from '@/components/EquipmentDetails.vue';
import { useStateHistoryStore } from '@/stores/equipments/stateHistory';
import { useStateStore } from '@/stores/equipments/state';

const { params } = useRoute();
const equipmentId = params.id as string;

const { getStateHistory } = useStateHistoryStore();
const { getState } = useStateStore();
</script>

<template>
  <EquipmentDetails
    :state-history="getStateHistory(equipmentId)"
    :get-state="getState"
  ></EquipmentDetails>
</template>
