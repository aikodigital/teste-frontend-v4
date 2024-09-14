<script setup lang="ts">
import { type QSelectProps } from 'quasar'
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<QSelectProps>(), {
  dense: true,
  outlined: true,
  color: 'primary'
})

const selectValue = ref(props.modelValue)

const emitValueChange = (value: any) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <q-select
    v-model:modelValue="selectValue"
    :options="props.options"
    :label="props.label"
    :outlined="props.outlined"
    :dense="props.dense"
    :optionLabel="props.optionLabel"
    :optionValue="props.optionValue"
    :clearable="props.clearable"
    @update:modelValue="emitValueChange"
  />
</template>
