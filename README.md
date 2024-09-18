# Equipamentos - Sistema de Filtragem e Mapas

Este projeto é uma aplicação React voltada para a exibição e filtragem de equipamentos, utilizando uma interface interativa com mapa, filtros de busca e dropdowns. A aplicação busca simplificar a visualização e manipulação de dados relacionados a equipamentos e suas localizações históricas.

## Funcionalidades

- **Filtro de busca**: Permite a busca de equipamentos pelo nome.
- **Dropdown de filtro**: Filtra os equipamentos por situações predefinidas.
- **Mapeamento de equipamentos**: Exibe a localização dos equipamentos em um mapa interativo.
- **Interseção de filtros**: Exibe equipamentos que atendem a múltiplos critérios (nome e situação).

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para a construção de interfaces de usuário.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática ao código.
- **React-Select**: Componente para a criação de dropdowns customizados.
- **Leaflet**: Biblioteca para mapas interativos.
- **SCSS**: Preprocessador CSS para criar estilos mais organizados e reutilizáveis.
- **Context API**: Gerenciamento de estado global dentro da aplicação React.

## Instalação

Siga os passos abaixo para rodar o projeto localmente.

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git

2. Acesse o diretório do projeto:
    cd seu-repositorio

3. Instale as dependências:
    npm install

4. Rode a aplicação:
    npm start

## Estrutura de pastas
├── src
│   ├── components
│   │   ├── Sidebar
│   │   │   ├── Sidebar.tsx
│   │   │   └── Sidebar.styles.scss
│   │   ├── Leaflet
│   │   │   ├── Leaflet.tsx
│   │   └── Modal
│   │       ├── Modal.tsx
│   ├── context
│   │   └── ContextApi.tsx
│   ├── data
│   │   ├── equipment.json
│   │   ├── equipmentModel.json
│   │   ├── equipmentPositionHistory.json
│   │   └── equipmentState.json
│   └── App.tsx
├── public
│   └── index.html
└── package.json


