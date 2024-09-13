<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.push('/')"/>
        <q-toolbar-title>Equipamentos Gerais</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md bg-page">
        <div class="list-container">
          <div class="equipment-list">
            <q-item v-for="equipamentoGerais in equipamentosGerais" :key="equipamentoGerais.id" class="equipment-item">
              <q-item-section>
                <q-item-label class="equipment-name">{{ equipamentoGerais.name }}</q-item-label>
                <q-item-label class="text-subtitle2">Detalhes do equipamento:</q-item-label>

                <q-list>
                  <q-item v-for="state in equipmentStates" :key="state.id">
                    <q-item-section>
                      <strong>Estado:</strong> 
                      <span :style="{ color: state.color }">{{ state.name }}</span>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Referência para os equipamentos gerais e estados dos equipamentos
const equipamentosGerais = ref([]);
const equipmentStates = ref([]);

// Função para buscar os dados dos equipamentos gerais
const fetchEquipamentosGerais = async () => {
  try {
    const response = await fetch('/data/equipment.json'); // Atualize o caminho se necessário
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    equipamentosGerais.value = data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

// Função para buscar os dados dos estados dos equipamentos
const fetchEquipmentStates = async () => {
  try {
    const response = await fetch('/data/equipmentState.json'); // Atualize o caminho se necessário
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    equipmentStates.value = data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

// Carregar os dados quando o componente for montado
onMounted(() => {
  fetchEquipamentosGerais();
  fetchEquipmentStates();
});
</script>

<style scoped>
.bg-page {
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
}

.equipment-list {
  width: 100%;
}

.equipment-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.037);
  margin: 8px 0;
  padding: 16px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.equipment-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.equipment-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #001f3f;
}
</style>
