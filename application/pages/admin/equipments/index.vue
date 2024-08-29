<template>
  <AdminPage title="Equipments">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Model</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="equipment in data" :key="equipment.id">
          <td>{{ equipment.name }}</td>
          <td>{{ equipment.equipmentModelId }}</td>
        </tr>
      </tbody>
    </table>
  </AdminPage>

</template>

<script setup lang="ts">
const { data } = await useFetch(
  '/api/equipment',
)
</script>