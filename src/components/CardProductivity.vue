<template>
 <v-card
  class="mb-4"
  :variant="flat"
  color="teal-lighten-5"
  rounded="shaped"
>
  <v-card-title class="text-center">
    <span class="headline text-center">{{ equipmentName }}</span>
  </v-card-title>
  
  <v-card-text>
    <p><strong>Tempo Total de Trabalho:</strong> {{ totalWorkTime }} horas</p>
    <p><strong>Horas Produtivas:</strong> {{ productiveHours }} horas</p>

    <v-row justify="space-between" class="align-center">
      <v-col>
        <p><strong>Produtividade:</strong></p>
      </v-col>
      <v-col class="text-right">
        <h2 class="text-cyan-darken-4">{{ productivityPercentage.toFixed(2) }}%</h2>
      </v-col>
    </v-row>
  </v-card-text>
</v-card>

</template>

<script>
import equipmentStateHistory from "../data/equipmentStateHistory.json";
import equipmentState from "../data/equipmentState.json";
import equipmentData from "../data/equipment.json"; // Importar equipment.json

export default {
  name: "CardProductivity",
  props: {
    equipmentId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      equipmentName: "", // Adiciona o campo para o nome do equipamento
      totalWorkTime: 0,
      productiveHours: 0,
      productivityPercentage: 0,
    };
  },
  methods: {
    calculateProductivity() {
      // Filtra o histórico de estados para o equipmentId
      const equipmentHistory = equipmentStateHistory.find(
        (history) => history.equipmentId === this.equipmentId
      );

      if (!equipmentHistory) {
        console.error("Equipamento não encontrado.");
        return;
      }

      const states = equipmentHistory.states;
      if (states.length === 0) {
        console.error("Nenhum estado encontrado para o equipamento.");
        return;
      }

      // Busca o nome do equipamento no equipment.json
      const equipment = equipmentData.find(
        (e) => e.id === this.equipmentId
      );
      if (equipment) {
        this.equipmentName = equipment.name;
      } else {
        this.equipmentName = "Nome não encontrado";
      }

      // Ordena os estados por data
      states.sort((a, b) => new Date(a.date) - new Date(b.date));

      let totalWorkTimeMs = 0;
      let productiveHoursMs = 0;
      let lastStateDate = new Date(states[0].date);

      states.forEach((state, index) => {
        const currentState = equipmentState.find(
          (eState) => eState.id === state.equipmentStateId
        );

        if (currentState) {
          const stateDate = new Date(state.date);

          // Calcula o tempo total de trabalho
          if (index === 0) {
            totalWorkTimeMs = stateDate - new Date(states[0].date);
          } else {
            totalWorkTimeMs += stateDate - lastStateDate;
          }

          // Calcula o tempo de horas produtivas
          if (currentState.name === "Operando" && index < states.length - 1) {
            const nextStateDate = new Date(states[index + 1].date);
            productiveHoursMs += nextStateDate - stateDate;
          }

          lastStateDate = stateDate;
        }
      });

      this.totalWorkTime = totalWorkTimeMs / 3600000; // Convertendo de ms para horas
      this.productiveHours = productiveHoursMs / 3600000; // Convertendo de ms para horas
      this.productivityPercentage = (this.productiveHours / this.totalWorkTime) * 100;
    },
  },
  watch: {
    equipmentId: "calculateProductivity",
  },
  mounted() {
    this.calculateProductivity();
  },
};
</script>

<style scoped>
.headline {
  font-size: 16px;
  font-weight: bold;
  color: rgb(46, 172, 172);
  text-align: center; /* Centraliza o texto */
}
</style>
