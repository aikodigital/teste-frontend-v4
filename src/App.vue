<!-- App.vue -->
<template>
  <div class="app-layout d-flex flex-column min-vh-100">
    <AppHeader />
    
    <main class="flex-grow-1">
      <router-view />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style>
@import '@/styles/main.scss';

body {
  background-color: #f8f9fa;
}

.equipment-marker {
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
}

.app-layout {
  background-color: #f8f9fa;
}

a {
  color: #198754;
  text-decoration: none;
}

a:hover {
  color: #13653f;
  text-decoration: underline;
}
</style>