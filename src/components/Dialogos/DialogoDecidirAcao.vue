<template>
    <v-dialog 
        v-model="mostrarDialogoDecidirAcao" 
        max-width="500px"
        min-width="350px"
        persistent
    >
        <v-card>
            <v-card-title class="d-flex justify-center font-weight-bold">
                Escolha a ação
            </v-card-title>
            <v-divider />
            <v-card-text class="d-flex flex-column ga-5">
                <Button v-if="!estaNoHistorico" :loading="loading" @click="historicoPosicoes()">Ver Histórico Posições</Button>
                <Button v-else :loading="loading" @click="ultimasPosicoes()">Ver Últimas Posições</Button>
                <Button :loading="loading" @click="historicoStatus()">Ver Histórico Status</Button>
            </v-card-text>
            <v-divider />
            <v-card-actions class="d-flex justify-center">
                <Button cor="buttonColor" variante="text" @click="fecharDialogo()">Cancelar</Button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import Button from '@/components/VButton.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
        required: true,
    },
    estaNoHistorico: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const emit = defineEmits(['fecharDialogoDecidirAcao', 'verHistoricoPosicoes', 'verHistoricoStatus', 'verUltimasPosicoes']);

const loading = ref(false);

const mostrarDialogoDecidirAcao = computed(() => props.show);

const historicoPosicoes = () => {
    loading.value = true;
    emit('verHistoricoPosicoes');
};

const ultimasPosicoes = () => {
    loading.value = true;
    emit('verUltimasPosicoes');
};

const historicoStatus = () => {
    loading.value = true;
    emit('verHistoricoStatus');
};

const fecharDialogo = () => {
    emit('fecharDialogoDecidirAcao');
};
</script>