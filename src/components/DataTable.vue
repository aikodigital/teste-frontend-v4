<template>
    <v-card class="w-100" variant="outlined">
        <v-data-table :items-per-page="itemsPorPagina" :headers="headers" :items="retornaItems" :height="height"
            :search="search" class="elevation-0" no-data-text="Não há dados disponíveis." density="compact">
            <template v-slot:[`item.acoes`]="{ item }">
                <v-tooltip text="Detalhes" location="end">
                    <template v-slot:activator="{ props }">
                        <v-icon icon="mdi-clipboard" size="large" color="primary" v-bind="props"
                            @click="visualizarDetalhes(item)" />
                    </template>
                </v-tooltip>
            </template>
            <template v-slot:[`item.date`]="{ item }">
                {{ funcoesEquipamento.modificarData(item.date) }}
            </template>
            <template v-slot:[`item.data`]="{ item }">
                {{ item.data.split('-').reverse().join('/') }}
            </template>
            <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="item.corStatus">{{ item.status }}</v-chip>
            </template>
            <template v-slot:[`item.porcentagemProdutividade`]="{ item }">
                {{ item.porcentagemProdutividade.toFixed(2).replace('.', ',') }}
            </template>
            <template v-slot:[`item.totalGanho`]="{ item }">
                {{ `R$ ${item.totalGanho.toFixed(2).replace('.', ',')}` }}
            </template>
            <template v-slot:bottom>
                <v-data-table-footer class="border-t" page-text="{0}-{1} de {2}" items-per-page-text="Items por página:"
                    :items-per-page-options="opcoesPagina">
                </v-data-table-footer>
            </template>
        </v-data-table>
    </v-card>
</template>

<script setup>
import { funcoesEquipamento } from '@/util/funcoesEquipamentos';
import { computed } from 'vue';

const props = defineProps({
    headers: {
        type: Array,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    itemsPorPagina: {
        default: 50,
        required: false,
        type: Number,
    },
    height: {
        type: String,
        default: '68vh',
        required: false,
    },
    search: {
        type: String,
        required: false,
        default: null,
    },
    opcoesPagina: {
        type: Array || Function,
        required: false,
        default: [
            { value: 10, title: '10' },
            { value: 25, title: '25' },
            { value: 50, title: '50' },
        ]
    },
});

const emit = defineEmits(['itemDetalhar']);

const retornaItems = computed(() => props.items)

const visualizarDetalhes = (dadosItem) => {
    emit('itemDetalhar', dadosItem);
};
</script>