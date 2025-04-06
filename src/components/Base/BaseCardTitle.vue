<script setup lang="ts">
const props = defineProps<{title: string, icon: string}>()
</script>

<template>
  <v-card
    flat
    color="primary"
  >
    <v-card-title class="custom-card-title">
      {{ props.title }}
      <v-icon
        class="custom-card-title__icon"
        color="secondary"
      >
        {{ props.icon }}
      </v-icon>
    </v-card-title>
  </v-card>
</template>

<style lang="scss">
.custom-card-title {
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px !important;
  overflow: hidden !important;
  max-height: 80px !important;

  &__icon {
    font-size: 90px !important;
    opacity: 0.8;
  }
}
</style>