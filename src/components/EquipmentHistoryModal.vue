<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Histórico do Equipamento - {{ equipment.name }}</h5>
          <button type="button" class="btn-close" @click="fecharModal"></button>
        </div>
        
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-6">
              <h6>Histórico de Estados</h6>
              <div class="d-flex justify-content-start flex-column mb-3">
                <small class="text-muted">
                  Exibindo {{ (paginaAtual - 1) * itensPorPagina + 1 }}-{{
                    Math.min(paginaAtual * itensPorPagina, historicoEstadosProcessado.length)
                  }} de {{ historicoEstadosProcessado.length }}
                </small>
                <div class="btn-group btn-group-sm">
                  <button 
                    class="btn btn-outline-secondary" 
                    @click="paginaAnterior"
                    :disabled="paginaAtual === 1"
                  >
                    &laquo;
                  </button>
                  <button 
                    v-for="pagina in paginasVisiveis" 
                    :key="pagina"
                    class="btn"
                    :class="paginaAtual === pagina ? 'btn-success' : 'btn-outline-secondary'"
                    @click="paginaAtual = pagina"
                  >
                    {{ pagina }}
                  </button>
                  <button 
                    class="btn btn-outline-secondary" 
                    @click="proximaPagina"
                    :disabled="paginaAtual === totalPaginas"
                  >
                    &raquo;
                  </button>
                </div>
              </div>
              
              <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table table-sm table-hover">
                  <thead class="sticky-top bg-light">
                    <tr>
                      <th>Data</th>
                      <th>Estado</th>
                      <th>Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(estado, index) in historicoPaginado" :key="estado.date">
                      <td>{{ formatarData(estado.date) }}</td>
                      <td>
                        <span class="badge" :style="{ backgroundColor: estado.color }">
                          {{ estado.nome }}
                        </span>
                      </td>
                      <td>
                        {{ index < historicoPaginado.length - 1 ? 
                          formatarDuracao(estado.date, historicoPaginado[index + 1].date) : 
                          'Atual' }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div class="col-lg-6 mt-4 mt-lg-0">
              <h6>Histórico de Posições</h6>
              <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table table-sm table-hover">
                  <thead class="sticky-top bg-light">
                    <tr>
                      <th>Data</th>
                      <th>Coordenadas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="posicao in equipment.positions.slice().reverse().slice(0, 30)" 
                        :key="posicao.date">
                      <td>{{ formatarData(posicao.date) }}</td>
                      <td>{{ posicao.lat.toFixed(6) }}, {{ posicao.lon.toFixed(6) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div class="mt-4">
            <h6>Estatísticas de Produtividade</h6>
            <div class="row">
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-title">Produtividade</h6>
                    <div class="d-flex align-items-center">
                      <div class="progress flex-grow-1 me-3" style="height: 20px;">
                        <div class="progress-bar bg-success" 
                             :style="{ width: percentualProdutividade + '%' }">
                        </div>
                      </div>
                      <span>{{ percentualProdutividade.toFixed(1) }}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4 my-3 my-lg-0">
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-title">Ganho Total</h6>
                    <h4 class="mb-0">R$ {{ ganhoTotal.toFixed(2) }}</h4>
                  </div>
                </div>
              </div>
              
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-title">Distribuição de Tempo</h6>
                    <div class="d-flex flex-wrap gap-1">
                      <span v-for="estado in distribuicaoTempo" :key="estado.id" 
                            class="badge" :style="{ backgroundColor: estado.color }">
                        {{ estado.nome }}: {{ estado.percentual.toFixed(1) }}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="modal-backdrop fade show"></div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Equipment } from '@/models';

const props = defineProps({
  equipment: {
    type: Object as () => Equipment,
    required: true
  }
});

const emit = defineEmits(['close']);

// Variáveis de paginação
const paginaAtual = ref(1);
const itensPorPagina = 30;
const paginasVisiveisMax = 5;

// Propriedades computadas
const historicoEstadosProcessado = computed(() => {
  if (!props.equipment.states || props.equipment.states.length === 0) return [];
  
  return props.equipment.states
    .map(estado => ({
      ...estado,
      nome: obterNomeEstado(estado.equipmentStateId),
      color: obterCorEstado(estado.equipmentStateId)
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

const historicoPaginado = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  return historicoEstadosProcessado.value.slice(inicio, fim);
});

const totalPaginas = computed(() => {
  return Math.ceil(historicoEstadosProcessado.value.length / itensPorPagina);
});

const paginasVisiveis = computed(() => {
  const intervalo = [];
  const inicio = Math.max(1, paginaAtual.value - Math.floor(paginasVisiveisMax / 2));
  const fim = Math.min(totalPaginas.value, inicio + paginasVisiveisMax - 1);
  
  for (let i = inicio; i <= fim; i++) {
    intervalo.push(i);
  }
  
  return intervalo;
});

// Métodos de paginação
function proximaPagina() {
  if (paginaAtual.value < totalPaginas.value) paginaAtual.value++;
}

function paginaAnterior() {
  if (paginaAtual.value > 1) paginaAtual.value--;
}

// Métodos auxiliares
function obterNomeEstado(idEstado: string): string {
  const estados = {
    '0808344c-454b-4c36-89e8-d7687e692d57': 'Operando',
    '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f': 'Parado',
    'baff9783-84e8-4e01-874b-6fd743b875ad': 'Manutenção'
  };
  return estados[idEstado as keyof typeof estados] || 'Desconhecido';
}

function obterCorEstado(idEstado: string): string {
  const cores = {
    '0808344c-454b-4c36-89e8-d7687e692d57': '#2ecc71',
    '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f': '#f39c12',
    'baff9783-84e8-4e01-874b-6fd743b875ad': '#e74c3c'
  };
  return cores[idEstado as keyof typeof cores] || '#999';
}

function formatarData(dataString: string): string {
  return new Date(dataString).toLocaleString('pt-BR');
}

function formatarDuracao(dataInicio: string, dataFim: string): string {
  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);
  const horas = (fim.getTime() - inicio.getTime()) / (1000 * 60 * 60);
  
  if (horas < 1) {
    const minutos = Math.round(horas * 60);
    return `${minutos}min`;
  } else if (horas < 24) {
    return `${horas.toFixed(1)}h`;
  } else {
    return `${(horas / 24).toFixed(1)}d`;
  }
}

const percentualProdutividade = computed(() => {
  if (!props.equipment.states || props.equipment.states.length === 0) return 0;
  
  const countOperando = props.equipment.states.filter(estado => 
    obterNomeEstado(estado.equipmentStateId) === 'Operando').length;
  
  return (countOperando / props.equipment.states.length) * 100;
});

const ganhoTotal = computed(() => {
  if (!props.equipment.states || !props.equipment.model) return 0;
  
  let total = 0;
  
  for (let i = 0; i < props.equipment.states.length - 1; i++) {
    const estadoAtual = props.equipment.states[i];
    const proximoEstado = props.equipment.states[i + 1];
    
    const horas = (new Date(proximoEstado.date).getTime() - new Date(estadoAtual.date).getTime()) / (1000 * 60 * 60);
    const valorPorHora = props.equipment.model.hourlyEarnings.find(
      e => e.equipmentStateId === estadoAtual.equipmentStateId
    )?.value || 0;
    
    total += horas * valorPorHora;
  }
  
  return total;
});

const distribuicaoTempo = computed(() => {
  if (!props.equipment.states || props.equipment.states.length < 2) return [];
  
  const distribuicao: Record<string, {
    id: string;
    nome: string;
    color: string;
    horas: number;
    percentual: number;
  }> = {};
  
  let totalHoras = 0;
  
  for (let i = 0; i < props.equipment.states.length - 1; i++) {
    const estadoAtual = props.equipment.states[i];
    const proximoEstado = props.equipment.states[i + 1];
    
    const horas = (new Date(proximoEstado.date).getTime() - new Date(estadoAtual.date).getTime()) / (1000 * 60 * 60);
    const idEstado = estadoAtual.equipmentStateId;
    const nomeEstado = obterNomeEstado(idEstado);
    const corEstado = obterCorEstado(idEstado);
    
    if (!distribuicao[idEstado]) {
      distribuicao[idEstado] = {
        id: idEstado,
        nome: nomeEstado,
        color: corEstado,
        horas: 0,
        percentual: 0
      };
    }
    
    distribuicao[idEstado].horas += horas;
    totalHoras += horas;
  }
  
  for (const idEstado in distribuicao) {
    distribuicao[idEstado].percentual = (distribuicao[idEstado].horas / totalHoras) * 100;
  }
  
  return Object.values(distribuicao);
});

function fecharModal() {
  emit('close');
}
</script>

