<template>
  <v-row no-gutters>
    <v-col cols="12" sm="12" md="6" lg="6">
      <v-text-field
        v-model="searchQuery"
        label="Pesquisar por nome"
        append-icon="mdi-magnify"
        :class="{ 'dark-field': isDarkTheme }"
        clearable
      ></v-text-field>
    </v-col>
    <v-col v-cols="2"></v-col>
    <v-col cols="12" md="4" justify="end">
      <v-btn
        variant="flat"
        rounded="lg"
        class="default-orange-button text-none"
        :class="display.smAndDown ? 'mt-2' : 'mt-0'"
        @click="onSearch"
        block
      >
        Filtro de busca
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from "vue";
import { useDisplay, useTheme } from "vuetify";

const theme = useTheme();
const isDarkTheme = computed(() => theme.global.name.value === "dark");

const display = useDisplay();
const emit = defineEmits<{
  (event: "search", searchQuery: string): void;
}>();

const searchQuery = ref("");

const onSearch = () => {
  emit("search", searchQuery.value);
};
</script>

<style scoped>
.default-orange-button {
  color: white;
  background-color: green;
  font-weight: 900;
}
.default-orange-button:hover {
  color: white;
  background-color: rgb(72, 165, 72);
}
.dark-field {
  color: white;
}
</style>
