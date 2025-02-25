<template>
  <section class="d-flex flex-row align-center justify-start ga-1 inter">
    <Icon :name="icon" size="2rem" /> <span>{{ equipmentName }}</span>
    <span v-if="!isLast">/</span>
  </section>
</template>

<script setup lang="ts">
interface Props {
  equipmentName: string,
  icon: string,
  isLast: boolean | null
}

defineProps<Props>()
</script>

<style scoped></style>