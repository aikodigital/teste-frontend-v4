<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMenu } from '@/composables/useMenu';
import { useDisplay } from 'vuetify'

const route = useRoute()
const router = useRouter()

const { xs } = useDisplay()

const  menuItems = useMenu()

const drawer = ref<boolean>(true) 
const rail = ref<boolean>(true)

const isMobile = computed<boolean>(() => xs.value);
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    class="menu-sidebar"
    :rail="rail"
    permanent
    :location="isMobile ? 'bottom' : 'left'"
    color="#fdfdfd"
    @click="rail = false"
  >
    <v-list-item
      class="text-primary"
      prepend-avatar="https://randomuser.me/api/portraits/men/82.jpg"
      title="Gestor Fulano"
      nav
    >
      <template #append>
        <v-btn
          icon="mdi-chevron-left"
          variant="text"
          @click.stop="rail = !rail"
        />
      </template>
    </v-list-item>

    <v-divider />

    <v-list
      v-for="menu in menuItems"
      :key="menu.name"
      density="compact"
      nav
    > 
      <v-list-item
        :prepend-icon="menu.icon"
        class="cursor-pointer menu-item"
        :class="[menu.redirect === route.path && 'menu-item--active']"
        :title="menu.name"
        color="secondary"
        @click.stop="() => router.push(menu.redirect ?? '')"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss">
  .menu-sidebar {
    & .menu-item {
      color: #002255;
      
      &:hover {
        background-color: rgba(0, 193, 0, 0.8);
        color: white;
      }

      &--active {
        background-color: rgba(0, 193, 0, 0.7);
        color: white;
      }
    }
  }
</style>
