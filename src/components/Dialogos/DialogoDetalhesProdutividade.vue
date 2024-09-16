<template>
    <v-dialog v-model="mostrarDialogoDetalhes" max-width="700px" min-width="200px" persistent>
        <v-card>
            <v-card-title class="d-flex justify-center font-weight-bold">
                {{ `Histórico de Status do Dia: ${historico.data.split('-').reverse().join('/')}` }}
            </v-card-title>
            <v-divider />
            <v-card-text class="d-flex flex-column">
                <DataTable :headers="headers" :items="listaStatus" height="30vh" />
            </v-card-text>
            <v-divider />
            <v-card-actions class="d-flex justify-center">
                <Button cor="buttonColor" variante="text" @click="fecharDialogo()">Fechar</Button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import Button from '@/components/VButton.vue';
import DataTable from '@/components/DataTable.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    historico: {
        type: Object,
    }
});

const emit = defineEmits(['fecharDialogoDetalhar']);

const headers = ref([
    { title: 'Data', align: 'center', key: 'date' },
    { title: 'Status', align: 'start', key: 'status' },
]);

const listaStatus = computed(() => props.historico.items);
const mostrarDialogoDetalhes = computed(() => props.show);

const fecharDialogo = () => {
    emit('fecharDialogoDetalhar');
};
</script>