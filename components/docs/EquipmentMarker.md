# Componente `EquipmentMarker`

O componente `EquipmentMarker` é responsável por exibir um marcador no mapa com as informações do equipamento.

## Propriedades

- equipment: {IEquipment} - Dados do equipamento a ser exibido.

## Estrutura do Template

```vue
<template>
  /** Marcador Leaflet */
  <LMarker :latLng="[equipment.currentPosition.lat, equipment.currentPosition.lon]">
    /** Popup exibido ao clicar em algum marcador */
    <LPopup>
      /** Componente para exibir detalhes do equipemnto */
      <EquipmentDetails :equipment="equipment" />
    </LPopup>

    /** Ícone do marcador */
    <LIcon :icon-size="[32, 32]">
      <Icon :name="getIconModel(equipment.model?.name)" />
    </LIcon>
  </LMarker>
</template>
```

## Exemplo de usp

```vue
<template>
  <EquipmentMarker :equipment="equipment" />
</template>
```
