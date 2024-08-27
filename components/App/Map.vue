<script setup lang="ts">

</script>

<template>
  <div class="container">
    <LMap
      :zoom="6"
      :center="[-23.533773, -46.625290]"
      :useGlobalLeaflet="false"
    >
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layerType="base" />
      <LMarker :lat-lng="[-23.6548428, -46.8113155]" draggable />
    </LMap>
  </div>
</template>

<style scoped>
.container {
  height: 300px;
  width: 600px;
}
</style>