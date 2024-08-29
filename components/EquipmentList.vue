<script lang="ts" setup>

/** Função para recuperar o estado e modelo selecionados */
const { selectedState, selectedModel } = useEquipmentFilter();

/** Filtra os equipamentos baseado no estado e modelo */
const { filteredEquipments } = useFilteredEquipments();

/**
 * Atualiza o estado selecionado
 * @param {string} newState Novo estado selecionado
 */
function handleStateChange(newState: string) {
  selectedState.value = newState;
}

/**
 * Atualiza o modelo selecionado
 * @param {string} newModel Novo modelo selecionado
 */
function handleModelChange(newModel: string) {
  selectedModel.value = newModel;
}
</script>

<template>
  <aside class="flex flex-col items-center w-1/4 h-screen p-2 gap-4">
    <h2 class="text-2xl font-bold">
      Lista de equipamentos
    </h2>

    <div class="flex flex-col gap-1 w-full">
      <StateFilter @update:selectedState="handleStateChange" />

      <ModelFilter @update:selectedModel="handleModelChange" />
    </div>

    <ul v-if="filteredEquipments.length"
      class="w-full border border-black rounded-lg divide-y-2 divide-black max-h-full overflow-y-auto">
      <li v-for="equipment in filteredEquipments" :key="equipment.id" class="p-2">
        <EquipmentDetails :equipment="equipment" />
      </li>
    </ul>

    <ul v-else class="w-full border border-black rounded-lg divide-y-2 divide-black h-full overflow-y-auto">
      <li class="p-2 text-center">
        Nenhum equipamento encontrado
      </li>
    </ul>
  </aside>
</template>
