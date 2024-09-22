<template>
    <div class="header-area">
        <div class="header-text">
            <img src="@/assets/aiko.png" alt="Company logo">
            <h1>Localizador de Equipamentos</h1>
        </div>
        <SearchInput @updateSearch="$emit('updateSearch', $event)" />
    </div>
</template>

<script setup lang="ts">
import SearchInput from './SearchInput.vue';
</script>

<style scoped>
.header-area {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

    background-color: var(--indigo-dark-blue);
    box-shadow: 0 8px 6px -6px rgb(0, 0, 0);
    width: 100vw;
    height: 70px;
}

.header-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    height: 100%;
}

img {
    height: 70%;
    margin-right: 30px;
}

h1 {
    color: var(--light-gray-2);
}
</style>