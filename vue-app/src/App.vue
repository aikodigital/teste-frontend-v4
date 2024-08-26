<template>
  <main class="w-screen h-screen bg-zinc-800">
    <Login 
      v-if="currentComponent === 'login'"
      @join="join"
    />
    <Home v-else />
  </main>
</template>
<script lang="ts">
import Login from './pages/login/index.vue';
import Home from './pages/home/index.vue';
import {  defineComponent } from "vue";
export default defineComponent({
  components: {
    Login,
    Home,
  },
  data() {
    return {
      currentComponent: 'login',
    };
  },
  methods: {
    join(){
      this.currentComponent = 'home';
    },
  },
});
</script>
<style>
main {
  background-image: url("@/assets/img/background.png");
}
</style>
