<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header-content">
      <q-toolbar class="custom-toolbar">
        <q-btn
          flat
          dense
          round
          color="primary"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <img
          alt="Quasar logo"
          src="~assets/aiko.png"
          style="width: 100px; height: 50px; margin-bottom: 10px"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered class="sidebar">
      <q-list>
        <q-item-label header class="menu-header"> Menu </q-item-label>

        <div>
          <q-item clickable @click="goToEquipmentPositions">
            <q-item-section avatar>
              <q-icon name="place" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Localização dos Equipamentos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="goToCurrentState">
            <q-item-section avatar>
              <q-icon name="build_circle" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Modelos de equipamentos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="goToStateHistory">
            <q-item-section avatar>
              <q-icon name="history" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Equipamentos Gerais</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-footer reveal elevated class="footer-content">
      <q-toolbar>
        <img alt="Aiko logo" src="~assets/aiko.png" class="footer-logo" />
        <q-toolbar-title class="footer-text">
          Desenvolvido por:
          <a
            href="https://www.linkedin.com/in/larissa-souza-2b1b51204/"
            target="_blank"
            class="footer-link"
          >
            Larissa Souza
          </a>
          - 2024
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, defineEmits  } from "vue";
import { useRouter } from "vue-router";
const emit = defineEmits(['search']);
const router = useRouter();
const leftDrawerOpen = ref(false);
const search = ref("");
const equipamentosGerais = ref([]);
const emitSearch = () => {
  emit('search', search.value);
}
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const goToEquipmentPositions = () => {
  router.push({ path: "/mapa" });
};

const goToCurrentState = () => {
  router.push({ path: "/produtos" });
};

const goToStateHistory = () => {
  router.push({ path: "/equipamentos" });
};

const fetchEquipamentosGerais = async () => {
  try {
    const response = await fetch("/data/equipment.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    equipamentosGerais.value = data;
  } catch (error) {
    console.error("Deu algo de errado com a operação fetch:", error);
  }
};

onMounted(() => {
  fetchEquipamentosGerais();
});
</script>

<style src="../css/header.css"></style>
