<template>
  <MapEquipment :data="formHistory" :showLine="$route.query.id != null" v-if="formHistory">
    <template #select>
      <div class="absolute top-2 left-2 z-[99] flex flex-nowrap items-center"></div>
    </template>
  </MapEquipment>
</template>
<script setup>
import MapEquipment from 'src/components/MapEquipment.vue'
import { useEquipmentStore } from 'src/stores/equipment'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const eqpStore = useEquipmentStore()
const route = useRoute()

const formHistory = ref(null)

onMounted(async () => {
  formHistory.value = route.query.id
    ? eqpStore.position
        .find((item) => item.equipmentId == route.query.id)
        .positions.map((item) => {
          return { position: item }
        })
    : eqpStore.equipments
})
</script>
<style lang=""></style>
