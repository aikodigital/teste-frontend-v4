<template>
  <q-item
    clickable
    @click="$emit('update:selectedItem', data.path)"
    :to="data.path"
    :class="`bg-${selected ? 'secondary' : 'inherit'} text-white`"
  >
    <q-item-section avatar>
      <q-icon :name="`bi-${data.icon}`" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ data.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
defineProps({
  data: Object,
  selected: Boolean,
})
</script>
