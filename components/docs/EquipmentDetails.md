# Componente `EquipmentDetails`

O componente `EquipmentDetails` é responsável por exibir os detalhes de um equipamento específico. Ele permite visualizar o histórico de estados, a porcentagem de produtividade e a rota do equipamento.

## Propriedades

- equipment: {IEquipmentDetails} - Dados do equipamento a ser exibido;

- hideAction?: {boolean} - Define se as ações devem ser ocultadas;

## Estrutura do Template

```vue
<template>
  /** Container principal */
  <div>
    /** Exibe o nome do equipamento */
    <span>
      <span>
        Nome:
      </span>

      {{ equipment.name }}
    </span>

    /** Exibe o modelo do equipamento */
    <span>
      <span>
        Modelo:
      </span>

      <Icon :name="getIconModel(equipment.model?.name)" />

      {{ equipment.model?.name }}
    </span>

    /** Exibe o estado atual do equipamento */
    <span>
      <span>
        Estado atual:
      </span>

      <span :class="getCurrentStateClass(equipment.currentState!)">
        {{ equipment.currentState }}
      </span>
    </span>

    /** Cointainer de ações */
    <div>
      /** Botão para exibir o histórico de estados do equipamento */
      <button v-if="!hideAction" @click="handleShowStateHistory">
        <Icon :name="iconRotateLeft" />

        Histórico de estados
      </button>

      /** Botão para exibir o relatório diário do equipamento */
      <button v-if="!hideAction" @click="handleShowPercentage">
        <Icon :name="iconPercent" />

        Produtividade diária
      </button>

      /** Componente de interruptor para exibir a rota do equipamento */
      <div>
        <SwitchRoot id="showRoute" v-model:checked="isChecked" @update:checked="handleSwitchRoute">
          <SwitchThumb />
        </SwitchRoot>

        <label for="showRoute">
          Exibir trajeto
        </label>
      </div>
    </div>
  </div>
</template>
```

## Exemplo de uso

Com botões de ação

```vue
<template>
  <EquipmentDetails :equipment="equipment" />
</template>
```

Sem botões de ação

```vue
<template>
  <EquipmentDetails :equipment="equipment" :hide-action="true" />
</template>
```
