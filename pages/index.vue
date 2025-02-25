<template>
  <section class="flex-column align-start justify-center w-100 inter">
    <Map :equipment-states="equipmentStates || []" :equipments="equipmentStore.equipments || []"
      @open-equipments-details="showDialogEquipmentDetails" @filter-equipments="filterEquipments" />
    <div class="d-flex align-center justify-center flex-wrap ga-2 my-5 mx-2 w-100">
      <MapCaption v-for="(eqp, index) in equipmentStore.equipments" :key="index" :equipment-name="eqp.name"
        :icon="eqp.icon || 'material-symbols-light:location-on'"
        :is-last="equipmentStore.equipments && equipmentStore.equipments.length - 1 === index" />
    </div>
  </section>
  <DialogDetails :equipment-id="equipmentStore.equipmentSelected?.id"
    :equipment-name="equipmentStore.equipmentSelected?.name"
    :equipment-current-state="equipmentStore.equipmentSelected?.state"
    :equipment-state-history="equipmentStore.equipmentStateHistorySelected"
    :equipments-states="equipmentStore.equipmentsStates" :equipment-model="equipmentStore.equipmentSelected?.model" />
</template>

<script setup lang="ts">
import type { EquipmentResponse } from '@dtos/Equipment';
import { useEquipmentsStore } from '@composables/stores/useEquipmentsStore';
import { useShowDialogEquipmentDetails } from '@composables/utilities/store';
import { useSnackbarStore } from '@composables/utilities/useSnackbar';
import type { EquipmentsState } from '@dtos/EquipmentState';

definePageMeta({
  layout: 'landing'
})

const equipmentStore = useEquipmentsStore()
const showDialogEquipmentDetail = useShowDialogEquipmentDetails()
const snackBarStore = useSnackbarStore()

const { data: equipments } = await useFetch<EquipmentResponse[]>('/api/equipments')

const { data: equipmentStates } = await useFetch<EquipmentsState[]>('/api/equipments/states')

if (equipments.value) {
  const equipmentsWithIcons = setIconsInEquipments(equipments.value)

  equipmentStore.equipments = equipmentsWithIcons
}

async function showDialogEquipmentDetails(eqp: EquipmentResponse) {
  const equipmentStateHistory = await $fetch(`/api/equipments/state-history/${eqp.id}`)
  const equipmentsStates = await $fetch('/api/equipments/states')

  equipmentStore.equipmentSelected = eqp

  equipmentStore.equipmentStateHistorySelected = equipmentStateHistory


  equipmentStore.equipmentsStates = equipmentsStates


  if (equipmentsStates && equipmentStateHistory && equipmentStore.equipmentSelected) {
    showDialogEquipmentDetail.value = true
  } else {
    snackBarStore.openSnackbar(`Erro ao carregar mais detalhes do equipamento: ${eqp.id}`, 'error')
  }
}

async function filterEquipments(value: string) {
  const data = await $fetch<EquipmentResponse[]>(`/api/equipments?state=${value}`)
  if (data) {
    const equipmentsWithIcons = setIconsInEquipments(data)
    equipmentStore.equipments = equipmentsWithIcons
    if (equipmentStore.equipments.length <= 0) {
      snackBarStore.openSnackbar('Nenhum equipamento encontrado, tente outro filtro', 'warning')
    }
  } else {
    snackBarStore.openSnackbar('Erro ao buscar equipamentos filtrados', 'error')
  }
}

function setIconsInEquipments(equipments: EquipmentResponse[]) {
  const equipmentsMapped = equipments = equipments.map(eqp => {
    return {
      ...eqp,
      icon: equipmentIcons[removeHyphen(eqp.name)] ?? 'material-symbols-light:location-on'
    }
  })

  return equipmentsMapped
}

onMounted(() => {
  if (equipments.value) {
    snackBarStore.openSnackbar('Equipamentos buscados com sucesso.', 'success')
  }
})
</script>

<style>
.equipment {
  font-size: 16px;
  font-weight: bold;

  .equipmentKey {
    font-weight: normal;
    font-size: 14px;
  }
}

.equipmentState {
  font-size: 14px;
}

.moreDetails {
  font-size: 12px;
  color: #808080;
}

.leaflet-div-icon {
  background-color: transparent;
  text-align: center;
  border: none;
}
</style>