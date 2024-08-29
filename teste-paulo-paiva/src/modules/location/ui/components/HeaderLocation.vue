<template>
  <v-row no-gutters>
    <v-col align="start" cols="6" sm="6" md="3" lg="3" class="px-3">
      <v-btn
        variant="flat"
        rounded="lg"
        width="200px"
        class="default-Operand-button text-none"
        :class="display.smAndDown ? 'mt-2' : 'mt-0'"
        @click="onSearch('Operando')"
        block
      >
        Operando
      </v-btn>
    </v-col>
    <v-col align="start" cols="6" sm="6" md="3" lg="3" class="px-3">
      <v-btn
        variant="flat"
        rounded="lg"
        width="200px"
        class="default-stationary-button text-none"
        :class="display.smAndDown ? 'mt-2' : 'mt-0'"
        @click="onSearch('Parado')"
        block
      >
        Parado
      </v-btn>
    </v-col>
    <v-col align="start" cols="12" sm="12" md="3" lg="3" class="px-3">
      <v-btn
        variant="flat"
        rounded="lg"
        width="200px"
        class="default-maintenance-button text-none"
        :class="display.smAndDown ? 'mt-2' : 'mt-0'"
        @click="onSearch('Manutenção')"
        block
      >
        Manutenção
      </v-btn>
    </v-col>
    <v-col cols="12" md="3" justify="end" class="px-3">
      <v-btn
        variant="flat"
        rounded="lg"
        class="default-button text-none"
        :class="display.smAndDown ? 'mt-2' : 'mt-0'"
        block
        @click="onSearch('')"
      >
        Limpar Filtro
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { useDisplay } from "vuetify";

const display = useDisplay();
const emit = defineEmits<{
  (event: "search", selectedState: string): void;
}>();

const onSearch = (value: string) => {
  emit("search", value);
};
</script>

<style scoped>
.default-button {
  color: white;
  background-color: green;
  font-weight: 900;
}
.default-button:hover {
  color: white;
  background-color: rgb(72, 165, 72);
}

.default-stationary-button {
  color: white;
  background-color: #f1c40f;
  font-weight: 900;
}
.default-stationary-button:hover {
  color: white;
  background-color: #ecd269;
}

.default-maintenance-button {
  color: white;
  background-color: #e74c3c;
  font-weight: 900;
}
.default-maintenance-button:hover {
  color: white;
  background-color: #e66f62;
}

.default-Operand-button {
  color: white;
  background-color: #2ecc71;
  font-weight: 900;
}
.default-Operand-button:hover {
  color: white;
  background-color: #68ca91;
}
</style>
