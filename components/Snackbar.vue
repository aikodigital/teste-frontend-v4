<template>
  <v-snackbar v-model="show" :timeout="timeout" :color="color" location="bottom right">
    {{ message }}

    <template #actions>
      <v-btn icon="$close" size="x-small" variant="plain" @click="show = false" />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '@composables/utilities/useSnackbar';
import { storeToRefs } from 'pinia';

const snackBarStore = useSnackbarStore()
const { color, message, show, timeout } = storeToRefs(snackBarStore)
</script>

<style scoped></style>