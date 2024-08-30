<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <footer>
    <nav>
      <div class="nav-section">
        <NuxtLink to="/">Início</NuxtLink>
        <NuxtLink to="/map">Mapa</NuxtLink>
      </div>
      <div class="nav-section">
        <a href="https://facebook.com/rcabr31" target="_blank">
          <FontAwesomeIcon :icon="['fab', 'facebook']" />
          Facebook
        </a>
        <a href="https://instagram.com/_rcabr1" target="_blank">
          <FontAwesomeIcon :icon="['fab', 'instagram']" />
          Instagram
        </a>
        <a href="https://github.com/rcabr1" target="_blank">
          <FontAwesomeIcon :icon="['fab', 'github']" />
          Github
        </a>
        <a href="https://linkedin.com/in/rcabr31" target="_blank">
          <FontAwesomeIcon :icon="['fab', 'linkedin']" />
          LinkedIn
        </a>
      </div>
    </nav>
    <p>&copy; 2024 Aiko Digital - Teste Frontend</p>
  </footer>
</template>


<style scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  background-color: var(--primary-color);
  color: white;
  padding: 32px;

  nav {
    flex-direction: column;
    flex-wrap: wrap;

    .nav-section {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      a {
        color: white;
        text-wrap: nowrap;

        &:hover {
          color: var(--secondary-color);
        }
      }
    }
  }
}
</style>
