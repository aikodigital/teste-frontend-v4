<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" @click="$router.push('/')"/>
        <q-toolbar-title>Equipamentos</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md bg-page">
        <div class="list-container">
          <div class="equipment-list">
            <q-item v-for="equipment in equipments" :key="equipment.id" class="equipment-item">
              <!-- <q-img :src="equipment.image" class="equipment-image" /> -->
              <q-item-section>
                <q-item-label class="equipment-name">{{ equipment.name }}</q-item-label>
                <q-item-label class="text-subtitle2">Detalhes do equipamento:</q-item-label>
                
                <!-- Menu expansivo para estados -->
                <q-expansion-item
                  icon="expand_more"
                  label="Ver Estados"
                  class="expansion-item"
                >
                  <q-list>
                    <q-item v-for="earning in equipment.hourlyEarnings" :key="earning.equipmentStateId">
                      <q-item-section>
                        <strong>Estado:</strong> {{ earning.equipmentStateId }}
                        <strong>Valor:</strong> {{ earning.value }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-expansion-item>
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

const equipments = ref([]);

const fetchEquipments = async () => {
  try {
    const response = await fetch('/data/equipmentModel.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    equipments.value = data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

onMounted(() => {
  fetchEquipments();
});
</script>

<style scoped>
.bg-page {
  background-color: #f5f5f5; /* Cor de fundo clara */
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px; /* Largura máxima do contêiner */
}

.equipment-list {
  width: 100%;
}

.equipment-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 8px 0;
  padding: 16px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.equipment-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.equipment-image {
  border-radius: 8px;
  height: 100px;
  width: 100px;
  object-fit: cover;
  margin-right: 16px;
}

.equipment-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #001f3f; /* Azul escuro */
}

.earnings-list {
  list-style-type: none;
  padding: 0;
  margin: 8px 0;
}

.earnings-list li {
  padding: 4px 0;
}

.earnings-value {
  color: #32cd32; /* Verde limão */
  font-weight: bold;
}

.expansion-item {
  margin-top: 16px;
}
</style>
