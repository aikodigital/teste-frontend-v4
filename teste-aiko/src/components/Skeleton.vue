<script setup lang="ts">
defineProps<{
  isLoading: boolean,
}>();

defineOptions({
  inheritAttrs: false
});
</script>

<template>
  <span>
    <span
      v-if="isLoading"
      data-testid="skeleton"
    >
      <slot name="skeleton">
        <div
          class="skeleton"
          v-bind="$attrs"
        ></div>
      </slot>
    </span>
    <slot v-else />
  </span>
</template>

<style scoped>
.skeleton {
  @apply animate-pulse min-w-[180px] h-4 bg-gray-300 rounded-md cursor-wait
}
</style>