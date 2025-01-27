<template>
  <q-layout view="lHh lpR lFf">
    <q-header bordered class="bg-primary text-white" height-hint="98" v-show="$q.screen.lt.md">
      <q-toolbar>
        <q-toolbar-title> Map Equipment </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="bi-list"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      class="flex flex-col h-full bg-primary"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <q-list class="grow">
        <SidebarMenu
          v-for="item in lstMenu"
          :key="item.path"
          :data="item"
          :selected="selectedItem === item.path"
          @update:selectedItem="selectedItem = $event"
        />
      </q-list>
      <q-item class="flex items-center">
        <q-icon
          name="bi-brightness-high-fill"
          :color="$q.dark.isActive ? 'info' : 'secondary'"
          size="20px"
        />
        <q-toggle v-model="darkTheme" color="secondary" @click="changeTheme" />
        <q-icon
          name="bi-moon-fill"
          :color="darkTheme ? 'secondary' : $q.dark.isActive ? 'white' : 'info'"
          size="20px"
        />
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { inject, onBeforeMount, ref } from 'vue'
import { useThemeStore } from 'src/stores/theme'
import { useQuasar } from 'quasar'
import SidebarMenu from 'src/components/SidebarMenu.vue'
import * as MiddlewareService from 'src/services/MiddlewareService'
import { triggerNegative } from 'src/utils/triggers'
import { useEquipmentStore } from 'src/stores/equipment'
import { useRoute } from 'vue-router'

const lstMenu = [
  { title: 'Dashboard', path: '/', icon: 'house-fill' },
  { title: 'Map', path: '/map', icon: 'globe-americas' },
]

const $q = useQuasar()
const route = useRoute()
const theme = useThemeStore()
const eqpStore = useEquipmentStore()
const bus = inject('bus')

const selectedItem = ref(lstMenu[0])
const leftDrawerOpen = ref(false)
const darkTheme = ref(theme.storeThemeDataGetter.dark)

const changeTheme = () => {
  $q.dark.toggle()
  theme.storageThemeSave({ dark: $q.dark.isActive })
  bus.emit('changeTheme')
}

const fetchData = async () => {
  try {
    const respState = await MiddlewareService.GetData('equipmentState')
    eqpStore.setState(respState)
    const respModel = await MiddlewareService.GetData('equipmentModel')
    eqpStore.setModel(respModel)
    const respHistory = await MiddlewareService.GetData('equipmentStateHistory')
    eqpStore.setHistory(respHistory)
    const respPosition = await MiddlewareService.GetData('equipmentPositionHistory')
    eqpStore.setPosition(respPosition)

    const response = await MiddlewareService.GetData('equipment')
    const lstEquipment = response.map((eqp) => {
      const lstStates = respHistory.find((history) => history.equipmentId === eqp.id).states
      const lstPositions = respPosition.find((pos) => pos.equipmentId === eqp.id).positions
      return {
        ...eqp,
        model: respModel.find((model) => model.id === eqp.equipmentModelId).name,
        state: respState.find(
          (state) => state.id == lstStates[lstStates.length - 1].equipmentStateId,
        ),
        position: lstPositions[lstPositions.length - 1],
      }
    })
    eqpStore.setData(lstEquipment)
  } catch (error) {
    triggerNegative(error || 'Erro')
  }
}

onBeforeMount(() => {
  selectedItem.value = route.fullPath
  if (theme.storeThemeDataGetter.dark && !$q.dark.isActive) {
    $q.dark.toggle()
  }

  fetchData()
})
</script>
