<template>
    <div class="statistics">
      <div class="stat">
        <h3>Produtividade: {{ productivity }}%</h3>
      </div>
      <div class="stat">
        <h3>Ganho: R$ {{ earnings }}</h3>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['productivity', 'earnings']
  };
  </script>
  
  <style scoped>
  .statistics {
    display: flex;
    gap: 20px;
    margin-top: 10px;
  }
  .stat {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
  }
  </style>
  