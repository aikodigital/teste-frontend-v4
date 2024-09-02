<template>
  <v-container fluid class="main-content-section">
    <v-row align="center" no-gutters class="content-items">
      <v-col :cols="cols[0]" class="content-section">
        <MapOrganism :equipments="equipments" />
      </v-col>
      <v-col :cols="cols[1]" class="content-section">
        <EquipmentsList :equipments="equipments" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useDisplay } from 'vuetify';
import type { IEquipmentNormalized } from '~/interfaces/equipments.interface';

const { mobile } = useDisplay();

const props = defineProps<{
  equipments: IEquipmentNormalized[];
}>();

const { equipments } = props;

const cols = computed<number[]>(() => {
  return mobile.value ? [12, 12] : [5, 7];
});
</script>

<style>
.main-content-section {
  padding-top: 110px;
  height: 100%;
}

.content-section {
  padding: 10px !important;
}
</style>
