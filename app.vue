<script setup lang="ts">
const { fetchEquipmentData } = useEquipments()
await callOnce(fetchEquipmentData)
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
