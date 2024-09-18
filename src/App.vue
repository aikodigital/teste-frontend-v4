<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarMenuComponent from './components/SidebarMenu.component.vue'
</script>

<template>
  <v-layout>
    <SidebarMenuComponent />
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
