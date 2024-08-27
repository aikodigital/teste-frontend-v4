<template>
    <div class="filters">
      <select v-model="selectedModel" @change="applyFilter">
        <option value="">Todos os Modelos</option>
        <option v-for="model in models" :key="model.id" :value="model.id">{{ model.name }}</option>
      </select>
  
      <select v-model="selectedState" @change="applyFilter">
        <option value="">Todos os Estados</option>
        <option v-for="state in states" :key="state.id" :value="state.id">{{ state.name }}</option>
      </select>
  
      <input type="text" v-model="searchQuery" @input="applyFilter" placeholder="Pesquisar Equipamento..." />
    </div>
  </template>
  
  <script>
  export default {
    props: ['models', 'states'],
    data() {
      return {
        selectedModel: '',
        selectedState: '',
        searchQuery: ''
      };
    },
    methods: {
      applyFilter() {
        this.$emit('filter', {
          model: this.selectedModel,
          state: this.selectedState,
          query: this.searchQuery
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .filters {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  </style>
  