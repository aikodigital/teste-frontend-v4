<script setup lang="ts">
const { data: equipment } = await useFetch('/api/equipments/a7c53eb1-4f5e-4eba-9764-ad205d0891f9')
</script>

<template>
  <div class="container">
    {{ equipment }}
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 24px;
  background-color: rgb(150, 200, 150);
}
</style>
