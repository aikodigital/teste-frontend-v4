# Teste Frontend V4

![Aiko](img/aiko.png)

## O Desafio

Você é o desenvolvedor frontend de uma empresa que coleta dados de equipamentos utilizados em uma operação florestal. Dentre esses dados estão o histórico de posições e estados desses equipamentos. O estado de um equipamento é utilizado para saber o que o equipamento estava fazendo em um determinado momento, seja _Operando_, _Parado_ ou em _Manutenção_. O estado é alterado de acordo com o uso do equipamento na operação, já a posição do equipamento é coletada através do GPS e é enviada e armazenada de tempo em tempo pela aplicação.

Seu objetivo é, de posse desses dados, desenvolver o frontend de aplicação web que trate e exibida essas informações para os gestores da operação.

## Features

- [x] **Posições dos equipamentos**: Exibir no mapa os equipamentos nas suas posições mais recentes.

- [x] **Estado atual do equipamento**: Visualizar o estado mais recente dos equipamentos. Através da cor do ícone e um card detalhado ao lado.

- [x] **Histórico de estados do equipamento**: Permitir a visualização do histórico de estados de um equipamento específico ao clicar sobre o equipamento.

- [x] **Filtros**: Filtrar as visualizações por estado atual ou modelo de equipamento.

- [x] **Pesquisa**: Ser possível pesquisar por dados de um equipamento especifico.

- [ ] **Percentual de Produtividade do equipamento**: Calcular a produtividade do equipamento, que consiste em uma relação das horas produtivas (em estado "Operando") em relação ao total de horas. Exemplo se um equipamento teve 18 horas operando no dia a formula deve ser `18 / 24 * 100 = 75% de produtividade`.

- [ ] **Ganho por equipamento**: Calcular o ganho do equipamento com base no valor recebido por hora informado no Modelo de Equipamento. Exemplo se um modelo de equipamento gera 100 por hora em operando e -20 em manutenção, então se esse equipamento ficou 10 horas em operação e 4 em manutenção ele gerou `10 * 100 + 4 * -20 = 920`.

- [x] **Diferenciar os equipamentos**: Diferenciar visualmente os equipamentos por modelo de equipamento na visualização do mapa.

- [x] **Histórico de posições**: Que seja possível visualizar o histórico de posições de um equipamento, mostrando o trajeto realizado por ele.

- [ ] **Testes**: Desenvolva testes que achar necessário para a aplicação, seja testes unitários, testes automatizados, testes de acessibilidade, etc.

- [ ] **Documentação**: Gerar uma documentação da aplicação. A documentação pode incluir detalhes sobre as decisões tomadas, especificação dos componentes desenvolvidos, instruções de uso dentre outras informações que achar relevantes.

## Tecnologias utilizadas

- Vue 3 com Composition API: Framework que estou trabalhando atualmente e tenho bastante facilidade de trabalhar.

- Typescript: Melhor qualidade de código, diminuindo o numero de bugs que eu poderia gerar.

- Vuetify: Biblioteca Vue que atende todas as minhas necessidades, assim eu poderia focar mais na usabilidade sem me preocupar tanto com a construção e estilização dos componentes.

- Leaflet: API com bastante suporte da comunidade, sendo leve e de rápida renderização.

- Pinia: Simples e intuitivo, além de facilitar a tipagem dos states e actions.

- SCSS: É uma das melhores formas de trabalhar com o Vuetify caso necessário alguma mudança nos componentes.
