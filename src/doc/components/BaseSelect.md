# Componente Base Select

Este componente é um wrapper para o componente `<q-select>` do Quasar, fornecendo alguns valores padrão para as propriedades e emitindo um evento `update:modelValue` quando o valor selecionado muda.

## Propriedades (Props)

O componente utiliza as `QSelectProps` do Quasar, com alguns valores padrão definidos.

### Propriedades Padrão

- `dense`: `true`  
  Torna o campo de seleção mais compacto.

- `outlined`: `true`  
  Aplica o estilo de borda ao campo de seleção.

- `color`: `'primary'`  
  Define a cor padrão do campo de seleção como `'primary'`.

### Todas as Propriedades Disponíveis

O componente aceita todas as propriedades padrão de um `<q-select>` do Quasar, como:

- `modelValue`: Valor selecionado no campo de seleção.
- `options`: Lista de opções a serem exibidas no seletor.
- `label`: Rótulo exibido acima do campo de seleção.
- `outlined`: Define o estilo de borda ao redor do campo.
- `dense`: Reduz a altura do campo de seleção.
- `color`: Cor do campo de seleção (ex.: `primary`, `secondary`, etc.).

Para uma lista completa de propriedades, consulte a [Documentação do Select Quasar](https://quasar.dev/vue-components/select#qselect-api).

## Emite

- `update:modelValue`: Disparado sempre que o valor selecionado (`modelValue`) é alterado.

## Template

```html
<base-select
  v-model="selectValue"
  :options="props.options"
  :label="props.label"
  @update:modelValue="emitValueChange"
/>
```
