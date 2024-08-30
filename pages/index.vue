<script setup lang="ts">
useHead({
  title: 'Gerenciamento de Equipamentos',
})
</script>

<template>
  <ClientOnly>
    <div class="size-full">
      <Map />
    </div>
  </ClientOnly>
</template>
