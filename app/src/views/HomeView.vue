<script setup lang="ts">
import EquipmentList from '@/components/EquipmentList.vue';
import { useEquipmentStore } from '@/stores/equipments';

const { equipments, getEquipmentPreview } = useEquipmentStore();
</script>

<template>
  <EquipmentList :equipments="equipments.map(getEquipmentPreview)"></EquipmentList>
</template>
