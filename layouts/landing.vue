<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <div class="d-flex align-center justify-start">
        <v-img class="ml-3" :width="100" src="public/img/aiko.png" />
      </div>
    </v-app-bar>

    <v-navigation-drawer :width="300">
      <v-list>
        <v-list-item>
          <div class="d-flex flex-column align-start justify-center">
            <span class="text-h5 inter font-weight-bold">ForestLog</span>
            <span class="text-subtitle-2 inter">Análise de equipamentos florestais</span>
          </div>
        </v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item link title="Posições dos equipamentos" active></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="min-height: 300px;">
      <slot />
    </v-main>
  </v-layout>
</template>
