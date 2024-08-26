<script setup lang="ts">
</script>

<template>
  <header class="header">
    <NuxtLink to="/">
      <img src="~/assets/aiko.png" alt="logo" />
    </NuxtLink>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/equipments">Equipamentos</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 16px;

  img {
    height: 24px;
  }

  nav {
    display: flex;
    gap: 24px;

    a {
      color: rgb(0, 51, 128);
      font-weight: bold;
      text-decoration: none;

      &:hover {
        color: rgb(0, 193, 0);
      }
    }
  }
}
</style>
