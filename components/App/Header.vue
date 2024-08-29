<script setup lang="ts">
</script>

<template>
  <header>
    <NuxtLink to="/">
      <img src="~/assets/aiko.png" alt="logo" />
    </NuxtLink>
    <nav>
      <NuxtLink to="/">Início</NuxtLink>
      <NuxtLink to="/map">Mapa</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 16px 32px;

  img {
    height: 24px;
  }

  a {
    color: var(--primary-color);

    &:hover {
      color: var(--secondary-color);
    }
  }
}
</style>
