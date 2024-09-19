# Teste Frontend v4 - Aiko Digital

Web software para monitoramento de dados coletados por equipamentos durante operações florestais.

Partindo do princípio de manter a estrutura de dados original dos arquivos `.json` no diretório `./data` sem transformar num único grande objeto com as chaves estrangeiras resolvidas, minhas principais opções para tratamento e manipulação desses dados foram:
- utilizar os _mockups_ como _seeds_ em uma base de dados com um ORM como o Prisma;
- emular um modelo entidade-relacionamento com programação funcional através de uma biblioteca de gerenciamento de estado.

Dada a natureza focada em front-end do teste, optei por seguir pela segunda opção usando tecnologias do ecossistema Vue.js que me pareceu estar mais destacado nas instruções.

## Tecnologias utilizadas

- Vite
- Vue.js
- Typescript
- Pinia
- Vuetify
- OpenLayers
- Vitest
- Cypress
- ESLint
- Prettier

## Requisitos

- [x] Tratamento de dados _mockados_ nos arquivos .json
- [x] Exibir as últimas posições registradas
- [x] Exibir os últimos estados registrados
- [x] Exibir o histórico de estados de cada equipamento
- [ ] Exibir rota traçada a partir das posições de cada equipamento
- [ ] Filtrar exibição dos equipamentos por estado atual e/ou modelo
- [ ] Pesquisar equipamento por nome
- [ ] Exibir percentual de produtividade de cada equipamento
- [ ] Diferenciar visualmente os equipamentos exibidos no mapa
- [ ] Criar testes unitários
- [ ] Criar testes end-to-end
- [ ] Criar imagem docker para deploy

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests on dev environment with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

### Run End-to-End Tests for production build with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
