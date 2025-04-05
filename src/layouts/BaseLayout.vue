<template>
  <div class="d-flex flex-column vh-100">
    <BaseHeader />
    <div class="d-flex flex-grow-1">
      <BaseSidebar />
      <main class="flex-grow-1 p-1">
        <slot></slot>
      </main>
    </div>
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/BaseHeader.vue";
import BaseSidebar from "@/components/BaseSidebar.vue";
import BaseFooter from "@/components/BaseFooter.vue";
</script>

<style scoped></style>
