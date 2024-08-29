# Florestal Machines
![Imagem da aplicação](/images-for-readme/aiko-usage-print.jpg)

Este projeto é uma aplicação web desenvolvida para gerenciar e monitorar equipamentos florestais. Utilizando React, a aplicação oferece funcionalidades como visualização em mapa, filtragem de equipamentos e exibição de histórico de estados.

## Sumário

- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Componentes Desenvolvidos](#componentes-desenvolvidos)
- [Instruções de Uso](#instruções-de-uso)

## Descrição do Projeto

A aplicação "Florestal Machines" tem como objetivo fornecer uma interface intuitiva para visualizar e gerenciar equipamentos em uma área florestal. Através de um mapa interativo, os usuários podem visualizar a localização atual dos equipamentos, filtrar por estado e modelo, e acessar informações detalhadas sobre cada equipamento.

## Funcionalidades

- **Visualização em Mapa**: Mostra a localização atual dos equipamentos em um mapa interativo usando a biblioteca Leaflet.
- **Filtragem de Equipamentos**: Permite filtrar os equipamentos exibidos no mapa por estado e modelo.
- **Informações do Equipamento**: Exibe detalhes do equipamento, incluindo estado atual e histórico de estados, em um popup ao clicar no marcador do equipamento.
- **Diferenciação Visual**: Diferencia visualmente os equipamentos no mapa com base em seu modelo.

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, TailwindCSS, React-Leaflet, Leaflet
- **Ferramentas de Desenvolvimento**: Vite (para bundling)


### Estrutura de Diretórios

- `src/`: Contém o código fonte do frontend.
  - `components/`: Componentes React reutilizáveis.
  - `data/`: Dados estáticos utilizados na aplicação.
  - `types/`: Tipos TypeScript utilizados no projeto.
  - `utils/`: Funções utilitárias.
  - `App.tsx`: Componente principal da aplicação.
  - `index.tsx`: Ponto de entrada da aplicação.
- `public/`: Contém arquivos estáticos como imagens e ícones.

## Componentes Desenvolvidos

### `Map`

- **Descrição**: Exibe um mapa interativo com marcadores para os equipamentos. Permite filtrar os equipamentos por estado e modelo.
- **Props**: Nenhuma

### `EquipmentPopup`

- **Descrição**: Componente exibido em um popup ao clicar em um marcador no mapa. Mostra detalhes sobre o equipamento, incluindo seu estado atual e histórico de estados.
- **Props**:
  - `equipment`: Informações do equipamento.
  - `state`: Estado atual do equipamento.
  - `stateHistory`: Histórico de estados do equipamento.

### `createIcon`

- **Descrição**: Função utilitária para criar ícones personalizados para os equipamentos no mapa com base no modelo.

## Instruções de Uso

### Executar o Frontend

1. Instalar Dependências:
   `npm install`

2. Iniciar o Servidor de Desenvolvimento:
   `npm run dev`

3. Acessar a Aplicação:
   Abra o navegador e vá para `http://localhost:5173`.
