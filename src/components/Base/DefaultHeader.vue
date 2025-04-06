
<script setup lang="ts">
import { useRouter } from 'vue-router';
import logo from '@/assets/logo.png';

const router = useRouter();
</script>

<template>
  <v-app-bar
    class="flex px-4"
    height="64"
    :elevation="2"
  >
    <template #prepend>
      <img
        class="cursor-pointer"
        :src="logo"
        alt="Logo"
        width="100"
        @click="() => router.push('/')"
      >
    </template>

    <v-divider
      :thickness="1"
      class="ml-4"
      inset
      vertical
      opacity="100"
    />

    <v-app-bar-title>
      <p class="d-sm-block d-none text-primary">
        <strong>Trackipment</strong> - Gestão eficiente
      </p>
    </v-app-bar-title>

    <v-spacer />
  </v-app-bar>
</template>
