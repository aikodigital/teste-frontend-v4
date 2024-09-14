<script setup lang="ts">
import { type QBtnProps } from 'quasar'

const props = withDefaults(defineProps<QBtnProps>(), {
  noCaps: true,
  unelevated: true,
  color: 'primary'
})

const emit = defineEmits(['click'])
</script>

<template>
  <q-btn
    class="base-btn"
    :color="props.color"
    :label="props.label"
    :no-caps="props.noCaps"
    :unelevated="props.unelevated"
    :icon="props.icon"
    :icon-right="props.iconRight"
    @click="emit('click')"
  />
</template>
<style scoped>
.base-btn {
  height: 30px;
}
</style>
