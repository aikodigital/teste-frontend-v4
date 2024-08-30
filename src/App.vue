<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-system-bar>
      <span
        >Teste Frontend V4 (Aiko) by
        <a href="https://github.com/heloisasvl/teste-frontend-v4" target="_blank"
          >Heloisa Araújo</a
        ></span
      >
    </v-system-bar>

    <v-app-bar>
      <v-avatar class="ml-4" size="64">
        <img src="/img/aiko.png" alt="Aiko logo" width="60px" />
      </v-avatar>
    </v-app-bar>

    <v-main>
      <v-container class="h-100 ma-0 pa-0" fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
