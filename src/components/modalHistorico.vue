<script>
export default {
  props: {
    isVisible: Boolean,
    equipamento: []
  },
  methods: {
    close() {
      this.$emit('close')
    },
    produtividadeEquipamento: function () {
      let horasTotais = 0
      let horasOperando = 0
      this.equipamento.states.forEach(elto => {
        if (elto.hoursInState !== '-') {
          horasTotais += elto.hoursInState
          if (elto.stateInfo.name === 'Operando') horasOperando += elto.hoursInState
        }
      });
      if (horasOperando > 0 && horasTotais > 0) return ((horasOperando / horasTotais) * 100).toFixed(2)
      return 0
    },
    ganhosEquipamento: function () {
      let ganhos = 0
      this.equipamento.states.forEach(elto => {
        if (elto.totalValue !== '-') {
          ganhos += elto.totalValue
        }
      });
      return ganhos.toFixed(2)
    }
  }
};
</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Histórico: {{ equipamento.name }}</h3>
        <button @click="close" class="close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <div class="row totalizadores">
          <div class="col-lg-6"><label>Produtividade: </label> {{ produtividadeEquipamento() }} %</div>
          <div class="col-lg-6"><label>Ganhos: </label> {{ ganhosEquipamento() }}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th width="120">Inicio</th>
              <th width="120">Fim</th>
              <th width="50">Horas</th>
              <th>Valor/H</th>
              <th>V Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="state in equipamento.states" :key="state.date">
              <td>
                <span class="legend-color" :style="{ background: state.stateInfo.color || '#000' }"></span>
                <span class="legend">
                  {{ state.stateInfo.name || 'Desconhecido' }}
                </span>
              </td>
              <td>{{ state.startDate | moment("DD/MM/YY HH:mm") }}</td>
              <td v-if="state.endDate"> {{ state.endDate | moment("DD/MM/YY HH:mm") }} </td>
              <td v-else>-</td>
              <td class="align-center">{{ state.hoursInState }}</td>
              <td class="align-center">{{ state.hourlyEarning }}</td>
              <td class="align-center">{{ state.totalValue }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 5px 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 13px;
}
th {
  background-color: #f5f5f5;
}
.legend-color {
  margin-right: 5px;
}
.legend {
  font-weight: 500;
}
.align-center {
  text-align: center;
}
.totalizadores {
  margin-bottom: 10px;
  font-weight: bold;
}
.totalizadores label {
  font-size: 14px;
  font-weight: normal;
}
</style>