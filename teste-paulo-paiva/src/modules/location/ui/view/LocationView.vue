<template>
  <v-container fluid class="mt-8">
    <div class="mb-8"><HeaderLocation @search="handleSearch" /></div>
    <div>
      <ListLocation :selectedState="selectedState" :filterId="filterId" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import HeaderLocation from "@/modules/location/ui/components/HeaderLocation.vue";
import ListLocation from "@/modules/location/ui/components/ListLocation.vue";
import { ref } from "vue";

const selectedState = ref("");
const filterId = ref("");

const handleSearch = (query: string) => {
  selectedState.value = query;
};
</script>
