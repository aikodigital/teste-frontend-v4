<template>
    <v-card class="w-100" variant="outlined">
        <v-data-table :items-per-page="itemsPorPagina" :headers="headers" :items="items" :height="height"
            :search="search" class="elevation-0" no-data-text="Não há dados disponíveis." density="compact">
            <template v-slot:[`item.date`]="{ item }">
                {{ funcoesEquipamento.modificarData(item.date) }}
            </template>
            <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="item.corStatus">{{ item.status }}</v-chip>
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

defineProps({
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
</script>