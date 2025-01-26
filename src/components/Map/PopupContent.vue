<template>
  <div
    class="w-[250px] lg:w-[350px] h-auto flex flex-col gap-3"
    :class="darkTheme.isActive ? 'bg-dark' : 'bg-white'"
  >
    <div class="flex flex-nowrap items-center justify-start gap-3 mt-[10px]">
      <q-icon name="bi-truck" color="primary" size="sm" />
      <p class="font-bold text-lg truncate text-primary w-[200px] lg:w-[300px]">
        {{ data?.name }}
      </p>
    </div>
    <div class="flex flex-nowrap items-center justify-start gap-3 mt-[10px]">
      <q-icon name="bi-date" color="primary" size="sm" />
      <p class="font-bold text-lg truncate text-primary w-[200px] lg:w-[300px]">
        {{ data?.date }}
      </p>
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: Object,
  },
  darkTheme: {
    type: Boolean,
    default: false,
  },
})
</script>
<style lang=""></style>
