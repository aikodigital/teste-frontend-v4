<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useDisplay } from "vuetify";
import { useSidebarStore } from "@/shared/store/sidebar_store";
import ThemeToggleBtn from "@/shared/components/ThemeToggleBtn.vue";

const props = defineProps({
  routeTitle: String,
});

const display = ref(useDisplay());

const sidebarStore = useSidebarStore();
</script>

<template>
  <v-app-bar color="base" prominent app fixed class="py-3" elevation="1">
    <v-toolbar-title
      class="flex text-start text--text font-weight-bold"
      :class="display.mdAndDown ? 'subtitle-1' : 'text-h5'"
    >
      <v-app-bar-nav-icon
        @click="sidebarStore.toggleRail"
        v-if="sidebarStore.getRail && display.mdAndDown"
        ><template v-slot:default>
          <v-icon
            size="35"
            color="logo"
            style="border: 2px solid #ff7d27; border-radius: 50%"
          >
            mdi-chevron-left
          </v-icon>
        </template></v-app-bar-nav-icon
      >

      {{ props.routeTitle }}
    </v-toolbar-title>
    <span>
      <ThemeToggleBtn />
    </span>
    <v-col class="mx-3">
      <v-row>
        <v-toolbar-title
          class="flex text-end"
          :class="display.mdAndDown ? 'text-body-1' : 'text-h6'"
        >
          <v-avatar color="#003184">
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </v-toolbar-title>
      </v-row>
    </v-col>
  </v-app-bar>
</template>
<style scoped></style>
