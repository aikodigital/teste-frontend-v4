
<script setup lang="ts">
import EquipmentMap from '@/components/map/EquipmentMap.vue';
import EquipmentTable from '@/components/EquipmentTable.vue';
import { useEquipmentStore } from '@/store/useEquipmentStore';
import { onMounted } from 'vue';
import EquipmentStateTimeline from '@/components/EquipmentStateTimeline.vue';
import EquipmentFilter from '@/components/EquipmentFilter.vue';

const store = useEquipmentStore();

onMounted(() => {
  store.loadEquipments();
  store.loadPositionHistory();
  store.loadEquipmentModels();
  store.loadEquipmentStates()
  store.loadStateHistory();
  store.updateFilteredEquipments()

})

</script>

<template>
  <div class="flex flex-col p-2">
    <div class="flex gap-4 px-4 mt-6">
     
        <EquipmentMap />
     
    </div>

    <div class="text-lg font-semibold">
        <EquipmentFilter/>
      </div>
      <!-- Tabela de Equipamentos -->
      <div class="flex gap-4 px-4">
        <div class="w-2/3">
          <EquipmentTable />
        </div>
        <div class="w-1/3">
          <EquipmentStateTimeline />
        </div>
      </div>
    </div>
</template>