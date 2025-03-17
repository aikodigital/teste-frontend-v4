<script setup lang="ts">
// Composables
const emit = defineEmits(['update:modelValue']);
defineProps<{
	tabs: {
		name: string;
		label: string;
		show?: boolean;
	}[];
	modelValue: string;
}>();

// Functions
function handleChange(value: string) {
	emit('update:modelValue', value);
}
</script>

<template>
	<header class="w-full flex overflow-auto gap-3 mb-5 border-b border-b-gray-200">
		<section
			v-for="(tab, index) in tabs.filter((item) => typeof item.show === 'undefined' || item.show)"
			:key="index"
			class="px-3 py-2 text-nowrap cursor-pointer font-normal duration-200 rounded border border-transparent border-b-transparent rounded-b-none"
			:class="{ '!border-gray-200 !border-b-transparent': modelValue === tab.name }"
			@click="handleChange(tab.name)"
		>
			{{ tab.label }}
		</section>
	</header>
	<slot :name="modelValue" />
</template>
