<template>
  <NuxtLayout name="admin">
    <AdminSelectEquipments @change-equipment="setEquipmentId" />
    <div class="w-full h-full relative z-10 max-h-[83vh]">
      <AdminEquipmentModel 
        v-if="modelId"
        :model-id="modelId"
      />
      <AdminMapEquipment
        v-if="equipmentId"
        :equipment-id="equipmentId"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type ChangeEquipmentEmit from '~/interfaces/admin/equipment/ChangeEquipmentEmit'

const equipmentId = ref<string>('')
const modelId = ref<string>('')

const setEquipmentId = (equipment: ChangeEquipmentEmit) => {
  equipmentId.value = ''
  modelId.value = ''

  setTimeout(() => {
    equipmentId.value = equipment.id
    modelId.value = equipment.idModel
  }, 10)
}
</script>