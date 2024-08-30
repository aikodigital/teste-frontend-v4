<template>
  <NuxtLayout name="admin">
    <AdminSelectEquipments @change-equipment="setEquipmentId" />
    <div class="w-full h-full relative z-10 max-h-[74vh]">
      <AdminEquipmentModel 
        v-if="modelId"
        :model-id="modelId"
        @click-history="displayStateHistory = true"
      />
      <AdminMapEquipment
        :equipment-id="equipmentId"
      />
    </div>
    <Transition>
      <template v-if="displayStateHistory">
        <AdminStateHistory
          :equipment-id="equipmentId"
          @close-bottom-sheet="displayStateHistory = false"
        />
      </template>  
    </Transition>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type ChangeEquipmentEmit from '~/interfaces/admin/equipment/ChangeEquipmentEmit'
import moment from 'moment'

const equipmentId = ref<string>('')
const modelId = ref<string>('')
const displayStateHistory = ref<boolean>(false)

const setEquipmentId = (equipment: ChangeEquipmentEmit) => {
  equipmentId.value = ''
  modelId.value = ''

  setTimeout(() => {
    equipmentId.value = equipment.id
    modelId.value = equipment.idModel
  }, 10)
}

onMounted(() => {
  console.log(moment().format('DD/MM/YYYY'))
})

</script>