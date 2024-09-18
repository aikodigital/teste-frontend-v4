<template lang="pug">
v-app(style="background-color: #EEEEEE;")
    v-app-bar.app
        v-toolbar-title
            v-img(src="../img/aiko.png" width="8vh")

    v-main
        v-container
        slot

    v-footer.app
        v-col.text-center © 2024 Gestão de equipamentos florestais
</template>