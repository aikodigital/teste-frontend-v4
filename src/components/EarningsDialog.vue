<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title
          class="d-flex justify-space-between align-center mt-3 ml-14 text-xs-h8"
        >
          <span class="text-h8">Custo Total de Operação</span>
          <v-btn size="x-small" variant="text" icon @click="closeDialog">
            <v-icon icon="mdi-close"></v-icon>
          </v-btn>
        </v-card-title>
        <v-divider
          color="teal"
          class="border-opacity-100 mb-4"
          :thickness="2"
          inset
        ></v-divider>
            
        <h3 class="text-center text text-cyan-darken-4">{{ equipmentName }}</h3>
        <p class="text-center text text-cyan-darken-4">{{ modelName }}</p>
    
      <v-card-text>
        <p><strong>Horas Operando:</strong> {{ productiveHours }} horas</p>
        <p><strong>Horas Parado:</strong> {{ stoppedHours }} horas</p>
        <p><strong>Horas em Manutenção:</strong> {{ maintenanceHours }} horas</p>

        <v-divider class="my-4"></v-divider>

        <p class="mb-2"><strong>Valores por Estado:</strong></p>
        <v-col>
          <v-row class="mb-1">
          <v-icon color="#2ecc71" 
                    >mdi-circle</v-icon
                  >
        <p class="ml-3"> Operando: {{ hourlyEarnings.operating }} /hora</p>
        </v-row>
        <v-row class="mb-1">
          <v-icon color="#f1c40f" 
                    >mdi-circle</v-icon
                  >
        <p class="ml-3"> Parado: {{ hourlyEarnings.stopped }} /hora</p>
        </v-row>
        <v-row>
          <v-icon color="#e74c3c" 
                    >mdi-circle</v-icon
                  >
        <p class="ml-3"> Manutenção: {{ hourlyEarnings.maintenance }} /hora</p>
        </v-row>
        </v-col>
        
        <v-divider class="my-4"></v-divider>

         <v-row justify="space-between" class="align-center">
        <v-col>
          <p><strong>Custo Total:</strong></p>
        </v-col>
        <v-col class="text-right mb-4">
          <h2 class="text-cyan-darken-4">{{totalEarningsFormatted}}</h2>
        </v-col>
      </v-row>

      </v-card-text>
      
    </v-card>
  </v-dialog>
</template>

<script>
import equipmentModel from "../data/equipmentModel.json";
import equipment from "../data/equipment.json";

export default {
  name: "EarningsDialog",
  props: {
    equipmentId: {
      type: String,
      required: true,
    },
    equipmentName: {
      type: String,
      required: true,
    },
    productiveHours: {
      type: Number,
      required: true,
    },
    stoppedHours: {
      type: Number,
      required: true,
    },
    maintenanceHours: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      hourlyEarnings: {
        operating: 0,
        stopped: 0,
        maintenance: 0,
      },
      modelName: "",
      totalEarnings: 0,
      totalEarningsFormatted: "R$ 0,00", // Inicializa como 0 reais
    };
  },
  methods: {
    calculateEarnings() {
      const selectedEquipment = equipment.find(
        (item) => item.id === this.equipmentId
      );

      if (!selectedEquipment) {
        console.error("Equipamento não encontrado em equipment.json.");
        return;
      }

      const equipmentModelId = selectedEquipment.equipmentModelId;

      const model = equipmentModel.find(
        (model) => model.id === equipmentModelId
      );

      if (!model) {
        console.error("Modelo de equipamento não encontrado em equipmentModel.json.");
        return;
      }
      this.modelName = model.name; // Define o nome do modelo

      if (!model.hourlyEarnings || model.hourlyEarnings.length === 0) {
        console.error("Hourly earnings não encontrado.");
        return;
      }

      const operatingStateId = "0808344c-454b-4c36-89e8-d7687e692d57";
      const stoppedStateId = "baff9783-84e8-4e01-874b-6fd743b875ad";
      const maintenanceStateId = "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f";

      const operatingEarning = model.hourlyEarnings.find(
        (earning) => earning.equipmentStateId === operatingStateId
      )?.value || 0;

      const stoppedEarning = model.hourlyEarnings.find(
        (earning) => earning.equipmentStateId === stoppedStateId
      )?.value || 0;

      const maintenanceEarning = model.hourlyEarnings.find(
        (earning) => earning.equipmentStateId === maintenanceStateId
      )?.value || 0;

      this.hourlyEarnings = {
        operating: operatingEarning,
        stopped: stoppedEarning,
        maintenance: maintenanceEarning,
      };

      this.totalEarnings =
        this.productiveHours * operatingEarning +
        this.stoppedHours * stoppedEarning +
        this.maintenanceHours * maintenanceEarning;

      // Formata totalEarnings para reais brasileiros
      this.totalEarningsFormatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(this.totalEarnings);
    },
    openDialog() {
      this.dialog = true;
      this.calculateEarnings();
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>
