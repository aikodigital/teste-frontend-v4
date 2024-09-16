<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-avatar size="64" class="ml-8">
          <img src="/img/aiko.png" alt="Aiko logo" title="Aiko Logo" width="60px" />
        </v-avatar>
      </template>
    </v-app-bar>

    <v-main>
      <v-container class="h-100 ma-0 pa-0" fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
