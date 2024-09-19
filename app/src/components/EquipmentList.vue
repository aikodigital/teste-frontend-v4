<script setup lang="ts">
import type { VDataTable } from 'vuetify/components';

defineProps<{ equipments: { name: string; state: string; model: string; link: string }[] }>();

const headers: VDataTable['$props']['headers'] = [
  { title: 'Nome', key: 'name' },
  { title: 'Estado', key: 'state' },
  { title: 'Modelo', key: 'model' },
  { title: 'Link', key: 'link', sortable: false },
];
</script>

<template>
  <v-data-table-virtual :headers="headers" :items="equipments">
    <template v-slot:[`item.link`]="{ item: { link } }">
      <v-btn :to="link" icon="mdi-eye" flat></v-btn>
    </template>
  </v-data-table-virtual>
</template>
