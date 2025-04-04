<template>
  <section id="Equipamento">
    <div v-if="equipamento">
      <h2>{{ equipamento.nome }}</h2>
      <p class="Modelo">{{ equipamento.modelo.nome }}</p>
      <p class="Estado" :style="{ '--cor': cor }">
        {{ ultimoStatus!.estado.nome }}
      </p>
      <div class="Abas">
        <div class="Botoes">
          <button
            v-for="(tab, index) in abas"
            :key="index"
            @click="abaAtiva = index"
            class="btn"
            :class="{ Ativo: abaAtiva === index }"
          >
            {{ tab.nome }}
          </button>
        </div>
        <div class="Conteudo">
          <div v-for="(tab, index) in abas" :key="index">
            <component
              v-if="abaAtiva === index"
              :key="componentKey"
              :is="tab.component"
              :equipamento="equipamento"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 40px 0;
  color: rgba(var(--van-dyke), 1);
}

section > div {
  margin: 0 auto;
  padding: 10px;
  max-width: 980px;
  width: 100%;
}

h2 {
  margin: 0;
  font-size: 32px;
  line-height: 40px;
  font-family: 'Roboto Condensed';
}

p {
  margin: 0;
  font-size: 16px;
  font-family: 'Roboto Condensed';
  line-height: 20px;
  text-transform: uppercase;
}

.Estado {
  color: var(--cor);
}

.Abas {
  margin-top: 20px;
}

.Botoes {
  margin-bottom: 10px;
}

.Botoes > button {
  padding: 12px 8px;
  border-radius: 0;
  border-bottom: solid 1px rgba(var(--van-dyke), 0.2);
  font-size: 16px;
  font-weight: 400;
  font-family: 'Roboto Condensed';
  line-height: 20px;
  color: rgba(var(--van-dyke), 0.9);
  outline: none !important;
}

.Botoes > button.Ativo {
  font-weight: 500;
  color: rgba(var(--van-dyke), 1);
  border-bottom: solid 1px rgba(var(--van-dyke), 1);
}

@media (max-width: 980px) {
  .Botoes {
    display: flex;
    justify-content: center;
  }
}
</style>

<script setup lang="ts">
import { useEquipamentoStore } from '@/stores/equipamento'
import type { Posicao, RegistroEstado } from '@/types/Equipamento'
import { computed, ref, watch, nextTick } from 'vue'
import HistoricoStatus from '@/components/HistoricoStatus.vue'
import HistoricoPosicoes from '@/components/HistoricoPosicoes.vue'
import Estatisticas from '@/components/Estatisticas.vue'

const abaAtiva = ref(0)
const abas = [
  { nome: 'Últimos status', component: HistoricoStatus },
  { nome: 'Últimas localizações', component: HistoricoPosicoes },
  { nome: 'Estatísticas', component: Estatisticas },
]

const equipamentoStore = useEquipamentoStore()
const equipamento = computed(() => {
  return equipamentoStore.equipamentos.find((f) => f.exibirDetalhes)
})

const componentKey = computed(() => {
  return `${equipamento.value?.id || 'no-equip'}-${abaAtiva.value}`
})

let ultimoStatus = ref<RegistroEstado>()
let ultimaPosicao = ref<Posicao>()
let cor = ref<string>()

watch(
  equipamento,
  async (novo) => {
    if (novo) {
      ultimoStatus.value = novo.registros[novo.registros.length - 1]
      ultimaPosicao.value = novo.posicoes[novo.posicoes.length - 1]
      cor.value = ultimoStatus.value.estado.cor

      if (novo.exibirDetalhes) {
        await nextTick()

        const nomeEquipamento = document.querySelector('#Equipamento')

        if (nomeEquipamento) {
          nomeEquipamento.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  },
  { immediate: true },
)
</script>
