# Componente `StateFilter`

O componente `StateFilter` é responsável por exibir um filtro para selecionar o estado de um equipamento.

## Estrutura do Template

```vue
<template>
  /** Container principal */
  <div>
    /** Componente para selecionar */
    <SelectRoot v-model="selectedState">
      /** Gatilho do componente */
      <SelectTrigger>
        /** Valor a ser exibido */
        <SelectValue placeholder="Selecione um estado" />

        /** Ícone de seta para baixo */
        <Icon :name="iconChevronDown" />
      </SelectTrigger>

      /** Portal para exibir os itens */
      <SelectPortal>
        /** Conteúdo do componente para selecionar */
        <SelectContent>
          /** Viewport para exibir os itens */
          <SelectViewport>
            /** Grupo de itens */
            <SelectGroup>
              /** Itera sobre cada estado */
              <SelectItem v-for="(state, index) in equipmentStates" :key="index" :value="state">
                /** Item selecionável */
                <SelectItemIndicator>
                  /** Ícone para indicar se está selecionado */
                  <Icon :name="iconCheck" />
                </SelectItemIndicator>

                /** Texto do item */
                <SelectItemText>
                  {{ state }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    /** Botão para limpar a seleção */
    <button @click="selectedState = ''">
      <Icon :name="iconXMark" />
    </button>
  </div>
</template>
```

## Exemplo de uso

```vue
<template>
  <StateFilter @update:selectedState="() => {}" />
</template>
```
