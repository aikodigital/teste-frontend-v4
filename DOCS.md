## Teste fronted v4 by Gustavo Siqueira

Este arquivo é designado a documentação do projeto e registro do desenvolvimento do mesmo.

### 🕵️ Overview
O design do produto definido a partir dos objetivos resultou em um projeto com 2 telas;
- Nesse projeto você ira encontrar a primeira pagina `Map` onde poderá ter uma visão geral dos `Equipamentos` da empresa, ao passar o mouse por cima ou clicar em algum dos ícones, você poderá ver um `Popup` com algumas informações gerais e um texto `ver mais` clicável que te levara para a segunda tela.
- Na segunda tela você tera um `resumo` do equipamento em especifico, também poderá ver:
    - Informações gerais do equipamento.
    - Histórico de movimentação do equipamento.
    - Histórico dos últimos estados que o equipamento esteve.
- Foram adicionado valores nos arquivos para apresentar mais casos de modelo e estados diferentes de equipamento, assim como mais casos de valores calculados para cada um deles.

### 🎯 Objetivos do projeto
✅ - Posições dos equipamentos;
✅ - Estado atual do equipamento: Visualizar o estado mais ;recente dos equipamentos. Exemplo: mostrando no mapa, como um pop-up, mouse hover sobre o equipamento, etc;
✅ - Histórico de estados do equipamento: Permitir a visualização do histórico de estados de um equipamento específico ao clicar sobre o equipamento;
✅ - Filtros: Filtrar as visualizações por estado atual ou modelo de equipamento;
✅ - Pesquisa: Ser possível pesquisar por dados de um equipamento especifico;
✅ - Percentual de Produtividade do equipamento: Calcular a produtividade do equipamento, que consiste em uma relação das horas produtivas (em estado "Operando") em relação ao total de horas. Exemplo se um equipamento teve 18 horas operando no dia a formula deve ser 18 / 24 * 100 = 75% de produtividade;
✅ - Ganho por equipamento: Calcular o ganho do equipamento com base no valor recebido por hora informado no Modelo de Equipamento. Exemplo se um modelo de equipamento gera 100 por hora em operando e -20 em manutenção, então se esse equipamento ficou 10 horas em operação e 4 em manutenção ele gerou 10 * 100 + 4 * -20 = 920;
✅ - Diferenciar os equipamentos: Diferenciar visualmente os equipamentos por modelo de equipamento na visualização do mapa;
✅ - Histórico de posições: Que seja possível visualizar o histórico de posições de um equipamento, mostrando o trajeto realizado por ele;
✅ - Documentação: Gerar uma documentação da aplicação. A documentação pode incluir detalhes sobre as decisões tomadas, especificação dos componentes desenvolvidos, instruções de uso dentre outras informações que achar relevantes;
❌ - Testes: Desenvolva testes que achar necessário para a aplicação, seja testes unitários, testes automatizados, testes de acessibilidade, etc;

### 📝 Regras de Negócio
Foi preciso definir uma regra para o calculo de horas trabalhadas em um dia, está foi que toda maquina operando para seu trabalho no fim do dia, caso ela comece outro dia com status de trabalhando, esse sera contabilizado

- OBS: Foram adicionado valores nos arquivos para apresentar mais casos de modelo e estados diferentes de equipamento, assim como mais casos de valores calculados para cada um deles.

### 👷 Arquitetura do front
o projeto frontend está localizado na  pasta ``teste-frontend-v4-frontend`` e sua arquitetura segue o seguinte padrão abaixo utilizando React + Vite + Tanstack + Leaflet `mais sobre as bibliotecas abaixo`
	
```
📦src
 ┣ 📂assets
 ┃ ┗ 📜icons.svg
 ┣ 📂components
 ┃ ┗ 📜components.tsx
 ┣ 📂constants
 ┃ ┗ 📜enum.ts
 ┣ 📂hooks
 ┃ ┗ 📜useHooks.tsx
 ┣ 📂infra
 ┃ ┗ 📂query
 ┃   ┗ 📜query.ts
 ┣ 📂interface
 ┃ ┗ 📜interface.interface.ts
 ┣ 📂pages
 ┃ ┗ page.tsx
 ┣ 📂services
 ┃ ┗ service.ts
 ┣ 📜index.css
 ┗ 📜main.tsx
```	

- Como framework a opção escolhida foi o React para a construção de um projeto de pagina única
- A escolha do uso do mapa foi Leaflet juntamente com uma biblioteca para a utilização dentro do React `react-leaflet`
- Para controle de estado foi criado neste projeto alguns hooks juntamente com a implementação do Tanstack (React Query) porém podemos dizer que no estado do projeto atual, ele não é usado em toda sua capacidade, porém o projeto foi estruturado para não ter dependências de implementação, ou seja, caso o código usado futuramente for usado para implementar os dados vindo de uma API e não diretamente dos arquivos locais, a lógica de controle de dados não precisaria ser alterada, apenas a implementação da API.


