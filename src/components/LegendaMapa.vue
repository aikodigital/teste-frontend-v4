<template>
    <v-card variant="outlined" class="px-4 py-2">
      <v-card-title class="text-center">Legenda</v-card-title>
      <v-list>
        <v-list-item v-for="status in uniqueStatuses" :key="status.id">
          <v-avatar
            :color="status.color"
            variant="flat"
            size="x-small"
            class="mr-2"
          />
          <span>{{ status.name }}</span>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import statuses from '@/data/equipmentState.json';
  
  const uniqueStatuses = computed(() => {
    return Array.from(
      new Set(statuses.map((status) => JSON.stringify(status)))
    ).map((status) => JSON.parse(status));
  });
  </script>
  