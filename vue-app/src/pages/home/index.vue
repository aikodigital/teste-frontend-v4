<template>
    <section class="w-full h-full">
      <Header/>
      <Map/>
    </section>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  import Header from "./header.vue";
  import Map from "./map.vue";
  export default defineComponent({
    components: {
      Header,
      Map
    },
  });
  </script>
  