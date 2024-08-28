<script lang="ts" setup>
const { recentEquipments } = useEquipments();

const selectedState = ref<string>('');

const filteredEquipments = computed(() => {
  if (!selectedState.value) {
    return recentEquipments.value;
  }

  return recentEquipments.value.filter((equipment) => equipment.currentState === selectedState.value);
});

function handleStateChange(newState: string) {
  selectedState.value = newState;
}
</script>

<template>
  <aside class="flex flex-col items-center w-1/4 h-screen p-2 gap-4">
    <h2 class="text-2xl font-bold">Lista de equipamentos</h2>

    <EquipmentFilter @update:selectedState="handleStateChange" />

    <ul v-if="filteredEquipments.length"
      class="w-full border border-black rounded-lg divide-y-2 divide-black max-h-full overflow-y-auto">
      <li v-for="equipment in filteredEquipments" :key="equipment.id" class="p-2">
        <EquipmentDetails :equipment="equipment" />
      </li>
    </ul>

    <ul v-else class="w-full border border-black rounded-lg divide-y-2 divide-black h-full overflow-y-auto">
      <li class="p-2 text-center">Nenhum equipamento encontrado</li>
    </ul>
  </aside>
</template>
