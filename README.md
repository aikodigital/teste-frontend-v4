# Teste frontend Aiko

Este projeto é um rastreador de equipamentos que exibe suas posições e estados em um mapa, utilizando React, React-Leaflet e Bootstrap. A aplicação permite a filtragem de equipamentos por estado e modelo, além de fornecer detalhes específicos sobre produtividade e ganhos dos equipamentos. 

## Funcionalidades

- **Visualização de Posições dos Equipamentos**: Exibe a posição mais recente dos equipamentos em um mapa.
- **Histórico de Estados**: Permite visualizar o histórico de estados dos equipamentos, mostrando quando estavam operando, parados ou em manutenção.
- **Histórico de Posições**: Exibe o histórico de posições (trajetos) dos equipamentos.
- **Filtros**: Filtre os equipamentos por estado ou modelo.
- **Pesquisa**: Pesquisa por nome ou ID de um equipamento.
- **Cálculo de Produtividade**: Calcula a produtividade de um equipamento com base no tempo em operação.
- **Cálculo de Ganhos**: Calcula os ganhos dos equipamentos com base nos estados e no modelo de equipamento.

## Tecnologias Utilizadas

- **React**: Framework de interface de usuário.
- **React-Leaflet**: Biblioteca para integrar mapas interativos.
- **Bootstrap**: Framework CSS para estilização.
- **React-Bootstrap**: Integração de componentes do Bootstrap com React.
- **TypeScript**: Usado para segurança de tipos no código.
- **Leaflet**: Para exibir os mapas.

## Pré-requisitos

Antes de iniciar, você precisa ter instalado em sua máquina o [Node.js](https://nodejs.org/en/).

## Como Buildar e Rodar o Projeto

1. Instale as dependências do projeto:
    ```bash
    npm install
    ```

2. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```

    O projeto estará disponível no endereço [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

A estrutura de pastas do projeto está organizada da seguinte forma:

```bash
.
├── public
├── src
│   ├── assets
│   │   └── img
│   │       └── aiko.png # Imagem utilizada no header
│   ├── components
│   │   ├── Header.tsx # Componente de cabeçalho
│   │   └── EquipmentMap.tsx # Mapa com as posições e informações dos equipamentos
│   ├── data
│   │   ├── equipment.json # Dados de equipamentos
│   │   ├── equipmentModel.json # Dados de modelos de equipamentos
│   │   ├── equipmentPositionHistory.json # Histórico de posições dos equipamentos
│   │   ├── equipmentState.json # Estados dos equipamentos
│   │   └── equipmentStateHistory.json # Histórico de estados dos equipamentos
│   ├── App.tsx # Arquivo principal da aplicação
│   └── index.tsx # Arquivo de entrada da aplicação
├── package.json # Informações do projeto e dependências
└── README.md # Documentação do projeto
