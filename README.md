# teste-frontend-aiko

OBS: PARA RODAR O MAPA, é necessario possuir uma API KEY do Google Maps:
Crie um arquivo .env na raiz da aplicacao e crie uma key-value igual a disponibilizada no arquivo .env.example localizado na raiz do app

Para rodar o projeto certifique-se de que tenha instalado na sua maquina o NodeJS
Este projeto conta com os requisitos obrigatorios do teste alem de extras:

## Tela Dashboard

- Dashboard principal
- Dois cards informando separadamente o equipamento com maior produtividade e maior ganho
- Uma tabela com informações individuais de cada equipamento (nome, modelo, ganho do equipamento, produtividade do equipamento)
- Possibilidade de ordenação das colunas da tabela
- Possibilidade de busca por qualquer termo na tabela (input de busca)
- Possibilidade de exportar os dados para CSV (para análise de dados posterior): os dados exportados são (nome, modelo, ganho, produtividade)
- Possibilidade de ordenar os registros por páginas na tabela
- Utilização do filtro global por Modelo do Equipamento (não afeta os dois cards citados acima)

## Tela de mapa

- Clusters no mapa para melhor visualização (agrupamento dos marcadores)
- Filtragem global com a possibilidade pelo Modelo do Equipamento e Nome
- Possibilidade de visualização dos marcadores em clusters ou individualmente (toggle)
- Última atualização do equipamento marcado no mapa (posições dos equipamentos)
- Estado atual do equipamento clicado (estado atual do equipamento)
- Visualização do nome, data do último estado e estado atual do equipamento clicado
- Visualização em timeline do histórico de estados do equipamento clicado (histórico de estados do equipamento)
- Ao visualizar um equipamento, existe a possibilidade de filtrar o histórico de estados por estado individual
- Diferenciação dos ícones pelo modelo do equipamento
- Animação de zoom in e zoom out

## Aplicacao geral

- Menu lateral com navegação
- Animação de hover no menu lateral
- Layout base para toda a aplicação
- Responsiva
- Componentizada
- Testes unitários para os componentes base (src/components/_tests_)
- Documentação dos componentes base (src/doc/components)
- Documentação das views (Existem fluxogramas com mermaid) (src/doc/views)
- Eslint e Prettier

## Para fazer o setup

```sh
npm install
```

### Apos finalizacao do ultimo passo, execute:

```sh
npm run dev
```

### Minificar para produção

```sh
npm run build
```

### Executar testes unitários [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Executar verificação do Typescript [Vitest](https://vitest.dev/)

```sh
npm run type-check
```

### Executar Lint [ESLint](https://eslint.org/)

```sh
npm run lint
```
