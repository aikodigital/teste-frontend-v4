<template>
  <v-container>
    <h4 class="mb-3">Histórico de Rotas de Equipamentos</h4>
    <v-row>
      <v-col cols="12" md="3" class="my-0">
        <!-- Componente v-select para selecionar o nome do equipamento -->
        <v-select
          class="mt-2"
          variant="outlined"
          density="compact"
          v-model="selectedName"
          :items="setNome"
          label="Selecione o Equipamento"
          @change="onEquipmentChange"
        />
      </v-col>
      
      <v-col cols="12" md="3" class="my-0">
        <!-- Componente v-select para selecionar a data -->
        <v-select
          class="mt-2"
          variant="outlined"
          density="compact"
          v-model="selectedDate"
          :items="setDate"
          label="Selecione a Data"
          @change="onDateChange"
        />
      </v-col>
    </v-row>

    <!-- Passar o equipmentId e a selectedDate como props para o LMapRoute -->
    <v-container justify="center" class="ml-3 border-map">
      <!-- Só passar selectedDate se a data já tiver sido alterada -->
      <LMapRoute :selectedEquipmentId="selectedEquipmentId" :selectedDate="selectedDate" />
    </v-container>
  </v-container>
</template>

<script>
import LMapRoute from "../components/LMapRoute";
import equipment from "../data/equipment.json";
import positionHistory from "../data/equipmentPositionHistory.json"; // Importe o histórico de posições

export default {
  name: "EquipmentMap",
  components: {
    LMapRoute,
  },
  data() {
    return {
      selectedName: null, // Nome do equipamento selecionado
      setNome: [], // Lista de nomes dos equipamentos para o v-select
      nameToIdMap: new Map(), // Mapa para associar nome ao id
      selectedEquipmentId: null, // ID do equipamento selecionado
      selectedDate: null, // Data selecionada
      setDate: [], // Lista de datas disponíveis para o v-select de datas
      dateChanged: false, // Controla se a data foi alterada pelo usuário
    };
  },
  mounted() {
    // Preencher a lista de nomes e o mapa de associação nome-id
    this.setNome = equipment.map((equip) => equip.name);
    this.nameToIdMap = new Map(
      equipment.map((equip) => [equip.name, equip.id])
    );

    // Preencher a lista de datas com as datas disponíveis no histórico de posições
    this.setDate = Array.from(
      new Set(positionHistory.flatMap((eq) => eq.positions.map((pos) => {
        const date = new Date(pos.date).toLocaleDateString("pt-BR");
        return date;
      })))
    ).sort((a, b) => new Date(a) - new Date(b)); // Ordenar datas

    // Definir o equipamento selecionado inicialmente
    if (this.setNome.length > 0) {
      this.selectedName = this.setNome[0];
      this.selectedEquipmentId = this.nameToIdMap.get(this.selectedName);
    }
  },
  watch: {
    selectedName(newName) {
      // Atualizar o ID do equipamento conforme o nome selecionado
      this.selectedEquipmentId = this.nameToIdMap.get(newName);
      // Preencher a lista de datas com as datas disponíveis no histórico de posições
    this.setDate = Array.from(
      new Set(positionHistory.flatMap((eq) => eq.positions.map((pos) => {
        const date = new Date(pos.date).toLocaleDateString("pt-BR");
        return date;
      })))
    ).sort((a, b) => new Date(a) - new Date(b)); // Ordenar datas

    },
    selectedDate(newDate) {
      // Atualizar o ID do equipamento conforme o nome selecionado
      this.selectedDate = newDate;
      console.log("Selected Date:", this.selectedDate);
    },
  },
  methods: {
    onEquipmentChange() {
      // Função disparada quando o nome do equipamento é selecionado no v-select
      console.log("Selected Equipment Name:", this.selectedName);
      console.log("Selected Equipment ID:", this.selectedEquipmentId);
    },
    onDateChange() {
      // Função disparada quando a data é selecionada no v-select
      this.dateChanged = true; // Marca que a data foi alterada pelo usuário
      console.log("Selected Date (BR format):", this.selectedDate);
    },
  },
};
</script>
