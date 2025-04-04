<template>
  <div>
    <table class="HistoricoStatus">
      <thead>
        <tr>
          <th>Status</th>
          <th>Data de registro</th>
        </tr>
      </thead>
      <tbody>
        <tr class="Status" v-for="status in registrosOrdenados">
          <td>{{ status.estado.nome }}</td>
          <td>{{ status.data.toLocaleString('pt-BR') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.HistoricoStatus {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.HistoricoStatus td {
  height: 35px;
}

.HistoricoStatus td:first-child {
  padding-left: 10px;
}

.HistoricoStatus td:last-child {
  padding-right: 10px;
}

.HistoricoStatus tr:nth-child(even) td {
  background-color: rgba(var(--cinereous), 0.05);
}

.HistoricoStatus tr:nth-child(odd) td {
  background-color: rgba(var(--cinereous), 0.1);
}

.HistoricoStatus thead tr {
  width: 100%;
  height: 35px;
}

.HistoricoStatus thead th {
  font-size: 14px;
  font-weight: 600;
  color: rgba(var(--van-dyke), 1);
  border-top: solid 1px rgba(var(--van-dyke), 0.5);
  border-bottom: solid 1px rgba(var(--van-dyke), 0.5);
  background-color: rgba(var(--cinereous), 0.2);
}

.HistoricoStatus thead th:nth-child(1) {
  padding-left: 10px;
  width: 40%;
  border-radius: 12px 0 0 12px;
  border-left: solid 1px rgba(var(--van-dyke), 0.5);
}

.HistoricoStatus thead th:nth-child(2) {
  padding-right: 10px;
  width: 60%;
  border-radius: 0 12px 12px 0;
  border-right: solid 1px rgba(var(--van-dyke), 0.5);
}

.HistoricoStatus tbody td {
  color: rgba(var(--van-dyke), 1);
  font-size: 14px;
}

@media (max-width: 980px) {
  .HistoricoStatus {
    text-align: center;
  }

  .Cabecalho {
    flex-direction: column;
    gap: 20px;
  }
}
</style>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Equipamento } from '@/types/Equipamento'

const props = defineProps({
  equipamento: {
    type: Object as PropType<Equipamento>,
    required: true,
  },
})

const registrosOrdenados = [...props.equipamento.registros].sort(
  (a, b) => b.data.getTime() - a.data.getTime(),
)
</script>
