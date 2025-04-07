<template>
  <header class="header px-4 py-2 d-flex align-items-center">
    <div class="logo-container">
      <img src="/img/aiko.png" alt="Logo" class="logo-image" />
    </div>

    <div class="dropdown">
      <button class="btn btn-light dropdown-toggle" @click="toggleDropdown">
        <span
          :class="`flag-icon flag-icon-${languageStore.language}`"
          class="me-2"
        ></span>
      </button>

      <ul v-if="showDropdown" class="dropdown-menu dropdown-menu-end show">
        <li class="dropdown-item" @click="changeLanguage('br')">
          <span class="flag-icon flag-icon-br"></span> {{ $t("language.br") }}
        </li>
        <li class="dropdown-item" @click="changeLanguage('us')">
          <span class="flag-icon flag-icon-us"></span> {{ $t("language.us") }}
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLanguageStore } from "@/store/languageStore";

const languageStore = useLanguageStore();
const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const changeLanguage = (lang: string) => {
  languageStore.setLanguage(lang);
  showDropdown.value = false;
};
</script>

<style scoped lang="scss">
.header {
  background-color: #ffffff;
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
  display: flex;
  align-items: center;
}

.logo-image {
  height: 40px;
  width: auto;
  display: block;
  margin-right: 12px;
}

.language-select {
  background: white;
  color: black;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  border: none;
}
.dropdown-menu {
  right: 0;
  left: auto;
}
</style>
