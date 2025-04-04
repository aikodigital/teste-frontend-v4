<template>
  <div class="Resumo">
    <p>
      O {{ props.equipamento.modelo.nome.toLocaleLowerCase('pt-BR') }}
      {{ props.equipamento.nome }} ficou disponível por
      <span>{{ horasPorStatus['Operando'] }} horas</span>, equivalente a
      <span
        >{{
          (
            (horasPorStatus['Operando'] /
              (horasPorStatus['Operando'] +
                horasPorStatus['Parado'] +
                horasPorStatus['Manutenção'])) *
            100
          ).toFixed(2)
        }}%</span
      >
      do tempo total, registrando um ganho de
      <span>{{
        ganhosPorStatus['Operando'] - (ganhosPorStatus['Parado'] + ganhosPorStatus['Manutenção'])
      }}</span
      >.
    </p>
  </div>
  <div class="Container">
    <Disponibilidade :equipamento="equipamento" :horas-por-status="horasPorStatus" />
    <GanhoPorStatus
      :equipamento="equipamento"
      :ganhos-por-status="ganhosPorStatus"
      :horas-por-status="horasPorStatus"
    />
  </div>
</template>

<style scoped>
.Container {
  display: flex;
  gap: 10px;
}

.Resumo {
  margin: 15px 0;
  font-size: 16px;
  line-height: 24px;
  color: rgba(var(--van-dyke), 1);
  text-align: center;
}

.Resumo p {
  margin: 0;
}

.Resumo span {
  font-weight: 500;
}

@media (max-width: 980px) {
  .Container {
    flex-direction: column;
  }
}
</style>

<script setup lang="ts">
import GanhoPorStatus from './charts/GanhoPorStatus.vue'
import Disponibilidade from './charts/Disponibilidade.vue'
import type { PropType } from 'vue'
import type { Equipamento, GanhosPorStatus, HorasPorStatus } from '@/types/Equipamento'
import { DateTime } from 'luxon'

const props = defineProps({
  equipamento: {
    type: Object as PropType<Equipamento>,
    required: true,
  },
})

const horasPorStatus: HorasPorStatus = {}

for (let i = 1; i < props.equipamento.registros.length; i++) {
  const registroAnterior = props.equipamento.registros[i - 1]
  const registroAtual = props.equipamento.registros[i]
  const inicio = DateTime.fromJSDate(registroAnterior.data)
  const fim = DateTime.fromJSDate(registroAtual.data)
  const duracao = fim.diff(inicio, 'hours').hours

  if (!horasPorStatus[registroAnterior.estado.nome]) {
    horasPorStatus[registroAnterior.estado.nome] = 0
  }

  horasPorStatus[registroAnterior.estado.nome] += duracao
}

const ganhosPorStatus: GanhosPorStatus = {
  Operando: 0,
  Parado: 0,
  Manutenção: 0,
}

Object.keys(horasPorStatus).forEach((hs) => {
  const horas = horasPorStatus[hs]
  const ganhoPorHora = props.equipamento.modelo.ganhos.find((f) => f.estado.nome == hs)!.valor
  ganhosPorStatus[hs] = horas * ganhoPorHora
})
</script>
