<template>
    <v-btn
        :color="cor"
        :variant="variante"
        :loading="loading"
    >
        <slot />
    </v-btn>
</template>

<script setup>
defineProps({
    cor: {
        default: 'primary',
        required: false,
        type: String,
    },
    variante: {
        default: 'flat',
        required: false,
        type: String,
    },
    loading: {
        default: false,
        required: false,
        type: Boolean,
    },
})
</script>