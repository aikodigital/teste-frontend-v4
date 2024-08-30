<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  label: string
  options: Array<{
    id: string
    name: unknown
  }>
  modelValue?: string
  placeholder?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

function handleChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement
  emit('update:modelValue', selectElement.value)
}
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">
        {{ label }}
      </span>
    </div>
    <select
      :value="localValue"
      :placeholder="placeholder"
      class="select select-bordered"
      @change="handleChange"
    >
      <option
        v-for="(option, index) in props.options"
        :key="index"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
  </label>
</template>
