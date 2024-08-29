<script setup lang="ts">
import { useAlertStore } from "@/shared/store/alert_store";

const alertStore = useAlertStore();
</script>

<template>
  <v-snackbar
    v-if="alertStore.getTypeAlert"
    v-model="alertStore.isDialogVisible"
    color="success"
    timeout="4000"
    class="v-snack-bar"
    multi-line
    rounded="lg"
    max-width="150px"
    @click="alertStore.hideDialogAlert"
    ><v-row>
      <span class="text-white mx-4" style="font-size: 14px">
        {{ alertStore.getAlertMessage }}
      </span>
    </v-row>
  </v-snackbar>
  <v-snackbar
    v-else
    v-model="alertStore.isDialogVisible"
    color="error"
    timeout="4000"
    class="v-snack-bar"
    multi-line
    rounded="lg"
    max-width="150px"
    @click="alertStore.hideDialogAlert"
  >
    <template #default>
      <v-row>
        <span class="text-white mx-4" style="font-size: 18px">Atenção:</span>
      </v-row>
      <v-row>
        <span class="text-white mx-4 my-1" style="font-size: 14px">
          {{ alertStore.getAlertMessage }}
        </span>
      </v-row>
    </template>
  </v-snackbar>
</template>

<style scoped>
@media screen and (min-width: 0px) and (max-width: 480px) {
  .v-snack-bar {
    right: 0% !important;
  }
}
@media screen and (min-width: 481px) and (max-width: 768px) {
  .v-snack-bar {
    right: -30% !important;
  }
}
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .v-snack-bar {
    right: -50%;
  }
}
@media screen and (min-width: 1025px) and (max-width: 1200px) {
  .v-snack-bar {
    right: -70%;
  }
}
@media screen and (min-width: 1201px) {
  .v-snack-bar {
    right: -72%;
  }
}
</style>
