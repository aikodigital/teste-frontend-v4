# Teste Frontend V4

## Visão Geral

A aplicação web tem como finalidade tratar e exibir informações sobre equipamentos utilizados em uma operação florestal. Esses equipamentos possuem um histórico de posições e estados, onde o estado indica a atividade realizada pelo equipamento em determinado momento, como **Operando, Parado ou em Manutenção**. Os estados são alterados conforme o uso do equipamento na operação, enquanto as posições são coletadas via **GPS** e armazenadas periodicamente pela aplicação. O frontend foi desenvolvido para que os gestores da operação possam visualizar e analisar esses dados de forma eficiente e intuitiva.

Este projeto utiliza **Vue 3** com **Nuxt 3**, desenvolvido com **TypeScript** e estilizado com **Vuetify v3**. O objetivo desta escolha é fornecer uma aplicação moderna e com grande desempenho.

Para a API do mapa foi utilizado o Leaflet como módulo do Nuxt ([Documentação do Módulo do Leaflet](https://leaflet.nuxtjs.org/)).

Além disso foi utilizado o Pinia para gerenciamento de estado.

Foi implementado o linter para formatação e padronização do código.

## Considerações do projeto
Como funcionalide foi implementado:

-> **Mapa interativo** para visualização das últimas posições dos equipamentos.

-> **Ícones e cores** para identificação qual é o equipamento e seu estado atual.

-> **Mouse hover** para visualizar informações básicas do equipamento: **Nome, Modelo, Data, Status**.

-> Dialog de detalhes do equipamento **escolhido no mapa**. Neste modal é mostrado mais informações como: **Nome, Status atual, Ganhos totais, Horas por estado e histórico de estados do equipamento.**

-> O **histórico de estados do equipamento** é feito uma ordenação da data mais recente à data mais antiga.

-> No Dialog de detalhes foi feito o **Infinite Scroller** para melhor visualização do histórico de detalhes, sendo mostrado 10 inicialmente e sempre que carregado mais itens é mostrado mais 10.

-> **Legenda** abaixo do mapa para entender qual equipamento se refere o ícone mostrado no mapa.

-> **Filtro** por estado do equipamento funcional: Todos, Operando, Parado ou Manutenção.

-> **Centralização** da visão do mapa para a localização dos equipamentos.

-> **Notificações** a partir do framework Vuetify e controladas pelo gerenciador de estado Pinia.

-> Arquitetura baseada na **Clean Architecture** para separar as camadas bem definidas e garantir fácil manutenção e escalabilidade.

## Estrutura do Projeto
```
├── components/      # Componentes Vue reutilizáveis
├── composables/     # Funções reutilizáveis (composables API)
├── layouts/         # Layouts globais da aplicação
├── pages/           # Páginas da aplicação
├── plugins/         # Plugins Vue/Nuxt (ex: Axios, Vuetify)
├── public/          # Servir os ativos estáticos
├── store/           # Gerenciamento de estado (Pinia)
├── server/          # Registrar manipuladores de API e um servidor
├── utils/           # Funções auxiliares
├── nuxt.config.ts   # Configurações do Nuxt
├── eslint.config.js # Configurações do Lint
├── package.json     # Dependências e scripts
└── tsconfig.json    # Configuração do TypeScript
```

## Configuração e Instalação
1. Instale as dependências:
  ```sh
   npm install
   # ou
   yarn install
  ```
2. Inicie o servidor de desenvolvimento:
  ```sh
   npm run dev
   # ou
   yarn dev
  ```

## Build e Deploy
Para gerar a versão de produção:
```sh
npm run build
```
Para rodar o projeto em modo de produção:
```sh
npm run start
```

## Visualização do build
Inicie o servidor:
```sh
npm run preview
```

## Detalhes do Nuxt

Para mais detalhes: [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction)