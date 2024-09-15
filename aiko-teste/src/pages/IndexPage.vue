<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md bg-page">
        <div class="list-container">
          <h3 class="gradient-text">Equipamentos Gerais</h3>
          <hr />
          <div class="cards-grid">
            <q-card
              v-for="equipamentoGerais in visibleEquipamentos"
              :key="equipamentoGerais.id"
              class="equipment-card"
              @click="openDialog(equipamentoGerais)"
            >
              <q-card-section>
                <div class="card-content">
                  <q-avatar size="80px" class="q-mr-md">
                    <q-icon name="device_hub" size="56px" />
                  </q-avatar>
                  <div>
                    <q-item-label class="equipment-name">
                      {{ equipamentoGerais.name }}
                    </q-item-label>
                    <q-btn
                      @click="openDialog"
                      class="details-button q-mt-md"
                      rounded
                    >
                      detalhes
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <q-btn
            v-if="!showingAll"
            @click="showMore"
            class="show-more-btn q-mt-md"
            rounded
          >
            Mostrar mais
          </q-btn>
        </div>
        <!-- Diálogo com detalhes do equipamento -->
        <q-dialog v-model="dialogOpen">
          <q-card class="dialog-card">
            <q-card-section class="dialog-header">
              <div class="text-h6">{{ selectedEquipment.name }}</div>
            </q-card-section>
            <q-card-section>
              <div class="text-subtitle-h6">Descrição do equipamento:</div>
              <div class="dialog-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </q-card-section>
            <q-card-actions>
              <q-btn
                flat
                label="Fechar"
                @click="dialogOpen = false"
                class="close-btn"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, inject  } from "vue";
const search = inject('search');
const equipamentosGerais = ref([]);
const visibleEquipamentos = ref([]);
const itemsToShow = ref(6);
const showingAll = ref(false);
const dialogOpen = ref(false);
const selectedEquipment = ref({});

const fetchEquipamentosGerais = async () => {
  try {
    const response = await fetch("/data/equipment.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    equipamentosGerais.value = data;
    updateVisibleEquipamentos();
  } catch (error) {
    console.error("Deu algo de errado com a operação fetch:", error);
  }
};

const updateVisibleEquipamentos = () => {
  visibleEquipamentos.value = equipamentosGerais.value.slice(
    0,
    itemsToShow.value
  );
};

const showMore = () => {
  itemsToShow.value = Math.min(
    equipamentosGerais.value.length,
    itemsToShow.value + 4
  );
  showingAll.value = itemsToShow.value >= equipamentosGerais.value.length;
  updateVisibleEquipamentos();
};

const openDialog = (equipamento) => {
  selectedEquipment.value = equipamento;
  dialogOpen.value = true;
};

onMounted(() => {
  fetchEquipamentosGerais();
});
</script>

<style src="../css/indexpage.css"></style>