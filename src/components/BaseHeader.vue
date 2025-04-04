<template>
  <header class="header px-4 py-2 d-flex align-items-center">
    <div class="logo-container">
      <span class="logo">Logo</span>
    </div>

    <select
      v-model="languageStore.language"
      class="language-select"
      @change="languageStore.setLanguage(languageStore.language)"
    >
      <option value="pt">🇧🇷 Português</option>
      <option value="en">🇺🇸 English</option>
    </select>
  </header>
</template>

<script setup lang="ts">
import { useLanguageStore } from "@/store/languageStore";

const languageStore = useLanguageStore();
</script>

<style scoped lang="scss">
.header {
  background-color: #00c100;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
  padding: 0 20px;
}

.logo-container {
  font-size: 1.8rem;
  margin-right: 10px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.language-select {
  background: white;
  color: black;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  border: none;
}
</style>
