<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

interface Option {
  label: string | number | any;
  value: string | number;
}

const props = defineProps<{
  id?: string;
  label?: string;
  options: Option[];
  value?: string | number;
  placeholder?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const selectedValue = ref<string | number>(props.value || "");

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  selectedValue.value = target.value;
  emit("update:modelValue", selectedValue.value);
};
</script>

<template>
  <div class="my-3">
    <select
      :id="id"
      v-model="selectedValue"
      @change="handleChange"
      :placeholder="placeholder"
      class="border border-[#676767] cursor-pointer text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-[#002087] block w-full p-2.5 bg-white"
    >
      <option v-if="props.label" value="" class="text-[#676767]">
        {{ props.label }}
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
