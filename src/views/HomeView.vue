<template>
  <div>
    <v-container>
      <v-row justify="start">
        <v-col cols="12" sm="10" md="8" >
          <h4 class="mb-3">Localização Atual e Histórico de Estatus</h4>
          <v-container  class="border-map">
            <LMap />
          </v-container>
        </v-col>
        <v-col cols="12" sm="10" md="4" >
          <h4 class="mb-3">Produtividade dos Equipamentos</h4>
          <!-- Define uma altura fixa e rolagem vertical para o contêiner dos cards -->
          <div class="card-container">
            <div v-for="equipment in equipmentList" :key="equipment.id">
              <CardProductivity :equipmentId="equipment.id" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LMap from "../components/LMap";
import CardProductivity from "../components/CardProductivity";
import equipmentData from "../data/equipment.json"; // Importar o arquivo de equipamentos

export default {
  components: {
    LMap,
    CardProductivity,
  },
  data() {
    return {
      equipmentList: equipmentData, // Lista de equipamentos
    };
  },
};
</script>

<style>
.card-container {
  height: 80vh; /* Defina uma altura fixa (80% da altura da viewport) */
  overflow-y: auto; /* Adiciona rolagem vertical quando necessário */
  padding-right: 10px; /* Adiciona padding para evitar que o conteúdo encoste na scrollbar */
}
.border-map {
  border: 1px solid gray;
  border-radius: 10px;
}
</style>
