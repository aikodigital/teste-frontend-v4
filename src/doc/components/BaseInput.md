# Componente Base Input

Este componente é um wrapper para o componente `<q-input>` do Quasar, fornecendo alguns valores padrão para as propriedades e emitindo um evento `update:modelValue` quando o valor do campo é alterado.

## Propriedades (Props)

O componente utiliza as `QInputProps` do Quasar, com alguns valores padrão definidos, além de aceitar um `placeholder` opcional.

### Propriedades Padrão

- `dense`: `true`  
  Diminui a altura do campo de entrada, tornando-o mais compacto.

- `outlined`: `true`  
  Usa o estilo com borda ao redor do campo de entrada.

- `color`: `'primary'`  
  Define a cor padrão como `'primary'`.

### Todas as Propriedades Disponíveis

O componente aceita todas as propriedades padrão de um `<q-input>` do Quasar, como:

- `modelValue`: Valor do campo de entrada.
- `debounce`: Tempo de atraso em milissegundos antes de atualizar o valor.
- `placeholder`: Texto que aparece como dica no campo de entrada.
- `label`: Rótulo do campo de entrada.
- `outlined`: Define o estilo de borda ao redor do campo.
- `dense`: Reduz a altura do campo de entrada.
- `color`: Cor do campo de entrada (ex.: `primary`, `secondary`, etc.).

Para uma lista completa de propriedades, consulte a [Documentação do Input Quasar](https://quasar.dev/vue-components/input#qinput-api).

## Emite

- `update:modelValue`: Disparado sempre que o valor do campo de entrada (`inputValue`) é atualizado.

## Template

```html
<base-input
  v-model="inputValue"
  :debounce="props.debounce"
  :placeholder="props.placeholder"
  :label="props.label"
  :outlined="props.outlined"
  :dense="props.dense"
  :color="props.color"
>
  <template v-slot:append>
    <slot name="append" />
  </template>
</base-input>
```
