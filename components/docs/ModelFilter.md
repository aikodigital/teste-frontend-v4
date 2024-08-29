# Componente `ModelFilter`

O componente `ModelFilter` é responsável por exibir um filtro de modelos de equipamentos.

## Estrutura do Template

```vue
<template>
  /** Container principal */
  <div>
    /** Componente para selecionar */
    <SelectRoot v-model="selectedModel">
      /** Gatilho do componente */
      <SelectTrigger>
        /** Valor a ser exibido */
        <SelectValue placeholder="Selecione um modelo" />

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
              /** Itera sobre cada modelo */
              <SelectItem v-for="(model, index) in equipmentModels" :key="index" :value="model">
                /** Item selecionável */
                <SelectItemIndicator>
                  /** Ícone para indicar se está selecionado */
                  <Icon :name="iconCheck" />
                </SelectItemIndicator>

                /** Texto do item */
                <SelectItemText>
                  {{ model }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    /** Botão para limpar a seleção */
    <button @click="selectedModel = ''">
      <Icon :name="iconXMark" />
    </button>
  </div>
</template>
```

## Exemplo de uso

```vue
<template>
  <ModelFilter @update:selectedModel="() => {}" />
</template>
```
