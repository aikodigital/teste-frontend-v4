<template>
    <v-btn
        :append-icon="iconeInicial"
        :color="cor"
        :variant="variante"
        :type="tipo"
        :size="tamanho"
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
    tipo: String,
    tamanho: String,
    desabilitar: Boolean
})
</script>