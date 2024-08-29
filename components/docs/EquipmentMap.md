# Componente `EquipmentMap`

O componente `EquipmentMap` é responsável por exibir um mapa com a localização dos equipamentos e a rota percorrida por eles.

## Estrutura do Template

```vue
<template>
  /** Cointainer principal */
  <div>
    /** Mapa Leaflet */
    <LMap ref="map" style="height: 100%" :zoom="zoom" :center="centralPosition" :useGlobalLeaflet="false">
      /** Créditos */
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layerType="base" name="OpenStreetMap" />

      /** Itera sobre cada equipamento filtrado */
      <div v-for="equipment in filteredEquipments" :key="equipment.id">
        /** Ponto no mapa no qual o equipamento está */
        <EquipmentMarker :equipment="equipment" />
      </div>

      /** Trajeto dos equipamentos selecionados */
      <LPolyline :lat-lngs="positionsArray as unknown as LatLngExpression[]" color="green" />
    </LMap>
  </div>
</template>
```

## Exemplo de uso

```vue
<template>
  <EquipmentMap />
</template>
```
