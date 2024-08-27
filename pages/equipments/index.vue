<script setup lang="ts">
const { data: equipments } = await useFetch('/api/equipments')
</script>

<template>
  <div class="container">
    <div v-if="equipments">
      <table>
        <tr>
          <th>Nome</th>
          <th>Modelo</th>
          <th>Ações</th>
        </tr>
        <tr v-for="equipment in equipments" :key="equipment.id">
          <td>{{ equipment.name }}</td>
          <td>{{ equipment.model?.name }}</td>
          <td><NuxtLink :to="`/equipments/${equipment.id}`">Detalhes</NuxtLink></td>
        </tr>
      </table>
    </div>
    <div v-else class="empty">
      loading
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: rgb(150, 200, 150);

  table {
    background-color: white;
    border-collapse: collapse;

    tr {
      padding: 8px;
      border-bottom: 1px solid black;

      &:last-child {
        border: 0
      }
    }

    td, th {
      text-align: start;
      padding: 8px 16px;
      
      &:last-child {
        text-align: center
      }
    }
  }
}
</style>
