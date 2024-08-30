# Teste Frontend AIKO

## O Desafio
Você é o desenvolvedor frontend de uma empresa que coleta dados de equipamentos utilizados em uma operação florestal. Dentre esses dados estão o histórico de posições e estados desses equipamentos. O estado de um equipamento é utilizado para saber o que o equipamento estava fazendo em um determinado momento, seja Operando, Parado ou em Manutenção. O estado é alterado de acordo com o uso do equipamento na operação, já a posição do equipamento é coletada através do GPS e é enviada e armazenada de tempo em tempo pela aplicação.

Seu objetivo é, de posse desses dados, desenvolver o frontend de aplicação web que trate e exibida essas informações para os gestores da operação.

## Tecnologias Utilizadas

Vite, React, TypeScript, MUI, React Leaflet, React Router Dom, Eslint

## Instalação

Instale as dependencias:
```
yarn
```

Rode o projeto:
```
yarn dev
```

## Funcionalidades

- Mapa: Mostra os equipamentos, com legenda para cada tipo. Pop-up ao selecionar um item no mapa, contendo status atual e opção para mostrar histórico e o caminho feito nos ultimos 10 estados.

- Filtros: Filtragem por estado atual e modelo.

## Arquitetura de pastas:

  - **`src/`**: Código-fonte da aplicação.
  - **`data/`**: Contém os dados entregues via Json.
  - **`pages/`**: Páginas principais da aplicação.
  - **`utils/`**: Contém funções de uso geral da aplicação.
  - **`hooks/`**: Contém um hook que com reducer permite acessar os dados tratados.

