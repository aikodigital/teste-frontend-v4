<template>
  <div>
    <h1>Equipment Dashboard</h1>
    <EquipmentMap :equipmentPositions="equipmentPositions" />
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { EquipmentPositionHistory } from 'src/models/EquipmentPositionHistory'; 
import EquipmentMap from '@/components/EquipmentMap.vue';

export default defineComponent({
  name: 'Home',
  components: {
    EquipmentMap,
  },
  setup() {
    const store = useStore();

    const equipmentPositions = computed<EquipmentPositionHistory[]>(() => {
      const positions = store.state.equipmentPositionHistory; 

    
      if (positions) {
        return positions.map((position: EquipmentPositionHistory) => ({
          lat: position.lat,
          lon: position.lon,
          equipmentId: position.equipmentId,
        }));
      }
      return []; 
    });

    return {
      equipmentPositions,
    };
  },
});
</script>
  