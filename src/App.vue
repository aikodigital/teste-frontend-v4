<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-grey-2">
      <Main />
    </q-header>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import Main from './Main.vue';

defineOptions({
  name: 'App',
  components: { Main }
});
</script>

<style lang="scss">
span {
  font-family: 'Inter', sans-serif;
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
