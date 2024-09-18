<template>
  <div class="row base">
    <div class="col-2 p-0 m-0">
      <SideBar />
    </div>
    <div class="col-10 p-0 m-0">
      <LeafletMap />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LeafletMap from "@/components/LeafletMap.vue";
import SideBar from "@/components/SideBar.vue";

export default defineComponent({
  name: "MapView",
  components: { LeafletMap, SideBar },
});
</script>

<style scoped>
.base {
  width: 100vw;
  height: 100vh;
}
</style>
