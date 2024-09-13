<template>
  <v-row>
    <v-col>
      <v-img :width="160" aspect-ratio="16/9" cover :src="aikoImage"></v-img>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import aikoImage from '@/assets/aiko.png'
</script>