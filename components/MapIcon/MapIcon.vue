<script lang="ts" setup>
const props = defineProps<{
  icon: string
  color: string
}>()
</script>

<template>
  <LIcon class-name="bg-transparent" :icon-size="[30, 30]">
    <StateDot class="absolute -right-1 -top-1" :color="color" :animate="true" />
    <div class="relative flex size-full items-center justify-center rounded-full bg-foreground">
      <Icon class="text-white" :name="props.icon" size="24" />
    </div>
  </LIcon>
</template>
