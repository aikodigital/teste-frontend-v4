<template>
  <MapHeader :equipment-states="equipmentStates" @filter-equipments="filterEquipments" />
  <MapLayout :equipments="equipments" @open-equipments-details="openEquipmentsDetails" />
</template>

<script setup lang="ts">
import { MapHeader, MapLayout } from '#components';
import type { EquipmentResponse } from '@dtos/Equipment';
import type { EquipmentsState } from '@dtos/EquipmentState';

interface Props {
  equipments: EquipmentResponse[],
  equipmentStates: EquipmentsState[]
}

defineProps<Props>()

const emit = defineEmits(['openEquipmentsDetails', 'filterEquipments'])

function openEquipmentsDetails(eqp: EquipmentResponse) {
  emit('openEquipmentsDetails', eqp)
}

function filterEquipments(value: string) {
  emit('filterEquipments', value)
}
</script>
