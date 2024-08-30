# Componente `StateHistoryList`

O componente `StateHistoryList` é responsável por exibir o histórico de estados de um equipamento.

## Estrutura do Template

```vue
<template>
  /** Container principal */
  <aside>
    /** Cabeçalho da lista */
    <div>
      /** Botão para voltar a exibição de equipamentos */
      <button @click="handleShowEquipmentList">
        <Icon />
      </button>

      <h2>
        Histórico de Estados
      </h2>

      /** Elemento invisível para centralizar o título e manter o ícone de voltar na esquerda */
      <div class="invisible" />
    </div>

    /** Card para exibir o equipamento selecionado */
    <div>
      <span>
        Equipamento selecionado:
      </span>

      <EquipmentDetails :equipment="selectedEquipment!" :hide-action="true" />
    </div>

    /** Cointainer da lista de estados */
    <ul>
      /** Itera cada estado */
      <li v-for="(state, index) in stateHistory" :key="index">
        <div>
          /** Data do estado */
          <span>
            <span>
              Data:
            </span>

            {{ dayjs(state.date).format('DD/MM/YYYY') }}
          </span>

          /** Hora do estado */
          <span>
            <span>
              Hora:
            </span>

            {{ dayjs(state.date).utc().format('HH:mm:ss') }}
          </span>
        </div>

        /** Nome do estado */
        <span>
          <span>
            Estado:
          </span>

          <span :class="getCurrentStateClass(state.name)">
            {{ state.name }}
          </span>
        </span>
      </li>
    </ul>
  </aside>
</template>

```

## Exemplo de uso

```vue
<template>
  <StateHistoryList />
</template>
```
