<template>
  <aside
    class="sidebar bg-primary text-white p-3 vh-100 d-flex flex-column"
    :class="{ expanded: isExpanded }"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <nav class="d-flex flex-column">
      <router-link to="/" class="nav-link">
        <i class="bi bi-house-door"></i>
        <span v-if="isExpanded">{{ $t("sidebar.home") }}</span>
      </router-link>
      <router-link to="/Map" class="nav-link">
        <i class="bi bi-geo-alt-fill"></i>
        <span v-if="isExpanded">{{ $t("sidebar.map") }}</span>
      </router-link>
      <router-link to="/Report" class="nav-link">
        <i class="bi bi-bar-chart-fill"></i>
        <span v-if="isExpanded">{{ $t("sidebar.chart") }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isExpanded = ref(false);
</script>

<style scoped>
.sidebar {
  transition: width 0.3s ease-in-out;
  background-color: #003380 !important;
  max-height: calc(100vh - 100px);
  overflow: hidden;
  white-space: nowrap;
  z-index: 1000;
}

.sidebar.expanded {
  width: 250px;
}
.nav-link {
  font-weight: bold;
  text-decoration: none;
  color: white;
  padding: 10px;
  transition: color 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-link:hover {
  color: #42b983;
}

i {
  font-size: 1.2rem;
}

.router-link-exact-active {
  color: #42b983;
}
</style>
