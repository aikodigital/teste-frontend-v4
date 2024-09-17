<template>
    <v-dialog v-model="mostrarDialogoStatus" max-width="700px" min-width="200px" persistent>
        <v-card>
            <v-card-title class="d-flex justify-center font-weight-bold">
                {{ `Histórico de Status: ${nomeEquipamento}` }}
            </v-card-title>
            <v-divider />
            <v-card-text class="d-flex flex-column">
                <SelectField v-model="busca" label="Buscar Status" :items="statusABuscar" />
                <DataTable :headers="headers" :items="listaStatus" :search="busca !== 'Todos' ? busca : ''"
                    height="30vh" />
            </v-card-text>
            <v-divider />
            <v-card-actions class="d-flex justify-center">
                <Button cor="buttonColor" variante="text" @click="fecharDialogo()">Fechar</Button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import Button from '@/components/VButton.vue';
import DataTable from '@/components/DataTable.vue';
import { funcoesEquipamento } from '@/util/funcoesEquipamentos';
import SelectField from '@/components/SelectField.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
        required: true
    },
    equipamento: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['fecharDialogoStatus']);

const busca = ref('Todos');
const nomeEquipamento = ref('');
const listaStatus = ref([]);
const headers = ref([
    { title: 'Data', align: 'center', key: 'date' },
    { title: 'Status', align: 'start', key: 'status' },
]);
const statusABuscar = ref(['Todos', 'Operando', 'Manutenção', 'Parado']);

const mostrarDialogoStatus = computed(() => props.show);

onMounted(() => {
    buscarHistoricoStatus();
});

const buscarHistoricoStatus = async () => {
    const separarNome = props.equipamento.split(',');
    const nome = separarNome[0].replace('Nome: ', '');
    const historicoDoEquipamento = await funcoesEquipamento.retornarHistoricoStatusEquipamento(nome);

    nomeEquipamento.value = nome;
    listaStatus.value = historicoDoEquipamento.historico;
};

const fecharDialogo = () => {
    emit('fecharDialogoStatus');
};
</script>