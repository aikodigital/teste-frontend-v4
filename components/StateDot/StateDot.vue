<script lang="ts" setup>
const props = withDefaults(defineProps<{
  color: string
  animate?: boolean
}>(), {
  animate: true,
})

const animate = computed(() => {
  return props.animate ? 'animate-ping' : ''
})
</script>

<template>
  <div v-if="props.color" class="flex items-center justify-center gap-0.5">
    <div class="relative flex size-full items-center justify-center">
      <span class="relative z-10 size-4 rounded-full" :class="[props.color]" />
      <span class="absolute inset-0 z-20 size-4 rounded-full" :class="[props.color, animate]" />
    </div>
  </div>
</template>
