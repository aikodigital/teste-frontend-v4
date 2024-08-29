<script setup lang="ts">
useHead({ title: 'Teste Frontend V4' })

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
