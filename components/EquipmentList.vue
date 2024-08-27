<script lang="ts" setup>
const { recentEquipments } = useEquipments();
</script>

<template>
  <aside class="flex flex-col items-center w-1/4 h-screen p-2 gap-4">
    <h2 class="text-2xl font-bold">Equipment List</h2>

    <ul class="w-full border border-black rounded-lg divide-y-2 divide-black max-h-full overflow-y-auto">
      <li v-for="equipment in recentEquipments" :key="equipment.id" class="p-2">
        <EquipmentDetails :equipment="equipment" />
      </li>
    </ul>
  </aside>
</template>
