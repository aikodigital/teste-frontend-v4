<template>
    <v-btn
        :append-icon="iconeInicial"
        :color="cor"
        :variant="variante"
        :loading="loading"
        :disabled="desabilitar"
    >
        <slot />
    </v-btn>
</template>

<script setup>
defineProps({
    iconeInicial: String,
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
    desabilitar: Boolean
})
</script>