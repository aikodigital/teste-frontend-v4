<script setup lang="ts">
import HeaderEquipments from "@/modules/equipments/ui/components/HeaderEquipments.vue";
import ListEquipments from "@/modules/equipments/ui/components/ListEquipments.vue";
import { ref } from "vue";

const searchQuery = ref("");

const handleSearch = (query: string) => {
  searchQuery.value = query;
  return;
};
</script>

<template>
  <v-container fluid class="mt-8">
    <div class="mb-8">
      <HeaderEquipments @search="handleSearch" />
    </div>
    <div>
      <ListEquipments :searchQuery="searchQuery" />
    </div>
  </v-container>
</template>

<style scoped></style>
