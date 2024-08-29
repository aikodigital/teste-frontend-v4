<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'

interface Props {
  icon: string
  width?: string
}

defineProps<Props>()
</script>

<template>
  <IconifyIcon
    :icon
    :width
  />
</template>
