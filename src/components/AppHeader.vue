<template>
    <header class="app-header">
      <div class="container d-flex align-items-center py-3">
        <img 
          src="@/assets/logo.png" 
          alt="Logo do Sistema" 
          class="header-logo me-3"
          v-if="logo"
        >
        <h1 class="mb-0">Monitor de Equipamentos Florestais</h1>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  defineProps({
    logo: {
      type: Boolean,
      default: true
    }
  });
  </script>
  
  <style scoped>
  .app-header {
    background-color: #198754;
    color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .header-logo {
    height: 40px;
    width: auto;
  }

  h1 {
    font-size: 20px;
  }
  </style>