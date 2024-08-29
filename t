[1mdiff --git a/app.vue b/app.vue[m
[1mindex 0cfb62b..c94c542 100644[m
[1m--- a/app.vue[m
[1m+++ b/app.vue[m
[36m@@ -1,4 +1,6 @@[m
 <script setup lang="ts">[m
[32m+[m[32museHead({ title: 'Teste Frontend V4' })[m
[32m+[m
 const { fetchEquipmentData } = useEquipments()[m
 await callOnce(fetchEquipmentData)[m
 </script>[m
[1mdiff --git a/assets/css/main.css b/assets/css/main.css[m
[1mindex f51ae23..7b69362 100644[m
[1m--- a/assets/css/main.css[m
[1m+++ b/assets/css/main.css[m
[36m@@ -22,6 +22,5 @@[m [mbody {[m
   a {[m
     user-select: none;[m
     text-decoration: none;[m
[31m-    font-weight: bold;[m
   }[m
 }[m
[1mdiff --git a/components/App/Footer.vue b/components/App/Footer.vue[m
[1mindex 64eb144..6ae6d54 100644[m
[1m--- a/components/App/Footer.vue[m
[1m+++ b/components/App/Footer.vue[m
[36m@@ -45,17 +45,20 @@[m [mfooter {[m
 [m
   nav {[m
     flex-direction: column;[m
[31m-  }[m
[32m+[m[32m    flex-wrap: wrap;[m
 [m
[31m-  .nav-section {[m
[31m-    display: flex;[m
[31m-    gap: 16px;[m
[32m+[m[32m    .nav-section {[m
[32m+[m[32m      display: flex;[m
[32m+[m[32m      flex-wrap: wrap;[m
[32m+[m[32m      gap: 16px;[m
 [m
[31m-    a {[m
[31m-      color: white;[m
[32m+[m[32m      a {[m
[32m+[m[32m        color: white;[m
[32m+[m[32m        text-wrap: nowrap;[m
 [m
[31m-      &:hover {[m
[31m-        color: var(--secondary-color);[m
[32m+[m[32m        &:hover {[m
[32m+[m[32m          color: var(--secondary-color);[m
[32m+[m[32m        }[m
       }[m
     }[m
   }[m
[1mdiff --git a/components/App/Map.vue b/components/App/Map.vue[m
[1mdeleted file mode 100644[m
[1mindex ca08453..0000000[m
[1m--- a/components/App/Map.vue[m
[1m+++ /dev/null[m
[36m@@ -1,59 +0,0 @@[m
[31m-<script setup lang="ts">[m
[31m-interface MapMarker {[m
[31m-  key: string[m
[31m-  name: string[m
[31m-  model: string[m
[31m-  state: string[m
[31m-  lat: number[m
[31m-  lon: number[m
[31m-  color: string[m
[31m-}[m
[31m-[m
[31m-interface MapProps {[m
[31m-  markers: MapMarker[][m
[31m-  zoom: number[m
[31m-  markerRadius: number[m
[31m-  hasPath?: boolean[m
[31m-}[m
[31m-[m
[31m-const props = defineProps<MapProps>()[m
[31m-[m
[31m-const mapPath = props.markers.map(marker => ({ lat: marker.lat, lng: marker.lon }))[m
[31m-</script>[m
[31m-[m
[31m-<template>[m
[31m-  <div id="leaflet-map-container">[m
[31m-    <LMap :zoom="props.zoom" :center="[-19.16, -45.95]" :useGlobalLeaflet="false">[m
[31m-      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layerType="base" />[m
[31m-      <LCircleMarker[m
[31m-        v-for="marker in props.markers"[m
[31m-        :key="marker.key"[m
[31m-        :latLng="[marker.lat, marker.lon]"[m
[31m-        :color="formatFromStringToHashColorHex(marker.model)"[m
[31m-        :radius="props.markerRadius"[m
[31m-      >[m
[31m-        <LTooltip>[m
[31m-          <div>[m
[31m-            <div><strong>Nome: </strong>{{ marker.name }}</div>[m
[31m-            <div><strong>Modelo: </strong>{{ marker.model }}</div>[m
[31m-            <div><strong>Estado: <span :style="`color: ${marker.color}`">{{ marker.state }}</span></strong></div>[m
[31m-            <div><strong>Localização: </strong>({{ marker.lat }}, {{ marker.lon }})</div>[m
[31m-          </div>[m
[31m-        </LTooltip>[m
[31m-      </LCircleMarker>[m
[31m-      <LPolyline[m
[31m-        v-if="props.hasPath"[m
[31m-        :latLngs="mapPath"[m
[31m-        :color="'gray'"[m
[31m-        :opacity="0.3"[m
[31m-      />[m
[31m-    </LMap>[m
[31m-  </div>[m
[31m-</template>[m
[31m-[m
[31m-<style scoped>[m
[31m-#leaflet-map-container {[m
[31m-  height: 80vh;[m
[31m-  width: 100%;[m
[31m-}[m
[31m-</style>[m
[1mdiff --git a/components/App/Table.vue b/components/App/Table.vue[m
[1mindex 57bd349..1c29992 100644[m
[1m--- a/components/App/Table.vue[m
[1m+++ b/components/App/Table.vue[m
[36m@@ -9,6 +9,7 @@[m [minterface TableProps<T> {[m
   title: string[m
   headers: TableHeader<T>[][m
   rows: T[][m
[32m+[m[32m  clickable?: boolean[m
 }[m
 [m
 const props = defineProps<TableProps<any>>()[m
[36m@@ -41,6 +42,7 @@[m [mfunction cellStyle(color?: string): string {[m
           v-for="row in props.rows"[m
           :key="row.key"[m
           @click="onClickRow(row.key)"[m
[32m+[m[32m          :style="`cursor: ${props.clickable ? 'pointer' : 'default'}`"[m
         >[m
           <td[m
             v-for="header in props.headers"[m
[36m@@ -58,6 +60,9 @@[m [mfunction cellStyle(color?: string): string {[m
 <style scoped>[m
 #table-container {  [m
   background-color: var(--container-color);[m
[32m+[m[32m  max-height: 50vh;[m
[32m+[m[32m  overflow: auto;[m
[32m+[m[32m  border-radius: 4px;[m
 [m
   .table-title {[m
     text-align: center;[m
[36m@@ -69,7 +74,6 @@[m [mfunction cellStyle(color?: string): string {[m
   table {[m
     width: 100%;[m
     border-collapse: collapse;[m
[31m-    border-radius: 4px;[m
 [m
     tr {[m
       border-top: 1px solid var(--border-color);[m
[36m@@ -81,7 +85,6 @@[m [mfunction cellStyle(color?: string): string {[m
 [m
     tbody tr {[m
       font-size: 14px;[m
[31m-      cursor: pointer;[m
       height: 36px;[m
 [m
       &:hover {[m
[1mdiff --git a/components/Equipment/Card.vue b/components/Equipment/Card.vue[m
[1mindex fc602dd..5c60365 100644[m
[1m--- a/components/Equipment/Card.vue[m
[1m+++ b/components/Equipment/Card.vue[m
[36m@@ -3,7 +3,7 @@[m [mimport type EquipmentPosition from '~/types/EquipmentPosition';[m
 import type EquipmentStateDate from '~/types/EquipmentStateDate';[m
 [m
 interface CardProps {[m
[31m-  equipmentId: string[m
[32m+[m[32m  equipmentId?: string[m
   modelName: string[m
   recentStateDate: EquipmentStateDate | null[m
   recentPosition: EquipmentPosition | null[m
[36m@@ -34,51 +34,64 @@[m [mconst formattedPosition = computed<string>(() => {[m
 [m
 <template>[m
   <div id="card-container">[m
[31m-    <div>[m
[31m-      <strong>Modelo: </strong>[m
[31m-      {{ props.modelName }}[m
[31m-    </div>[m
[31m-    <div>[m
[31m-      <strong>Estado Atual: </strong>[m
[31m-      <strong :style="stateDateColorStyle">[m
[31m-        {{ formattedStateDate }}[m
[31m-      </strong>[m
[31m-    </div>[m
[31m-    <div>[m
[31m-      <strong>Percentual de produtividade: </strong>[m
[31m-      {{ formatFromNumberToStringPercentage(props.productivityRate) }}[m
[31m-    </div>[m
[31m-    <div>[m
[31m-      <strong>Localização Atual: </strong>[m
[31m-      {{ formattedPosition }}[m
[31m-    </div>[m
[31m-    <div>[m
[31m-      <strong>Ganho: </strong>[m
[31m-      {{ props.profit }}[m
[31m-    </div>[m
[31m-    <div>[m
[31m-      <strong>Histórico de localizações: </strong>[m
[31m-      <NuxtLink :to="`/equipments/${equipmentId}/map`">Ver mapa</NuxtLink>[m
[31m-    </div>[m
[31m-  </div>[m
[32m+[m[32m    <section>[m
[32m+[m[32m      <div>[m
[32m+[m[32m        <strong>Modelo: </strong>[m
[32m+[m[32m        {{ props.modelName }}[m
[32m+[m[32m      </div>[m
[32m+[m[32m      <div>[m
[32m+[m[32m        <strong>Estado: </strong>[m
[32m+[m[32m        <strong :style="stateDateColorStyle">[m
[32m+[m[32m          {{ formattedStateDate }}[m
[32m+[m[32m        </strong>[m
[32m+[m[32m      </div>[m
[32m+[m[32m    </section>[m
[32m+[m[32m    <section>[m
[32m+[m[32m      <div>[m
[32m+[m[32m        <strong>Ganho do equipamento: </strong>[m
[32m+[m[32m        {{ props.profit }}[m
[32m+[m[32m      </div>[m
[32m+[m[32m      <div>[m
[32m+[m[32m        <strong>Percentual de produtividade: </strong>[m
[32m+[m[32m        {{ formatFromNumberToStringPercentage(props.productivityRate) }}[m
[32m+[m[32m      </div>[m
[32m+[m[32m    </section>[m
[32m+[m[32m    <section>[m
[32m+[m[32m      <div>[m
[32m+[m[32m        <strong>Localização: </strong>[m
[32m+[m[32m        {{ formattedPosition }}[m
[32m+[m[32m      </div>[m
[32m+[m[32m      <div v-if="equipmentId">[m
[32m+[m[32m        <strong>Histórico de localizações: </strong>[m
[32m+[m[32m        <NuxtLink :to="`/equipments/${equipmentId}/map`">Ver mapa</NuxtLink>[m
[32m+[m[32m      </div>[m
[32m+[m[32m    </section>[m
[32m+[m[32m  </div>[m[41m    [m
 </template>[m
 [m
 [m
 <style scoped>[m
 #card-container {[m
[31m-  display: grid;[m
[31m-  grid-template-columns: 1fr 1fr;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  justify-content: space-between;[m
[32m+[m[32m  flex-wrap: wrap;[m
   background-color: rgb(250, 250, 250);[m
[31m-  row-gap: 16px;[m
[32m+[m[32m  gap: 16px;[m
   padding: 16px;[m
   font-size: 14px;[m
   [m
[31m-  a {[m
[31m-    font-weight: bold;[m
[31m-    color: var(--primary-color);[m
[32m+[m[32m  section {[m
[32m+[m[32m    display: flex;[m
[32m+[m[32m    flex-direction: column;[m
[32m+[m[32m    row-gap: 16px;[m
 [m
[31m-    &:hover {[m
[31m-      color: var(--secondary-color);[m
[32m+[m[32m    a {[m
[32m+[m[32m      font-weight: bold;[m
[32m+[m[32m      color: var(--primary-color);[m
[32m+[m
[32m+[m[32m      &:hover {[m
[32m+[m[32m        color: var(--secondary-color);[m
[32m+[m[32m      }[m
     }[m
   }[m
 }[m
[1mdiff --git a/components/Equipment/SearchBar.vue b/components/Equipment/SearchBar.vue[m
[1mindex 6ee7c5e..da9704e 100644[m
[1m--- a/components/Equipment/SearchBar.vue[m
[1m+++ b/components/Equipment/SearchBar.vue[m
[36m@@ -53,15 +53,16 @@[m [mconst stateOptions = computed<SelectOption[]>(() => props.states.map(state => ({[m
 [m
 <style scoped>[m
 #search-bar-container {[m
[31m-  display: grid;[m
[31m-  grid-template-columns: 2fr 1fr 1fr;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  flex-wrap: wrap;[m
   background-color: var(--container-color);[m
   border-radius: 4px;[m
[31m-  column-gap: 16px;[m
[32m+[m[32m  gap: 16px;[m
   padding: 16px;[m
   align-items: center;[m
 [m
   .search-bar-input {[m
[32m+[m[32m    flex: 1;[m
     display: flex;[m
     flex-direction: column;[m
     row-gap: 4px;[m
[1mdiff --git a/nuxt.config.ts b/nuxt.config.ts[m
[1mindex 0c5603c..bab1f3e 100644[m
[1m--- a/nuxt.config.ts[m
[1m+++ b/nuxt.config.ts[m
[36m@@ -3,5 +3,6 @@[m [mexport default defineNuxtConfig({[m
   css: ['~/assets/css/main.css'],[m
   plugins: ['~/plugins/fontawesome.ts'],[m
   ssr: false,[m
[31m-  modules: ['@nuxtjs/leaflet'][m
[32m+[m[32m  modules: ['@nuxtjs/leaflet'],[m
[32m+[m[32m  devtools: { enabled: false }[m
 })[m
\ No newline at end of file[m
[1mdiff --git a/pages/equipments/[id]/index.vue b/pages/equipments/[id]/index.vue[m
[1mindex 4b8128a..082f28c 100644[m
[1m--- a/pages/equipments/[id]/index.vue[m
[1m+++ b/pages/equipments/[id]/index.vue[m
[36m@@ -51,34 +51,35 @@[m [mconst positionHistoryTableRows = computed(() => sortedPositions.value.map(positi[m
 [m
 <template>[m
   <div id="equipment-container">[m
[31m-    <div v-if="equipment" class="equipment-info">[m
[31m-      <div class="info-title">{{ equipment.name }}</div>[m
[31m-      <div class="info-actions">[m
[31m-        <div class="back-button" @click="router.back">[m
[31m-          <FontAwesomeIcon :icon="['fas', 'arrow-left']" />[m
[31m-          Voltar[m
[31m-        </div>[m
[32m+[m[32m    <section class="card-header">[m
[32m+[m[32m      <div class="card-title">{{ equipment?.name }}</div>[m
[32m+[m[32m      <div class="card-action" @click="router.back">[m
[32m+[m[32m        <FontAwesomeIcon :icon="['fas', 'arrow-left']" />[m
[32m+[m[32m        Voltar[m
       </div>[m
[31m-      <EquipmentCard[m
[31m-        class="info-card"[m
[31m-        :equipmentId="equipment.id"[m
[31m-        :modelName="equipment.model?.name ?? 'Não informado'"[m
[31m-        :recentStateDate="recentStateDate"[m
[31m-        :recentPosition="recentPosition"[m
[31m-        :productivityRate="0.85"[m
[31m-        :profit="8000"[m
[31m-      />[m
[32m+[m[32m    </section>[m
[32m+[m[32m    <EquipmentCard[m
[32m+[m[32m      :equipmentId="equipment?.id"[m
[32m+[m[32m      :modelName="equipment?.model?.name ?? 'Não informado'"[m
[32m+[m[32m      :recentStateDate="recentStateDate"[m
[32m+[m[32m      :recentPosition="recentPosition"[m
[32m+[m[32m      :productivityRate="0.85"[m
[32m+[m[32m      :profit="8000"[m
[32m+[m[32m    />[m
[32m+[m[32m    <section class="card-tables">[m
       <AppTable[m
[32m+[m[32m        class="card-table"[m
         title="Histórico de estados"[m
         :headers="stateHistoryTableHeaders"[m
         :rows="stateHistoryTableRows"[m
       />[m
       <AppTable[m
[32m+[m[32m        class="card-table"[m
         title="Histórico de localizações (lista)"[m
         :headers="positionHistoryTableHeaders"[m
         :rows="positionHistoryTableRows"[m
       />[m
[31m-    </div>[m
[32m+[m[32m    </section>[m
   </div>[m
 </template>[m
 [m
[36m@@ -86,37 +87,40 @@[m [mconst positionHistoryTableRows = computed(() => sortedPositions.value.map(positi[m
 #equipment-container {[m
   display: flex;[m
   flex-direction: column;[m
[31m-  align-items: center;[m
[31m-[m
[31m-  .equipment-info {[m
[31m-    display: grid;[m
[31m-    grid-template-columns: 1fr 1fr;[m
[31m-    border-radius: 4px;[m
[31m-    gap: 32px;[m
[31m-    background-color: white;[m
[31m-    padding: 16px 32px;[m
[31m-[m
[31m-    .info-title {[m
[32m+[m[32m  border-radius: 4px;[m
[32m+[m[32m  gap: 16px;[m
[32m+[m[32m  background-color: white;[m
[32m+[m[32m  padding: 16px 32px;[m
[32m+[m
[32m+[m[32m  .card-header {[m
[32m+[m[32m    display: flex;[m
[32m+[m[32m    align-items: center;[m
[32m+[m[32m    flex-wrap: wrap;[m
[32m+[m[32m    gap: 16px;[m
[32m+[m[32m    justify-content: space-between;[m
[32m+[m[32m    font-weight: bold;[m
[32m+[m
[32m+[m[32m    .card-title {[m
       font-size: 24px;[m
[31m-      font-weight: bold;[m
     }[m
 [m
[31m-    .info-card {[m
[31m-      grid-column: 1/3[m
[31m-    }[m
[32m+[m[32m    .card-action {[m
[32m+[m[32m      color: var(--primary-color);[m
 [m
[31m-    .info-actions {[m
[31m-      align-self: center;[m
[31m-      justify-self: end;[m
[32m+[m[32m      &:hover {[m
[32m+[m[32m        color: var(--secondary-color);[m
[32m+[m[32m      }[m
[32m+[m[32m    }[m
[32m+[m[32m  }[m
 [m
[31m-      .back-button {[m
[31m-        font-weight: bold;[m
[31m-        color: var(--primary-color);[m
[32m+[m[32m  .card-tables {[m
[32m+[m[32m    display: flex;[m
[32m+[m[32m    flex-wrap: wrap;[m
[32m+[m[32m    gap: 16px;[m
[32m+[m[32m    justify-content: space-between;[m
 [m
[31m-        &:hover {[m
[31m-          color: var(--secondary-color);[m
[31m-        }[m
[31m-      }[m
[32m+[m[32m    .card-table {[m
[32m+[m[32m      flex: 1;[m
     }[m
   }[m
 }[m
[1mdiff --git a/pages/equipments/[id]/map.vue b/pages/equipments/[id]/map.vue[m
[1mindex 24e4588..3ff2cfa 100644[m
[1m--- a/pages/equipments/[id]/map.vue[m
[1m+++ b/pages/equipments/[id]/map.vue[m
[36m@@ -28,6 +28,7 @@[m [mconst mapMarkers = computed(() => {[m
     state: recentStateDate?.state?.name ?? 'Sem histórico',[m
     lat: position.lat,[m
     lon: position.lon,[m
[32m+[m[32m    date: formatFromRawStringDateToPrettyStringDate(position.date),[m
     color: recentStateDate?.state?.color ?? 'inherit'[m
   }))[m
 })[m
[36m@@ -44,12 +45,14 @@[m [mconst mapMarkers = computed(() => {[m
         </div>[m
       </div>[m
     </div>[m
[31m-    <AppMap[m
[31m-      :markers="mapMarkers"[m
[31m-      :markerRadius="5"[m
[31m-      :zoom="11"[m
[31m-      :hasPath="true"[m
[31m-    />[m
[32m+[m[32m    <EquipmentMap :markers="mapMarkers" :zoom="11" :hasPath="true">[m
[32m+[m[32m      <template #tooltip="{ marker }">[m
[32m+[m[32m        <div>[m
[32m+[m[32m          <div><strong>Localização: </strong>({{ marker.lat }}, {{ marker.lon }})</div>[m
[32m+[m[32m          <div><strong>Data: </strong>{{ marker.date }}</div>[m
[32m+[m[32m        </div>[m
[32m+[m[32m      </template>[m
[32m+[m[32m    </EquipmentMap>[m
   </div>[m
 </template>[m
 [m
[36m@@ -62,11 +65,12 @@[m [mconst mapMarkers = computed(() => {[m
   align-items: stretch;[m
 [m
   .map-info {[m
[31m-    display: grid;[m
[31m-    grid-template-columns: 1fr 1fr;[m
[32m+[m[32m    display: flex;[m
[32m+[m[32m    flex-wrap: wrap;[m
[32m+[m[32m    justify-content: space-between;[m
     background-color: var(--container-color);[m
     border-radius: 4px;[m
[31m-    gap: 32px;[m
[32m+[m[32m    row-gap: 16px;[m
     padding: 16px 32px;[m
 [m
     .info-title {[m
[1mdiff --git a/pages/index.vue b/pages/index.vue[m
[1mindex bf7d862..252f907 100644[m
[1m--- a/pages/index.vue[m
[1m+++ b/pages/index.vue[m
[36m@@ -76,6 +76,7 @@[m [mfunction onClickRow(equipmentId: string): void {[m
       title="Equipamentos"[m
       :headers="tableHeaders"[m
       :rows="tableRows"[m
[32m+[m[32m      :clickable="true"[m
       @click="onClickRow"[m
     />[m
   </div>[m
[1mdiff --git a/pages/map.vue b/pages/map.vue[m
[1mindex 0f49ad4..bdb9ce2 100644[m
[1m--- a/pages/map.vue[m
[1m+++ b/pages/map.vue[m
[36m@@ -43,6 +43,7 @@[m [mconst mapMarkers = computed(() => {[m
     state: equipment.recentStateDate?.state?.name ?? 'Sem histórico',[m
     lat: equipment.recentPosition?.lat ?? 0,[m
     lon: equipment.recentPosition?.lon ?? 0,[m
[32m+[m[32m    date: equipment.recentPosition?.date ?? 'Não informado',[m
     color: equipment.recentStateDate?.state?.color ?? 'inherit'[m
   })) ?? [][m
 [m
[36m@@ -54,16 +55,17 @@[m [mconst mapMarkers = computed(() => {[m
 [m
 <template>[m
   <div class="container">[m
[31m-    <EquipmentSearchBar[m
[31m-      :filters="filters"[m
[31m-      :models="models"[m
[31m-      :states="states"[m
[31m-    />[m
[31m-    <AppMap[m
[31m-      :markers="mapMarkers"[m
[31m-      :markerRadius="8"[m
[31m-      :zoom="9"[m
[31m-    />[m
[32m+[m[32m    <EquipmentSearchBar :filters="filters" :models="models" :states="states" />[m
[32m+[m[32m    <EquipmentMap :markers="mapMarkers" :zoom="9">[m
[32m+[m[32m      <template #tooltip="{ marker }">[m
[32m+[m[32m        <div>[m
[32m+[m[32m          <div><strong>Nome: </strong>{{ marker.name }}</div>[m
[32m+[m[32m          <div><strong>Modelo: </strong>{{ marker.model }}</div>[m
[32m+[m[32m          <div><strong>Estado: <span :style="`color: ${marker.color}`">{{ marker.state }}</span></strong></div>[m
[32m+[m[32m          <div><strong>Localização: </strong>({{ marker.lat }}, {{ marker.lon }})</div>[m
[32m+[m[32m        </div>[m
[32m+[m[32m      </template>[m
[32m+[m[32m    </EquipmentMap>[m
   </div>[m
 </template>[m
 [m
