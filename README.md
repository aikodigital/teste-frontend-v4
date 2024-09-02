# Aplicação de Gestão de Equipamentos Florestais

Este projeto é uma aplicação web desenvolvida para gerenciar e visualizar dados de equipamentos utilizados em operações florestais. A aplicação exibe informações sobre a posição e estado dos equipamentos, e permite a análise histórica desses dados para melhorar a gestão e a operação.

## Índice

1. Descrição do Projeto
2. Funcionalidades
3. Tecnologias Utilizadas
4. Estrutura do Projeto
5. Decisões de Design
6. Instruções de Uso
7. Testes

## Descrição do Projeto

Esta aplicação foi desenvolvida para visualizar e gerenciar informações sobre equipamentos florestais. A aplicação permite:

- Exibir a posição atual dos equipamentos em um mapa.
- Visualizar o estado atual e o histórico de estados dos equipamentos.
- Consultar o histórico de posições dos equipamentos.

Os dados são fornecidos em formato JSON e incluem informações sobre equipamentos, estados, modelos, e históricos de posições e estados

## Funcionalidades

- Posições dos Equipamentos: Mapa interativo mostrando as posições mais recentes dos equipamentos.
- Estado Atual do Equipamento: Exibição do estado atual de cada equipamento, com a possibilidade de visualização em pop-ups ou através de mouse hover.
- Histórico de Estados do Equipamento: Acesso ao histórico de estados de um equipamento específico ao clicar sobre ele.
- Histórico de Posições: Exibição do trajeto das últimas **5 posições de equipamento**.

## Tecnologias Utilizadas

- React: Biblioteca para construção da interface de usuário.
- Leaflet: Biblioteca para mapas interativos.
- Context API: Gerenciamento de estado.
- Tailwind CSS: Para construção de layouts.
- TypeScript: Tipagem estática.
- Vitest & testing-library: Frameworks de testes.

## Estrutura do Projeto

- /src: Código fonte da aplicação.
- /components: Componentes React para a interface.
- /contexts: Contextos para gerenciamento de estado global.
- /data: Conjunto de dados da aplicação.
- /pages: Páginas da aplicação.
- /tests: Testes da aplicação.
- /types: Tipagens da aplicação.
- /utils: Funções utilitárias.
- package.json: Gerenciamento de dependências e scripts de execução.

## Instruções de Uso

1. Instalação:

- Clone o repositório:

```
git clone https://github.com/ViniciusmDias/teste-frontend-v4
```

- Navegue até o diretório do projeto:

```
cd teste-frontend-v4
```

- Instale as dependências:

```
yarn install
```

2. Execução:

- Inicie o servidor de desenvolvimento:

```
yarn start
```

- Acesse a aplicação em http://localhost:3000.

## Testes

- Testes Unitários:

```
yarn test
```
