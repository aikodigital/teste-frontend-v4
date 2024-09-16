<template>
    <v-card class="ma-5 w-100" :class="cor ? `bg-${cor}` : ''" min-height="90vh">
        <v-card-title v-if="titulo" class="d-flex justify-center pl-4 text-h5">{{ titulo }}</v-card-title>
        <v-card-text>
            <slot />
        </v-card-text>
    </v-card>
</template>

<script setup>
defineProps({
    titulo: String,
    cor: String,
})
</script>