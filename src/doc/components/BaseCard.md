# Componente Base Card

Este componente é um wrapper para o componente `<q-card>` do Quasar. Ele exibe um cartão com título, imagem, descrição e subdescrição, com um design personalizado.

## Propriedades (Props)

O componente aceita as seguintes propriedades, definidas pela interface `Card`:

### Propriedades

- `title`: `string | number`  
  O título do cartão, exibido como texto principal. Essa propriedade é obrigatória.

- `imgUrl`: `string` _(opcional)_  
  URL da imagem que será exibida no cartão. Se não for fornecida, a imagem não será exibida.

- `description`: `string | number` _(opcional)_  
  A descrição principal do cartão.

- `subDescription`: `string | number` _(opcional)_  
  A subdescrição do cartão, exibida abaixo da descrição principal.
