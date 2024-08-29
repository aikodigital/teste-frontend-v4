<template>
  <div>
    <div class="d-none d-sm-none d-md-block d-lg-block d-xl-block">
      <v-row class="list-header mx-auto my-auto mt-3">
        <v-col
          cols="6"
          sm="6"
          md="4"
          lg="4"
          xl="4"
          align="center"
          class="justify-center border-right d-none d-sm-none d-md-block d-lg-block d-xl-block"
        >
          <span> Id do Equipamento </span>
        </v-col>
        <v-col
          cols="6"
          sm="6"
          md="2"
          lg="2"
          xl="2"
          align="center"
          class="justify-center border-right d-none d-sm-none d-md-block d-lg-block d-xl-block"
        >
          <span> Nome </span>
        </v-col>
        <v-col
          cols="6"
          sm="6"
          md="6"
          lg="6"
          xl="6"
          align="center"
          class="justify-center border-right d-none d-sm-none d-md-block d-lg-block d-xl-block"
        >
          <span> Equipamento ModelId </span>
        </v-col>
      </v-row>
    </div>
    <div :class="{ 'dark-text': isDarkTheme }">
      <v-row
        class="list-card dark-theme base_dark text--text mx-auto my-auto mt-2"
        v-for="item in paginatedItems"
        :key="item.id"
        align="center"
      >
        <v-col cols="12" sm="4" md="4" lg="4" xl="4" align="center">
          <span class="d-md-none d-lg-none d-xl-none">
            <b>Id do Equipamento:</b>
          </span>
          <div class="text-wrap" :class="'secondary--text'">{{ item.id }}</div>
        </v-col>
        <v-col cols="12" sm="2" md="2" lg="2" xl="2" align="center">
          <span class="d-md-none d-lg-none d-xl-none">
            <b>Nome:</b>
          </span>
          <div class="text-wrap" :class="'secondary--text'">
            {{ item.name }}
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="6" xl="6" align="center">
          <span class="d-md-none d-lg-none d-xl-none">
            <b>Equipamento ModelId:</b>
          </span>
          <div class="text-wrap" :class="'secondary--text'">
            {{ item.equipmentModelId }}
          </div>
        </v-col>
      </v-row>
    </div>
    <v-divider :thickness="2" class="border-opacity-25 my-4"></v-divider>

    <PaginationComponent
      :totalRecords="filteredItems.length"
      :currentPage="currentPage"
      :perPage="perPage"
      @update:currentPage="updateCurrentPage"
      @first="fetchFirstPage"
      @last="fetchLastPage"
      @prev="fetchPreviousPage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import PaginationComponent from "@/shared/components/PaginationComponent.vue";
import equipment from "@/data/equipment.json";
import { Equipment } from "@/modules/equipments/dtos/equipmentDto";
import { useTheme } from "vuetify";

const props = defineProps<{
  searchQuery: string;
}>();

const theme = useTheme();
const isDarkTheme = computed(() => theme.global.name.value === "dark");

const items = ref<Equipment[]>([]);
const searchQuery = ref(props.searchQuery);
const currentPage = ref(1);
const perPage = ref(7);

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value;
  return items.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredItems.value.slice(start, end);
});

onMounted(() => {
  items.value = equipment as unknown as Equipment[];
});

watch(
  () => props.searchQuery,
  (newQuery) => {
    searchQuery.value = newQuery;
    currentPage.value = 1;
  }
);

const updateCurrentPage = (page: number) => {
  currentPage.value = page;
};

const fetchFirstPage = () => {
  currentPage.value = 1;
};

const fetchLastPage = () => {
  currentPage.value = Math.ceil(filteredItems.value.length / perPage.value);
};

const fetchPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
</script>

<style scoped>
.list-header {
  background-color: #0f2733;
  color: white;
  font-weight: bolder;
  min-height: 30px;
}
.border-right {
  border-right: 0.063rem solid rgba(223, 223, 223, 0.308);
}
.list-card {
  font-weight: normal;
}
.list-card:hover {
  color: #0f2733;
  background-color: #ffdfcc;
}
.dark-text {
  color: white;
}
</style>
