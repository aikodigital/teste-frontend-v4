<template>
  <CardPrincipal titulo="Produtividade dos Equipamentos" cor="colorCardPrincipal">
    <v-row dense class="py-3">
      <v-col lg="2" md="4" sm="5" cols="12">
        <v-autocomplete v-model="nomeSelecionado" label="Nome" item-title="nome" item-value="nome"
          :items="nomesEquipamentos" no-data-text="Não há dados disponíveis." variant="outlined" density="compact"
          persistent-placeholder @update:model-value="filtrarPorNome()" />
      </v-col>
      <v-col lg="4" md="4" sm="4" cols="12" class="ml-2 py-sm-4 pb-sm-0 pb-5">
        <span>Modelo: {{ modelo }}</span>
      </v-col>
      <DataTable :headers="headers" :items="retornaListaProdutividade" height="68vh" @itemDetalhar="mostrarDetalhes" />
    </v-row>
    <DialogoDetalhesProdutividade v-if="mostrarDialogoDetalhesProdutividade" :show="mostrarDialogoDetalhesProdutividade"
      :historico="diaDetalhar" @fecharDialogoDetalhar="mostrarDialogoDetalhesProdutividade = false" />
  </CardPrincipal>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { funcoesEquipamento } from '@/util/funcoesEquipamentos';
import { funcoesProdutividadeEquipamento } from '@/util/funcoesProdutividadeEquipamento';
import CardPrincipal from '@/components/CardPrincipal.vue';
import DataTable from '@/components/DataTable.vue';
import DialogoDetalhesProdutividade from '@/components/Dialogos/DialogoDetalhesProdutividade.vue';

const nomeSelecionado = ref('');
const modelo = ref('');
const mostrarDialogoDetalhesProdutividade = ref(false);
const diaDetalhar = ref(null);
const nomesEquipamentos = ref([]);
const equipamentosComUltimaPosicao = ref(funcoesEquipamento.retornarUltimaPosicao());
const headers = ref([
  { title: 'Data', align: 'start', key: 'data' },
  { title: 'Total Parado', align: 'start', key: 'totalParado' },
  { title: 'Total Manutenção', align: 'start', key: 'totalManutencao' },
  { title: 'Total Operando', align: 'start', key: 'totalOperando' },
  { title: '% Produtividade', align: 'start', key: 'porcentagemProdutividade' },
  { title: 'Total Ganho', align: 'start', key: 'totalGanho' },
  { title: 'Ações', align: 'center', key: 'acoes', sortable: false },
])
const listaProdutividade = ref([]);
const retornaListaProdutividade = computed(() => listaProdutividade.value);

onMounted(() => {
  nomesEquipamentos.value = equipamentosComUltimaPosicao.value.map((equip) => ({ nome: equip.nome }));

  nomeSelecionado.value = nomesEquipamentos.value[0].nome;
  filtrarPorNome(nomeSelecionado.value);
})

const filtrarPorNome = async (nome = '') => {
  if (nome) {
    const equipamentoBuscado = await funcoesProdutividadeEquipamento.listaEquipamentos.find((equipamento) => equipamento.nome === nome);
    modelo.value = equipamentoBuscado.modelo;
    listaProdutividade.value = equipamentoBuscado.listaStatus;
  } else {
    const equipamentoBuscado = await funcoesProdutividadeEquipamento.listaEquipamentos.find((equipamento) => equipamento.nome === nomeSelecionado.value);
    modelo.value = equipamentoBuscado.modelo;
    listaProdutividade.value = equipamentoBuscado.listaStatus;
  }
};

const mostrarDetalhes = (item) => {
  diaDetalhar.value = item;
  mostrarDialogoDetalhesProdutividade.value = true;
}
</script>