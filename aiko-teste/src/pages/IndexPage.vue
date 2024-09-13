<template>
  <q-page class="q-pa-md bg-page">
    <div class="button-container">
      <!-- Botão 1: Posições dos equipamentos -->
      <q-btn 
        color="primary" 
        class="btn-modern full-width"
        label="Posições dos Equipamentos"
        @click="goToEquipmentPositions"
      >
        <!-- Exibir no mapa os equipamentos nas suas posições mais recentes. -->
      </q-btn>

      <!-- Botão 2: Estado atual do equipamento -->
      <q-btn 
        color="primary" 
        class="btn-modern full-width"
        label="Modelos de equipamento"
        @click="goToCurrentState"
      >
        <!-- Visualizar o estado mais recente dos equipamentos, com pop-up ou mouse hover. -->
      </q-btn>

      <!-- Botão 3: Histórico de estados do equipamento -->
      <q-btn 
        color="primary" 
        class="btn-modern full-width"
        label="Histórico de Estados do Equipamento"
        @click="goToStateHistory"
      >
        <!-- Permitir a visualização do histórico de estados de um equipamento específico. -->
      </q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
defineOptions({
  name: 'HomePageComponent'
});

const goToEquipmentPositions = () => {
  router.push({ path: '/mapa' });
  console.log('Navegar para o mapa das posições dos equipamentos');
}

const goToCurrentState = () => {
  router.push({ path: '/produtos' });
  console.log('Navegar para o estado atual dos equipamentos');
}

const goToStateHistory = () => {
  router.push({ path: '/equipamentos' })
  console.log('Navegar para o histórico de estados dos equipamentos');
}
</script>

<style scoped>
.bg-page {
  background-color: #001f3f; /* Azul escuro */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda a altura da tela */
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 16px; /* Espaçamento entre os botões */
  width: 80%;
  max-width: 600px; /* Largura máxima para os botões */
}

.btn-modern {
  background-color: #32cd32; /* Verde limão */
  color: white;
  padding: 20px; /* Espaçamento interno para botões maiores */
  border-radius: 12px;
  text-align: left; /* Alinhar o texto à esquerda */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn-modern:hover {
  background-color: #2cbf2c; /* Tom mais escuro do verde limão */
}
</style>
