<script setup lang="ts">
import { type QToggleProps } from 'quasar'
import { ref } from 'vue'

const emits = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<QToggleProps>(), {
  color: 'primary'
})

const toggleModel = ref(props.modelValue)

const emitValueChange = (value: boolean) => {
  emits('update:modelValue', value)
}
</script>

<template>
  <q-toggle
    v-model:model-value="toggleModel"
    :label="props.label"
    :color="props.color"
    @update:modelValue="emitValueChange"
  />
</template>
<style scoped>
.base-btn {
  height: 30px;
}
</style>
