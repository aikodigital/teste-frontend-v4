<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarMenuComponent from './components/SidebarMenu.component.vue'
</script>

<template>
  <div class="d-flex">
    <SidebarMenuComponent />
    <RouterView />
  </div>
</template>
