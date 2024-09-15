<template>
  <Card :titulo="titulo" cor="colorCardPrincipal">
    <v-row dense class="py-5 justify-end align-center">
      <v-col cols="2">
        <span>Caminhão de carga</span>
        <v-switch v-model="mostrarCaminhaoDeCarga" color="#FF5733" inset :disabled="estaEmHistorico"
          @update:model-value="criarMarcadoresUltimaPosicao(true)" />
      </v-col>
      <v-col cols="2">
        <span>Harvester</span>
        <v-switch v-model="mostrarHarvester" color="#583470" inset :disabled="estaEmHistorico"
          @update:model-value="criarMarcadoresUltimaPosicao(true)" />
      </v-col>
      <v-col cols="2">
        <span>Garra traçadora</span>
        <v-switch v-model="mostrarGarraTracadora" color="#33FF57" inset :disabled="estaEmHistorico"
          @update:model-value="criarMarcadoresUltimaPosicao(true)" />
      </v-col>
      <v-col cols="2" class="float-right">
        <SelectField v-model="buscaPorStatus" label="Status" :items="statusABuscar"
          :disabled="estaEmHistorico || comFiltroNome" @update:model-value="modificarPorStatus()" />
        <v-autocomplete v-model="nomesSelecionados" label="Nome" item-title="nome" item-value="nome" :multiple="true"
          :items="nomesEquipamentos" no-data-text="Não há dados disponíveis." variant="outlined" density="compact"
          persistent-placeholder clearable :disabled="estaEmHistorico || comFiltroStatus" @update:model-value="modificarPorNome()">
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 1">
              <span>{{ item.title }}</span>
            </v-chip>
            <span v-if="index === 1" class="text-grey text-caption align-self-center">
              (+{{ nomesSelecionados.length - 1 }})
            </span>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-card class="w-75 d-flex justify-center mx-auto">
      <v-card-text class="bg-colorCardMap pt-4" variant="outlined">
        <div id="map" ref="initialMap"></div>
      </v-card-text>
    </v-card>
    <DialogoDecidirAcao v-if="mostrarDialogoDecidirAcao" :show="mostrarDialogoDecidirAcao"
      :estaNoHistorico="estaEmHistorico" @fecharDialogoDecidirAcao="mostrarDialogoDecidirAcao = false"
      @verHistoricoPosicoes="buscarHistoricoPosicoes" @verHistoricoStatus="abrirDialogoStatus"
      @verUltimasPosicoes="criarMarcadoresUltimaPosicao(true)" />
    <DialogoStatus v-if="mostrarDialogoStatus" :show="mostrarDialogoStatus" :equipamento="marcadorSelecionado"
      @fecharDialogoStatus="mostrarDialogoStatus = false" />
  </Card>
</template>

<script setup>
import { onMounted, ref, shallowRef } from "vue";
import { funcoesEquipamento } from "@/util/funcoesEquipamentos";
import { filtroEquipamento } from "@/util/filtroEquipamentos";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Card from "@/components/CardPrincipal.vue";
import DialogoDecidirAcao from "@/components/Dialogos/DialogoDecidirAcao.vue";
import DialogoStatus from "@/components/Dialogos/DialogoStatus.vue";
import SelectField from "@/components/SelectField.vue";

const buscaPorStatus = ref('Todos');
const titulo = ref("Posição mais recente dos equipamentos");
const initialMap = shallowRef(null);
const layerGroup = shallowRef(L.layerGroup());
const marcadorSelecionado = ref(null);
const mostrarDialogoDecidirAcao = ref(false);
const mostrarDialogoStatus = ref(false);
const estaEmHistorico = ref(false);
const mostrarCaminhaoDeCarga = ref(true);
const mostrarHarvester = ref(true);
const mostrarGarraTracadora = ref(true);
const comFiltroStatus = ref(false);
const comFiltroNome = ref(false);
const equipamentosComUltimaPosicao = ref(funcoesEquipamento.retornarUltimaPosicao());
const equipamentoFiltrado = ref([]);
const nomesEquipamentos = ref([]);
const nomesSelecionados = ref([]);
const statusABuscar = ref(['Todos', 'Operando', 'Manutenção', 'Parado']);

onMounted(() => {
  initialMap.value = L.map('map').setView([-19.151801, -46.007759], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(initialMap.value);

  criarMarcadoresUltimaPosicao();
  nomesEquipamentos.value = equipamentosComUltimaPosicao.value.map((equip) => ({ nome: equip.nome }))
});

const definirCorMarcador = (cor) => {
  const marcadorEstilizado = `
    background-color: ${cor};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 2rem 2rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`
  return L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${marcadorEstilizado}" />`
  });
};

const criarMarcadoresUltimaPosicao = async (ehParaRecolocar = false) => {
  if (ehParaRecolocar) {
    layerGroup.value.clearLayers();
  }

  if (comFiltroStatus.value) {
    const equipamentosPorStatus = equipamentosComUltimaPosicao.value.filter((equipamentoVerificar) => equipamentoVerificar.ultimoStatus === buscaPorStatus.value);
    equipamentoFiltrado.value = await filtroEquipamento.filtrarEquipamento(
      equipamentosPorStatus,
      mostrarCaminhaoDeCarga.value,
      mostrarHarvester.value,
      mostrarGarraTracadora.value
    );
  } else if (comFiltroNome.value) {
    const equipamentosPorStatus = equipamentosComUltimaPosicao.value.filter((equipamentoVerificar) => nomesSelecionados.value.includes(equipamentoVerificar.nome));
    equipamentoFiltrado.value = await filtroEquipamento.filtrarEquipamento(
      equipamentosPorStatus,
      mostrarCaminhaoDeCarga.value,
      mostrarHarvester.value,
      mostrarGarraTracadora.value
    );
  } else {
    equipamentoFiltrado.value = await filtroEquipamento.filtrarEquipamento(
      equipamentosComUltimaPosicao.value,
      mostrarCaminhaoDeCarga.value,
      mostrarHarvester.value,
      mostrarGarraTracadora.value
    );
  }

  equipamentoFiltrado.value.forEach(equipamento => {
    const marcador = L.marker([equipamento.ultimaPosicao.lat, equipamento.ultimaPosicao.lon], { icon: definirCorMarcador(equipamento.corMarcador) })
      .bindPopup(`Nome: ${equipamento.nome}, <br> Modelo: ${equipamento.modelo}, <br> Data: ${equipamento.dataHora}, <br> Status: ${equipamento.ultimoStatus}`)
      .on('click', function (e) {
        marcadorSelecionado.value = e.target._popup._content;
        mostrarDialogoDecidirAcao.value = true;
      })
      .on('mouseover', function () {
        this.openPopup();
      });
    layerGroup.value.addLayer(marcador);
  });

  titulo.value = "Posição mais recente dos equipamentos";
  mostrarDialogoDecidirAcao.value = false;
  estaEmHistorico.value = false;
  initialMap.value.addLayer(layerGroup.value); // Erro que não é uma função no console, mas na documentação está correta e funciona normalmente.
};

const buscarHistoricoPosicoes = () => {
  layerGroup.value.clearLayers();
  const separarNome = marcadorSelecionado.value.split(',');
  const nome = separarNome[0].replace('Nome: ', '');
  const historicoDoEquipamento = funcoesEquipamento.retornarHistoricoPosicaoEquipamento(nome);
  historicoDoEquipamento.historico.forEach(historicoEquipamento => {
    const marcador = L.marker([historicoEquipamento.lat, historicoEquipamento.lon], { icon: definirCorMarcador(historicoDoEquipamento.corMarcador) })
      .bindPopup(`Nome: ${historicoDoEquipamento.nome}, <br> Modelo: ${historicoDoEquipamento.modelo}, <br> Data: ${historicoEquipamento.dataHora}`)
      .openPopup()
      .on('click', function (e) {
        marcadorSelecionado.value = e.target._popup._content;
        mostrarDialogoDecidirAcao.value = true;
      })
      .on('mouseover', function () {
        this.openPopup();
      });
    layerGroup.value.addLayer(marcador);
  });

  titulo.value = "Histórico de posições";
  mostrarDialogoDecidirAcao.value = false;
  estaEmHistorico.value = true;
  initialMap.value.addLayer(layerGroup.value); // Erro que não é uma função no console, mas na documentação está correta e funciona normalmente.
};

const modificarPorStatus = () => {
  if (buscaPorStatus.value !== 'Todos') {
    comFiltroStatus.value = true;
  } else {
    comFiltroStatus.value = false;
  }

  criarMarcadoresUltimaPosicao(true);
};

const modificarPorNome = () => {
  if (nomesSelecionados.value.length > 0) {
    comFiltroNome.value = true;
    buscaPorStatus.value = 'Todos';
  } else {
    comFiltroNome.value = false;
  }
  criarMarcadoresUltimaPosicao(true);
};

const abrirDialogoStatus = () => {
  mostrarDialogoDecidirAcao.value = false;
  mostrarDialogoStatus.value = true;
};
</script>

<style scoped>
#map {
  height: 60vh;
  min-width: 60%;
}
</style>