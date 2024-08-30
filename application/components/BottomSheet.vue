<template>
  <div class="bottom-sheet">
    <div class="bottom-sheet-bd" @click="emit('on-close')">
      <span class="sr-only">Close BottomSheet</span>
    </div>

    <div class="bottom-sheet-body">
      <div class="bottom-sheet-head">
        <strong class="bottom-sheet-title">{{ title }}</strong>
        <button class="bottom-sheet-x" type="button" @click="emit('on-close')">
          <PhosphorIconXCircle weight="thin" />
          <span class="sr-only">Close BottomSheet</span>
        </button>
      </div>
      <div class="bottom-sheet-container">
        <slot />
      </div>
    </div>
  </div>
<!-- animate__fadeInUp animate__animated -->
</template>

<script setup lang="ts">

const emit = defineEmits(['on-close'])
const props = defineProps<{
  title?: string
}>()

</script>

<style scoped>
.bottom-sheet {
  @apply fixed top-0 left-0 w-screen h-screen flex flex-row items-end z-50
}

.bottom-sheet-bd {
  @apply absolute top-0 left-0 w-screen h-screen bg-slate-800 bg-opacity-80 z-0
}

.bottom-sheet-body {
  @apply relative w-full bg-white z-10
}

.bottom-sheet-head {
  @apply absolute top-0 left-0 w-full px-4 py-2 flex flex-row justify-between bg-white
}

.bottom-sheet-title {
  @apply font-normal text-xl text-slate-900
}

.bottom-sheet-x {
  @apply text-4xl text-rose-600 hover:text-rose-900
}

.bottom-sheet-container {
  @apply min-h-[30vh] max-h-[70vh] overflow-y-auto p-4 mt-12 w-full overflow-x-hidden
}
</style>