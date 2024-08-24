<template>
    <section class="w-full h-full">
      <Header></Header>
    </section>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  import Header from "./header.vue";
  export default defineComponent({
    components: {
      Header,
    },
  });
  </script>
  