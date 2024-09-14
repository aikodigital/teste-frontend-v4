<template>
  <div class="p-8 bg-gray-950">
    <div class="flex">
      <div class="w-1/4 pr-4">
        <h2 class="text-white">Lista de Equipamentos</h2>
        <ul class="list-disc pl-5 text-white">
          <li v-for="equipment in equipments" :key="equipment.id" class="cursor-pointer hover:underline"
            @click="updateMapLocation(equipment.id)">
            {{ equipment.name }}
          </li>
        </ul>
      </div>
      <div class="w-3/4">
        <EquipmentMap ref="equipmentMap" :initialPosition="{ lat: -19.126536, lng: -45.947756 }" />
      </div>
    </div>
    <div v-if="selectedEquipment" class="mt-4">
      <h2 class="text-white">Detalhes do Equipamento</h2>
      <p><strong>Nome:</strong> {{ selectedEquipment.name }}</p>
      <p><strong>Latitude:</strong> {{ selectedEquipment.position.lat }}</p>
      <p><strong>Longitude:</strong> {{ selectedEquipment.position.lng }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import EquipmentMap from '../components/EquipmentMap.vue';
import { getEquipmentPosition } from '../utils/getPosition.ts';
import { useEquipmentStore } from '../stores/equipmentStore.ts';

export default {
  components: {
    EquipmentMap
  },
  setup() {
    const store = useEquipmentStore();
    const selectedEquipment = ref<{ id: string, name: string, position: { lat: number, lng: number } } | null>(null);
    const equipmentMap = ref<any>(null);

    const equipments = store.equipments.map(equipment => ({
      ...equipment,
      position: getEquipmentPosition(equipment.id)
    }));
    const getPosition = (id: string) => {
      const position = getEquipmentPosition(id);
      return position ? { lat: position.lat, lng: position.lon } : { lat: 0, lng: 0 };
    };

    function handleEquipmentClick(equipment: { id: string, name: string }) {
      selectedEquipment.value = { ...equipment, position: getPosition(equipment.id) };
    }

    function updateMapLocation(equipmentId: string) {
      const position = getEquipmentPosition(equipmentId);
      if (position) {
        const formattedPosition = { lat: position.lat, lng: position.lon };
        if (equipmentMap.value) {
          equipmentMap.value.updatePosition(formattedPosition);
        }
      }
    }

    return {
      equipments,
      selectedEquipment,
      handleEquipmentClick,
      updateMapLocation,
      equipmentMap
    };
  }
};
</script>
