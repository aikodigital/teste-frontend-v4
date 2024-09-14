<script setup lang="ts">
import { type QInputProps } from 'quasar'
import { ref, watch } from 'vue'

interface InputProps extends QInputProps {
  placeholder?: string
}

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<InputProps>(), {
  dense: true,
  outlined: true,
  color: 'primary'
})

const inputValue = ref(props.modelValue)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <q-input
    class="q-mr-md"
    v-model:model-value="inputValue"
    :debounce="props.debounce"
    :placeholder="props.placeholder"
    :label="props.label"
    :outlined="props.outlined"
    :dense="props.dense"
    :color="props.color"
  >
    <template v-slot:append>
      <slot name="append" />
    </template>
  </q-input>
</template>
