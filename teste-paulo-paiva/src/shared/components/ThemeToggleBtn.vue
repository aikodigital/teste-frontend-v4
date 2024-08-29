<template>
  <v-row>
    <v-col>
      <v-switch
        v-model:checked="isDarkTheme"
        @change="toggleTheme"
        class="theme-switch"
        hide-details
        thumb-icon=""
      >
        <template #prepend>
          <v-icon>{{
            isDarkTheme ? "mdi-brightness-2" : "mdi-brightness-5"
          }}</v-icon>
        </template>
        <template #append>
          <v-icon>{{
            isDarkTheme ? "mdi-brightness-5" : "mdi-brightness-2"
          }}</v-icon>
        </template>
      </v-switch>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const isDarkTheme = ref(theme.global.name.value === "dark");

const toggleTheme = () => {
  const newTheme = isDarkTheme.value ? "light" : "dark";
  theme.global.name.value = newTheme;
  isDarkTheme.value = newTheme === "dark";
};
</script>
