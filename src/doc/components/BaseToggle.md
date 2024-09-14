# Componente Base Toggle

Este componente é um wrapper para o componente `<q-toggle>` do Quasar, fornecendo alguns valores padrão para as propriedades e emitindo um evento `update:modelValue` quando o valor do toggle é alterado.

## Propriedades (Props)

O componente utiliza as `QToggleProps` do Quasar, com alguns valores padrão definidos.

### Propriedades Padrão

- `color`: `'primary'`  
  Define a cor padrão do toggle como `'primary'`.

### Todas as Propriedades Disponíveis

O componente aceita todas as propriedades padrão de um `<q-toggle>` do Quasar, como:

- `modelValue`: Valor do estado do toggle (booleano).
- `label`: Rótulo exibido ao lado do toggle.
- `color`: Cor do toggle (ex.: `primary`, `secondary`, etc.).

Para uma lista completa de propriedades, consulte a [Documentação do Toggle Quasar](https://quasar.dev/vue-components/toggle#qtoggle-api).

## Emite

- `update:modelValue`: Disparado sempre que o valor do toggle (`modelValue`) é alterado.

## Template

```html
<base-toggle
  v-model="toggleModel"
  :label="props.label"
  :color="props.color"
  @update:modelValue="emitValueChange"
/>
```
