<script setup lang="ts">
const numbers: number[] = [];

onMounted(() => {
  for (let i = 1; i < 11; i++) {
    numbers.push(i);
  }
});
</script>

<template>
  <div>
    <li>
      <ul v-for="number in numbers" :key="number">
        {{ number }}
      </ul>
    </li>
  </div>
</template>
