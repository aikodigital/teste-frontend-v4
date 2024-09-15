<template>
    <v-select
        :value="value"
        :items="items" 
        :label="label"
        variant="outlined" 
        density="compact"
        no-data-text="Não há dados disponíveis."
        persistent-placeholder
    />
</template>

<script setup>
defineProps({
    value: Array,
    items: {
        type: Array || Function,
        required: true,
        default: [],
    },
    label: {
        type: String,
        required: true,
        default: 'Campo',
    },
})
</script>