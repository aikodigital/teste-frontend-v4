<script setup lang="ts">
import { RouterView } from "vue-router";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
    <FooterComponent />
  </v-app>
</template>