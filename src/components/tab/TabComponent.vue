<template>
  <Tabs :value="0" scrollable>
    <TabList>
      <Tab v-for="(tab, index) in tabs" :key="tab.name" :value="index">
        {{ tab.name }}
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="(tab, index) in tabs" :key="index" :value="index">
        <slot :name="tab.slot" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'

type TabsType = {
  name: string
  slot: string
}

defineProps<{
  tabs?: TabsType[]
}>()
</script>

<style scoped></style>
