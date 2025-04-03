<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "./layouts/BaseLayout.vue";
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
