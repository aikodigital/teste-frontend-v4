<template>
<q-drawer
  v-model="drawer"
  show-if-above
  :width="200"
  :breakpoint="400"
>
  <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
    <div class="absolute-bottom bg-transparent">
      <span class="text-weight-bold text-h5 bo">Operação Florestal</span>
    </div>
  </q-img>
  <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
    <q-list padding>
      <q-item v-for="(item, key) in optionsMains" :key="key" :active="mainSelected === item.page" clickable v-ripple @click="setMain(item.page)">
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>

        <q-item-section>
          <span>{{ item.title }}</span>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</q-drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  Drawer: boolean
}

const $router = useRouter();
const mainSelected = ref<string>('');
const props = withDefaults(defineProps<Props>(), {
  Drawer: false
});
const drawer = computed(() => {
  return props.Drawer;
});
const optionsMains = computed(() => {
  return [
    { icon: 'home', title: 'Home', page: 'home' },
    { icon: 'search', title: 'Mapa', page: 'map' }
  ]
});

function setMain(value: string) {
  mainSelected.value = value;

  return $router.push({ name: value });
}
</script>

<style lang="scss" scoped>
</style>
