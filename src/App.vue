<template>
  <v-app>
    <v-app-bar :elevation="2" color="appbar">
      <!--  Navigation Menu -->
      <template v-slot:prepend>
        <v-img min-width="200" :max-height="60" aspect-ratio="16/9" src="img/aiko.png" />
      </template>
      <v-row dense class="justify-center ga-6">
        <v-btn to="/">Posições e Status</v-btn>
        <v-btn to="/produtividade">Produtividade</v-btn>
      </v-row>
      <template v-slot:append>
        <v-row dense class="mx-13">
          <Button :prepend-icon="tema === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night'" cor="buttonColor"
            variante="text" @click="toggleTheme()" class="my-2">
            Tema
          </Button>
        </v-row>
      </template>
    </v-app-bar>
    <v-main>
      <v-row dense class="d-flex justify-center">
        <RouterView />
      </v-row>
    </v-main>
  </v-app>
</template>

<script setup>
import Button from '@/components/VButton.vue';
import { computed, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { RouterView } from 'vue-router';

const theme = useTheme();

const tema = computed(() => {
  return theme.global.name.value
});

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  localStorage.setItem('tema', tema.value)
};

const verificaTema = () => {
  const temaGravado = localStorage.getItem('tema');
  if (temaGravado) {
    theme.global.name.value = temaGravado;
  }
};

onMounted(() => {
  verificaTema();
});
</script>