<script setup lang="ts">
import { Field, defineRule } from "vee-validate";
import * as validations from "@/utils/validators";

const objValid: any = validations;

Object.keys(objValid).forEach((x: string) => {
  defineRule(x, objValid[x]);
});

const props = defineProps<{
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  min?: number;
  valueInput?: string;
  disabled?: boolean;
  rules?: string;
}>();

const value = defineModel();

function change() {
  emit("change");
}

const emit = defineEmits(["change"]);
</script>

<template>
  <Field
    v-slot="{ field, errorMessage }"
    v-model="value"
    :name="name"
    :rules="rules"
  >
    <div class="flex flex-col gap-1 w-full mb-1">
      <label class="font-500 text-[#111928]">{{ props.label }}</label>
      <div class="relative">
        <div
          v-if="$slots.icon"
          class="absolute inset-y-0 start-0 flex items-center ps-3"
        >
          <slot name="icon" />
        </div>
        <div
          v-if="$slots.suffix"
          class="absolute inset-y-0 end-0 flex items-center px-3"
        >
          <slot name="suffix" />
        </div>
        <input
          v-bind="{ ...field, ...$attrs }"
          :min="min"
          v-model="value"
          class="block bg-[#F9FAFB] w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg transition focus:ring-primary focus:border-primary focus:outline-none"
          :class="{
            'border-danger': errorMessage,
            'border-par-gray-light': !errorMessage,
            'bg-par-gray-lightest': props.disabled,
            'ps-12': $slots.icon,
          }"
          :type="props.type"
          :placeholder="props.placeholder"
          :disabled="disabled"
          @change="change"
        />
      </div>
      <div v-if="errorMessage" class="mx-2 mt-[-5px]">
        <span class="text-danger text-sm">{{ errorMessage }}</span>
      </div>
    </div>
  </Field>
</template>

<style scoped>
input::placeholder {
  color: #6b7280;
}
</style>
