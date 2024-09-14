<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const menuLinks = ref([
  { icon: 'dashboard', text: 'Dashboard', routeName: 'dashboard' },
  { icon: 'map', text: 'Mapa', routeName: 'map' }
])

function isSamePage(routeName: string) {
  return route.name === routeName
}
</script>

<template>
  <q-scroll-area class="fit">
    <q-item v-ripple class="flex row justify-center">
      <q-item-section avatar>
        <img class="q-pt-md q-pb-sm" width="50" src="../assets/aiko.png" />
      </q-item-section>
    </q-item>
    <q-list padding>
      <q-item
        @click="router.push({ name: link.routeName })"
        v-for="link in menuLinks"
        :key="link.text"
        clickable
        v-ripple
        :active="isSamePage(link.routeName)"
      >
        <q-item-section avatar>
          <q-icon :name="link.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ link.text }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator class="q-my-md" />
    </q-list>

    <q-item class="fixed-bottom-item" clickable v-ripple>
      <q-item-section side>
        <q-avatar rounded size="40px">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQGsSFYMQFAb2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1679429614810?e=1731542400&v=beta&t=vu5_YXTC-3aQ7pSUFAqFRlyymBZBTk0Qz6JH3GUrYP0"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-black q-mt-lg">Firmino Andre</q-item-label>
        <q-item-label caption
          >Logado como:
          <p>Aiko</p>
        </q-item-label>
      </q-item-section>
      <q-item-section side> <q-icon name="logout" size="20px" /></q-item-section>
    </q-item>
  </q-scroll-area>
</template>
<style scoped>
.fixed-bottom-item {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: white;
  padding: 16px;
}
</style>
