<script setup lang="ts">
const props = withDefaults(defineProps<{
  color?: string
}>(),{
  color: '#6B7280'
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-menu-2"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    :stroke="props.color"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 6l16 0" />
    <path d="M4 12l16 0" />
    <path d="M4 18l16 0" />
  </svg>
</template>
