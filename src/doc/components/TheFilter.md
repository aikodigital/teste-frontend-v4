# Componente de Filtro de Equipamento

Este componente é uma interface para filtrar e pesquisar equipamentos globalmente na aplicao. Ele utiliza vários componentes e funcionalidades do Vue e Quasar para permitir a seleção de modelos de equipamentos e aplicar filtros de pesquisa e agrupamento.

## Funções do Componente

### 1. **Selecionar Modelo do Equipamento**

- **Componente Usado**: `<q-select>`
- **Descrição**: Permite ao usuário selecionar um modelo de equipamento a partir de uma lista de opções.

### 2. **Campo de Pesquisa**

- **Componente Usado**: `<BaseInput>`
- **Descrição**: Campo de entrada para pesquisa, visível somente quando o usuário está na visão do mapa (`isMapView`).
- **Visibilidade**: Condicional, baseado no estado `isMapView`. Somente visível quando a rota atual é `'map'`.

### 3. **Agrupar em Clusters**

- **Componente Usado**: `<BaseToggle>`
- **Descrição**: Alterna a opção de agrupar equipamentos em clusters no mapa, visível somente quando o usuário está na visão do mapa (`isMapView`).
- **Visibilidade**: Condicional, baseado no estado `isMapView`. Somente visível quando a rota atual é `'map'`.

### Computed Properties

- **`isMapView`**:
  - **Descrição**: Propriedade computada que determina se a rota atual é a visão do mapa. Se a rota for `'map'`, retorna `true`, caso contrário, retorna `false`.

### Dados e Estado

- **`stateOptions`**:
  - **Descrição**: Contém a lista de opções de modelos de equipamentos carregadas do arquivo `equipmentModel.json`.

## Exemplo de Uso

Deve ser usado no componente de layout para ser utilizado globalmente

```vue
<template>
  <TheFilter />
</template>

<script setup>
import TheFilter from '@/components/TheFilter.vue'
</script>
```
