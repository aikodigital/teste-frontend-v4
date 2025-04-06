<script lang="ts" setup>
import DefaultHeader from '@/components/Base/DefaultHeader.vue'
import AppFooter from '@/components/Base/AppFooter.vue'
</script>

<template>
  <DefaultHeader />
  <MenuSideBar />
  <v-main>
    <v-container
      max-width="1200px"
      fluid
    >
      <router-view />
    </v-container>
  </v-main>
  <AppFooter />
</template>
