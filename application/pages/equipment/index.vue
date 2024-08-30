<template>
  <NuxtLayout name="admin">
    <EquipmentSelectEquipments @change-equipment="setEquipmentId" />
    <div class="w-full h-full relative z-10 max-h-[74vh]">
      <EquipmentModel 
        v-if="modelId"
        :model-id="modelId"
        :equipment-id="equipmentId"
        @click-history="displayStateHistory = true"
      />
      <EquipmentMapEquipment
        :equipment-id="equipmentId"
        :equipment-name="equipmentName"
      />
    </div>
    <Transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <template v-if="displayStateHistory">
        <EquipmentStateHistory
          :equipment-id="equipmentId"
          @close-bottom-sheet="displayStateHistory = false"
        />
      </template>
    </Transition>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type ChangeEquipmentEmit from '~/interfaces/admin/equipment/ChangeEquipmentEmit'

useSeoMeta({
  title: 'Equipamentos'
})

const equipmentId = ref<string>('')
const modelId = ref<string>('')
const equipmentName = ref<string>('')
const displayStateHistory = ref<boolean>(false)

const setEquipmentId = (equipment: ChangeEquipmentEmit) => {
  equipmentId.value = ''
  modelId.value = ''
  equipmentName.value = ''

  setTimeout(() => {
    equipmentId.value = equipment.id
    modelId.value = equipment.idModel
    equipmentName.value = equipment.equipmentName
  }, 10)
}

</script>