# Componente Base Modal

Este componente é um modal personalizável utilizando o `<q-dialog>` e `<q-card>` do Quasar, com título, conteúdo de slot e botões de confirmação e cancelamento.

## Propriedades (Props)

O componente aceita as seguintes propriedades, definidas pela interface `Modal`:

- `model`: `boolean`  
  Define se o modal está aberto ou fechado. Esta propriedade controla a visibilidade do modal.

- `title`: `string`  
  Título exibido no topo do modal.

- `btnConfirmLabel`: `string`  
  Rótulo do botão de confirmação (não está sendo usado diretamente no exemplo, mas poderia ser passado como rótulo do botão de fechar).

- `btnCancelLabel`: `string`  
  Rótulo do botão de cancelamento (também não utilizado diretamente no exemplo, mas pode ser adicionado se necessário).

## Slots

O componente aceita o slot nomeado `content`, onde você pode inserir o conteúdo personalizado que será exibido dentro do modal.

### Slot Disponível

- `content`: O conteúdo a ser exibido na seção principal do modal.

## Emite

- `onCancel`: Disparado quando o usuário clica no botão de fechar, permitindo que o pai do componente trate o cancelamento.
