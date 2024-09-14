# Componente Base Button

Este componente é um wrapper para o componente `<q-btn>` do Quasar, fornecendo alguns valores padrão para as propriedades e emitindo um evento `click`.

## Propriedades (Props)

O componente utiliza as `QBtnProps` do Quasar, com alguns valores padrão definidos.

### Propriedades Padrão

- `noCaps`: `true`  
  Impede que o texto do botão fique em maiúsculas por padrão.

- `unelevated`: `true`  
  Remove a elevação do botão (sombra), tornando-o plano.

- `color`: `'primary'`  
  Define a cor padrão como `'primary'`.

### Todas as Propriedades Disponíveis

O componente aceita todas as propriedades padrão de um `<q-btn>` do Quasar, como:

- `label`: Texto exibido no botão.
- `color`: Cor do botão (ex.: `primary`, `secondary`, etc.).
- `noCaps`: Impede que o texto fique em maiúsculas.
- `unelevated`: Remove a elevação do botão.
- `icon`: Ícone para o botão (opcional).
- `iconRight`: Ícone no lado direito do botão (opcional).

Para uma lista completa de propriedades, consulte a [Documentação do Botão Quasar](https://quasar.dev/vue-components/button#qbtn-api).

## Emite

- `click`: Disparado quando o botão é clicado.

## Template

```html
<base-btn
  :color="props.color"
  :label="props.label"
  :no-caps="props.noCaps"
  :unelevated="props.unelevated"
  :icon="props.icon"
  :icon-right="props.iconRight"
  @click="emit('click')"
/>
```
