# Componente de Menu Lateral

Este componente é um menu lateral com uma lista de links de navegação e um perfil de usuário exibido na parte inferior. Ele utiliza o Quasar Framework para criar uma interface de usuário interativa.

## Funções do Componente

### 1. **Links de Navegação**

- **Dados Usados**: `menuLinks`
- **Descrição**: Lista de links de navegação que permitem ao usuário navegar entre diferentes páginas da aplicação.
- **Estrutura**:

  - `icon`: Ícone associado ao link (ex.: `'dashboard'`, `'map'`).
  - `text`: Texto a ser exibido para o link.
  - `routeName`: Nome da rota para a qual o link direciona.

- **Componente Usado**: `<q-item>`
- **Propriedades**:
  - `@click`: Navega para a rota associada ao link quando o item é clicado.
  - `clickable`: Torna o item clicável.
  - `v-ripple`: Adiciona efeito de ripple ao clique.
  - `:active`: Define o estado ativo do item com base na comparação com a rota atual (`isSamePage`).

### 2. **Verificação da Página Ativa**

- **Função**: `isSamePage`
- **Descrição**: Verifica se a rota atual corresponde ao nome da rota fornecido.
- **Parâmetro**: `routeName` (nome da rota a ser verificado).
- **Retorno**: `boolean` (verdadeiro se a rota atual for a mesma, falso caso contrário).

### 3. **Perfil do Usuário**

- **Componente Usado**: `<q-item>` (exibido na parte inferior)
- **Descrição**: Mostra o perfil do usuário com um avatar, nome e status de login.
- **Estrutura**:

  - **Avatar**: Exibido usando o componente `<q-avatar>`.
  - **Nome**: Nome do usuário exibido com `<q-item-label>`.
  - **Status de Login**: Texto indicando o status de login do usuário.

## Template

```vue
<template>
  <TheMenu />
</template>

<script setup>
import TheMenu from '@/components/TheMenu.vue'
</script>
```
