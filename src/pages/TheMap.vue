<template>
  <MapEquipment :data="formHistory" v-if="formHistory">
    <template #select>
      <div class="absolute top-2 left-2 z-[99] flex flex-nowrap items-center">
        <!-- <q-select
          class="w-[200px]"
          v-model="selected"
          :options="optionsEquipment"
          label="Equipamento"
          outlined
          dense
          @update:model-value="
            (data) => {
              formData = formHistory.find((item) => item.equipmentId == data.value)
            }
          "
        /> -->
      </div>
    </template>
  </MapEquipment>
</template>
<script setup>
import MapEquipment from 'src/components/MapEquipment.vue'
import { useEquipmentStore } from 'src/stores/equipment'
import { onMounted, ref } from 'vue'

const eqpStore = useEquipmentStore()

const formHistory = ref(null)

// const optionsEquipment = ref(
//   eqpStore.equipments.map((equipment) => ({
//     label: equipment.name,
//     value: equipment.id,
//   })),
// )

// const selected = ref(optionsEquipment.value[0])

onMounted(async () => {
  formHistory.value = eqpStore.equipments
})
</script>
<style lang=""></style>
