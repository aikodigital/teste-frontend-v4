# Documentação do projeto

Este documento tem como finalidade explicar o setup do projeto e as decisões de implementação dos requisitos e das bibliotecas e tecnologias utilizadas.

## Setup

Para rodar o projeto abra dois terminais, em um deles rode o comando `npm run dev` que inicia o projeto, e no outro o comando `npm run api` que inicia o mock da api pelo Json Server.

## Bibliotecas e tecnologias utilizadas

### Vuejs e Typescript

Trabalho com Vue desde 2021 e dentre os frameworks de frontend era o que me sentia mais confortável, porém sempre utilizei apenas JS, a utilização de Typescript veio como uma camada de desafio extra.

### Pinia

Quando o Vue 3 lançou, o Pinia foi anunciado como sucesso do Vuex e desde então tenho utilizado Pinia em novos projetos.

### OpenLayers

Já havia utilizado OpenLayers no passado e novamente a familiaridade foi o fator decisivo, além de ser uma biblioteca que separa facilmente a camada gráfica do restante do mapa.

### Primevue + Primeflex

Primevue é uma biblioteca de componentes que trabalho com ela desde o ano passado e o Primeflex é a parte de tokens similar ao Tailwind.

### Json Server

Json Server é uma biblioteca que faz mock de api utilizando os indices de um arquivo json.

Os dados necessários para implementação do teste estão na pasta `data/`, porém decidi unifica-los em um único arquivo e realizar uma chamada de API para buscar as informações e montar a estrutura dos Equipamentos.

### Axios

O Axios facilita as chamadas a api com a criação de instancias onde é possivel definir valores de configuração para as chamadas, no caso deste teste, utilizei para configurar a `baseURL` para não precisar repeti-la e fazer as requisições a partir do caminho relativo.

Para fingir o tempo de uma request, implementei um método `sleep(ms:number)`.

### Dinero

Uma biblioteca simples para formatação de moedas, especificamente para formatar o valor dos ganhos do equipamento.

### ESLint e Prettier

Utilizei essa dupla para a formatação de código com configurações mínimas.

## Requisitos

### Posições dos equipamentos

**Requisito:** Exibir no mapa os equipamentos nas suas posições mais recentes.

Criei uma Feature do tipo **Point** com as coordenadas do primeiro estado da lista de estados de um equipamento que previamente havia sido ordenado em ordem de `date DESC e um **Style** que cria a representação de cada _pin_ no mapa.

### Estado atual do equipamento

**Requisito:** Visualizar o estado mais recente dos equipamentos. Exemplo: mostrando no mapa, como um pop-up, mouse hover sobre o equipamento, etc.

Busco na lista de estados o primeiro índice, que previamente havia sido ordenado em ordem de `date DESC` e exibo o texto com a cor do estado no hover do pin além do nome e de um helper indicando clicar para ver mais detalhes.

### Histórico de estados do equipamento

**Requisito:** Permitir a visualização do histórico de estados de um equipamento específico ao clicar sobre o equipamento.

Ao clicar em um equipamento, uma modal abre com todas as informações do mesmo separadas em _tabs_, uma das tabs exibe o histórico de estados com um componente **Timeline** em ordem de `date DESC` com os pontos da timeline exibindo a data, cor do estado e nome do estado.

### Filtros

**Requisito:** Filtrar as visualizações por estado atual ou modelo de equipamento.

No lado esquerdo da tela temos um painel para fazer a filtragem por modelo de equipamento, um simples toggle que oculta a exibição dos equipamentos pertencentes na camada gráfica do mapa.

Sempre é exibido uma "lista filtrada" de equipamentos e utilizo um método que recebe a lista de todos os equipamentos e a filtragem para retornar quais equipamentos devem ser exibidos.

### Percentual de Produtividade do equipamento e Ganho por equipamento

**Requisito:** Calcular a produtividade do equipamento, que consiste em uma relação das horas produtivas (em estado "Operando") em relação ao total de horas. Exemplo se um equipamento teve 18 horas operando no dia a formula deve ser `18 / 24 * 100 = 75% de produtividade`.

**Requisito:** Calcular o ganho do equipamento com base no valor recebido por hora informado no Modelo de Equipamento. Exemplo se um modelo de equipamento gera 100 por hora em operando e -20 em manutenção, então se esse equipamento ficou 10 horas em operação e 4 em manutenção ele gerou `10 * 100 + 4 * -20 = 920`.

Ambas informações são calculadas juntas e agrupadas em _detalhes do equipamento_, são exibidas na tab Detalhes ao clicar em um equipamento, o percentual de produtividade é exibido em um componente **ProgressBar**.

### Diferenciar os equipamentos

**Requisito:** Diferenciar visualmente os equipamentos por modelo de equipamento na visualização do mapa.

Cada modelo de equipamento possui uma imagem de um pin cor cor específica deste modelo, assim, todos os harvesters terão o mesmo ícone.

Criei três imagens que são passadas para o **Style** de um elemento **Point** na camada gráfica do OpenLayers.

### Histórico de posições

**Requisito:** Que seja possível visualizar o histórico de posições de um equipamento, mostrando o trajeto realizado por ele.

O histórico de posições é exibido ao clicar em um equipamento no mapa e ir para a tab de "Histórico de Posiões", similar ao histórico de estados, é representado por um componente **Timeline** em ordem de `date DESC`.

### Testes

**Requisito:** Desenvolva testes que achar necessário para a aplicação, seja testes unitários, testes automatizados, testes de acessibilidade, etc.

Utilizando o Cypress, realizo testes para a montagem e exibição dos dados do equipamento dos componentes exibidos na modal.
