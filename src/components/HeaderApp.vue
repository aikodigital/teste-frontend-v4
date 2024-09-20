<template>
    <div class="header-area">
        <img src="@/assets/aiko.png" alt="Company logo">
        <h1>Localizador de Equipamentos</h1>
    </div>
</template>

<style scoped>
.header-area {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    padding: 0 30px;

    background-color: var(--indigo-dark-blue);
    box-shadow: 0 8px 6px -6px rgb(0, 0, 0);
    width: 100vw;
    height: 70px;
}

img {
    height: 70%;
    margin-right: 30px;
}

h1 {
    color: var(--light-gray-2);
}
</style>