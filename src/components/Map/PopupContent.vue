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
      <q-icon name="bi-info-circle" color="primary" size="sm" />
      <p class="font-bold text-lg truncate text-primary w-[200px] lg:w-[300px]">
        {{ data?.model }}
      </p>
    </div>
    <div class="flex flex-nowrap items-center justify-start gap-3 mt-[10px]">
      <q-icon name="bi-circle-fill" :style="{ color: data.state.color }" size="sm" />
      <p class="font-bold text-lg truncate text-primary w-[200px] lg:w-[300px]">
        {{ data?.state.name }}
      </p>
    </div>
    <div class="flex flex-nowrap items-center justify-start gap-3 mt-[10px]">
      <q-icon name="bi-calendar-event" color="primary" size="sm" />
      <p class="font-bold text-lg truncate text-primary w-[200px] lg:w-[300px]">
        {{ date.formatDate(data?.position.date, 'DD/MM/YYYY - HH:mm:ss ') }}
      </p>
    </div>
    <q-btn :to="`/history/${data?.id}`" label="Historico de Estados" color="primary" />
  </div>
</template>
<script setup>
import { date } from 'quasar'

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
