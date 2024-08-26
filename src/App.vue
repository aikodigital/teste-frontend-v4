<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="border-b bg-white border-root-border">
    <nav class="container mx-auto flex justify-center py-4">
      <img src="@/assets/aiko.png" alt="Aiko Logo" class="w-24" />
    </nav>
  </div>
  <RouterView />
</template>
