<script setup lang="ts">
import { ref } from 'vue'
import TheMenu from '@/components/TheMenu.vue'
import TheFilter from '@/components/TheFilter.vue'
import BaseBtn from '@/components/BaseBtn.vue'

const leftDrawerOpen = ref(true)
const miniState = ref<boolean>(true)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <BaseBtn color="white" class="text-black" icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <img src="../assets/aiko.png" width="60" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :mini="miniState"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      bordered
    >
      <the-menu />
    </q-drawer>

    <q-page-container class="page-background">
      <TheFilter />

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.page-background {
  background-color: #f6f8ff;
}
</style>
