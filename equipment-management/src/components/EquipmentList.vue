<template>
  <div>
    <EquipmentFilter v-model="selectedModel" />
    <ul>
      <li v-for="equip in filteredEquipment" :key="equip.id">
        {{ equip.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import EquipmentFilter from './EquipmentFilter.vue';

export default {
  components: { EquipmentFilter },
  setup() {
    const store = useStore();
    const selectedModel = ref('');

    const equipment = computed(() => store.state.equipment);
    console.log("Equipment from store:", equipment.value)
    const filteredEquipment = computed(() => {
      return selectedModel.value
        ? equipment.value.filter(e => e.models === selectedModel.value)
        : equipment.value;
    });
    console.log("Equipmentd from store:", filteredEquipment)

    return { selectedModel, filteredEquipment };
  }
};
</script>