<template>
  <q-page class="flex flex-center">
    <img
      class="rounded-lg"
      alt="Aiko logo"
      :src="imageAiko"
      style="width: 250px; height: 100px"
    />
  </q-page>
</template>

<script setup>
import imageAiko from "/img/aiko.png";
defineOptions({
  name: "IndexPage",
});
</script>
