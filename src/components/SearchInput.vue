<template>
    <input class="search-input" type="text" v-model="search"
        placeholder="Filtre por ID, nome, modelo ou estado...">
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const search = ref<string>("");

const emit = defineEmits(['updateSearch']);

watch(search, (newValue) => {
    const searched = newValue.split(",").map(item => item.trim());

    emit('updateSearch', searched);
});
</script>

<style scoped>
.search-input {
    background-color: var(--light-gray-1);
    width: 40vw;
    height: 40px;
    border-radius: 8px;
    padding: 5px 10px;
}
</style>
