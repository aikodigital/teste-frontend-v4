# Componente `EquipmentList`

O componente `EquipmentList` é responsável por exibir a lista de equipamentos disponíveis. Ele permite visualizar os equipamentos em uma lista e filtrar por estado atual e modelo.

## Estrutura do Template

```vue
<template>
  /** Container principal */
  <aside>
    <h2>
      Lista de equipamentos
    </h2>

    /** Container de filtros */
    <div>
      /** Componente de filtro de estados */
      <StateFilter @update:selectedState="handleStateChange" />

      /** Componente de filtro de modelos */
      <ModelFilter @update:selectedModel="handleModelChange" />
    </div>

    /** Lista de equipamentos a ser exibida caso haja equipamentos */
    <ul v-if="filteredEquipments.length">
      /** Itera sobre cada equipamento */
      <li v-for="equipment in filteredEquipments" :key="equipment.id">
        /** Componente para exibir detalhes do equipemnto */
        <EquipmentDetails :equipment="equipment" />
      </li>
    </ul>

    /** Lista de equipamentos a ser exibida caso não haja equipamentos */
    <ul v-else>
      <li>
        Nenhum equipamento encontrado
      </li>
    </ul>
  </aside>
</template>

```

## Exemplo de uso

```vue
<template>
  <EquipmentList />
</template>
```
