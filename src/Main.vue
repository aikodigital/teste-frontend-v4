<template>
  <q-list padding class="main-list">
    <img src="../img/aiko.png" alt="aiko" />
    <template v-for="(item, index) in mains" :key="index">
      <q-item class="main-list__item" clickable v-ripple @click="goToPage(item)">
        <q-icon :name="item.icon" />
        <span> {{ item.title }} </span>
      </q-item>
    </template>
  </q-list>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter();

defineOptions({
  name: 'Main'
});

interface Main {
  icon: string
  title: string
  page: string
};

const mains = computed(() => {
  const main: Array<Main> = [
    { icon: 'home', title: 'Início', page: 'home' },
    { icon: 'build', title: 'Mapa', page: 'map' }
  ];

  return main;
})

const goToPage = (main: Main) => {
  $router.push({ name: main.page });
};
</script>

<style lang="scss" scoped>
.main-list {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;

  img {
    position: absolute;
    right: 2%;
    width: 65px;
    height: 30px;
    margin-bottom: 8px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.1rem;
    color: #000;
    height: 100%;
  }

  &__item:hover {
    height: 100%;
  }
}
</style>
