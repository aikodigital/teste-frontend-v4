# Documentação da Aplicação

## Índice
1. [Visão Geral](#visão-geral)
2. [Decisões Arquiteturais](#decisões-arquiteturais)
3. [Especificação dos Componentes](#especificação-dos-componentes)
4. [Instruções de Uso](#instruções-de-uso)
5. [Configuração e Instalação](#configuração-e-instalação)

## Visão Geral

[![Acessar aplicação](https://github.com/user-attachments/assets/d03abecb-952e-45ed-b820-a50957c8d50e)](https://equipment-tracker.netlify.app/)


A aplicação desenvolvida é uma plataforma para um desafio frontend. Ela permite:
- Exibir no mapa os equipamentos nas suas posições mais recentes.
- Visualizar o estado mais recente dos equipamentos.
- Permitir a visualização do histórico de estados de um equipamento específico ao clicar sobre o equipamento.
- Exibir a trajetória de um equipamento selecionado

A arquitetura da aplicação é baseada em React, ChakraUI, Leaftlet-React, date-fns. O sistema é projetado para ser escalável e responsivo.

## Decisões Arquiteturais

1. **Escolha do Framework Frontend:**
   - **React:** Optei pelo React devido à sua popularidade, grande comunidade e capacidade de criar interfaces de usuário dinâmicas e reativas.
   - **Chakra UI:** Utilizei para criar uma interface de usuário moderna e consistente com componentes pré-estilizados e fácil customização.

4. **Arquitetura do Projeto:**
   - **Componentização:** Utilização de componentes React reutilizáveis para manter o código organizado e modular.

6. **Responsividade:**
   - **Design Responsivo:** Implementado usando Chakra UI e utilitários CSS para garantir uma boa experiência em dispositivos móveis e desktops.

## Especificação dos Componentes

### 1. **Componente `Map`**
   - **Responsabilidade:** Exibir um mapa com marcadores e trajetórias.
   - **Dependências:** `react-leaflet`, `leaflet`, `@chakra-ui/react`
   - **Funcionalidades:**
     - Mostrar marcadores para posições de equipamentos.
     - Trajetória de equipamentos com destaque para pontos de partida e chegada.
   - **Props:**
     - `filters`: Filtros aplicados na visualização.
     - `showTrajectory`: Flag para mostrar ou ocultar a trajetória.

### 2. **Componente `Filters`**
   - **Responsabilidade:** Fornecer filtros para pesquisa de equipamentos.
   - **Dependências:** `@chakra-ui/react`, `Combobox`
   - **Funcionalidades:**
     - Filtros por nome, estado e modelo.
     - Controle para mostrar ou ocultar trajetórias.
   - **Props:**
     - `onFilterChange`: Função chamada quando os filtros são alterados.

### 3. **Componente `Combobox`**
   - **Responsabilidade:** Exibir uma caixa de seleção com opções.
   - **Dependências:** `@chakra-ui/react`
   - **Funcionalidades:**
     - Permitir a seleção de opções a partir de uma lista.
   - **Props:**
     - `placeholder`: Texto a ser exibido quando vazio.
     - `options`: Lista de opções para seleção.
     - `value`: Valor selecionado.
     - `onChange`: Função chamada quando o valor é alterado.

## Configuração e Instalação

### Iniciando a Aplicação

1. **Clone o Repositório:**
   ```bash
   git clone <URL_DO_REPOSITÓRIO>
   cd <DIRETÓRIO_DO_PROJETO>

2. **Instale as dependências  :**
   ```bash
   npm install

3. **Execute a aplicação:**
   ```bash
   npm run dev
