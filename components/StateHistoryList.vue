<script lang="ts" setup>
const { selectedEquipment } = useSelectedEquipment();
const stateHistory = selectedEquipment.value?.stateHistory;
</script>

<template>
  <aside class="flex flex-col items-center w-1/4 h-screen p-2 gap-4">
    <h2 class="text-2xl font-bold">State History</h2>

    <ul class="w-full border border-black rounded-lg divide-y-2 divide-black max-h-full overflow-y-auto">
      <li v-for="(state, index) in stateHistory" :key="index" class="p-2">
        <span>
          {{ state }}
        </span>
      </li>
    </ul>
  </aside>
</template>
