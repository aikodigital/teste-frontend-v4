<template>
  <v-row align="center">
    <v-col class="text-start">
      <span style="color: #6f6f6f"
        >Total de {{ props.totalRecords }} registros</span
      >
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <v-pagination
        density="comfortable"
        class="py-0 my-0"
        @update:model-value="onPageChange"
        :v-model="props.currentPage"
        :length="lastPage"
        :total-visible="3"
        show-first-last-page
      ></v-pagination>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { defineEmits, computed } from "vue";

const emit = defineEmits(["update:currentPage", "first", "last", "prev"]);

const props = defineProps({
  totalRecords: { type: Number, required: true },
  perPage: { type: Number, required: true },
  currentPage: { type: Number, required: true },
});

const lastPage = computed(() => Math.ceil(props.totalRecords / props.perPage));

function onPageChange(page: number) {
  emit("update:currentPage", page);
}
</script>
