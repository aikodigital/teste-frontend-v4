<template>
<q-layout view="hHh lpR fFf">
  <q-header reveal bordered class="bg-white">
    <q-toolbar>
      <q-btn flat @click="drawer = !drawer" dense icon="menu" color="dark" />
      <q-toolbar-title>
        <img class="img" src="../img/aiko.png">
      </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <Main :Drawer="drawer" />

  <q-page-container>
    <q-page>
      <router-view />
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Main from './Main.vue';

const drawer = ref<boolean>(false);

defineOptions({
  name: 'App',
  components: { Main }
});
</script>

<style lang="scss">
span {
  font-family: 'Inter', sans-serif;
}

.img {
  padding-top: 5px;
  height: 35px;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
}
</style>
