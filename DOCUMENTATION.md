<h1 align="center">Frontend para Gestão de Equipamentos</h1>

Bem-vindo ao projeto de frontend para a empresa Aiko. Esta aplicação web foi desenvolvida para visualizar e gerenciar dados de equipamentos, fornecendo informações detalhadas sobre suas localizações, estados e históricos.

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Extras Implementados](#extras-implementados)
- [Instalação e Execução](#instalação-e-execução)
- [Estrutura do Projeto](#estrutura-do-projeto)

## Descrição do Projeto

Este projeto visa fornecer uma aplicação web interativa para a gestão de equipamentos. A aplicação permite a visualização da localização atual dos equipamentos, seus estados mais recentes e o histórico de posições e estados. Também realiza cálculos avançados de produtividade e ganhos dos equipamentos.

## Tecnologias Utilizadas

- **Next.js**: Framework para React, utilizado para renderização no lado do servidor e geração de páginas estáticas.
- **TypeScript**: Adiciona tipagem ao JavaScript, melhorando a manutenção e a qualidade do código.
- **Styled-Components**: Biblioteca para estilização de componentes utilizando CSS-in-JS.
- **Vitest**: Framework de testes para garantir a qualidade e a funcionalidade do código.
- **Leaflet**: Biblioteca para exibição de mapas interativos.
- **PhosphorIcons**: Biblioteca de ícones para representar visualmente os estados dos equipamentos.
- **Eslint**: Ferramenta de linting para analisar código fonte e encontrar erros.
- **Prettier**: Ferramenta de formatação automática de código.

## Funcionalidades

- **Tela Principal**
  - Exibe um mapa interativo com a localização atual de todos os equipamentos.
  - Mostra uma tabela com todos os equipamentos e seus estados atuais.
  - Permite a busca por equipamentos na tabela, funcionando também como uma forma de filtragem.
  - Permite navegação para uma página de detalhes ao clicar em um equipamento na tabela.

- **Tela de Detalhes do Equipamento**
  - Exibe um mapa com a localização atual e o histórico de posições do equipamento selecionado.
  - Apresenta uma tabela com o histórico de estados do equipamento, mostrando a data e o estado em que o equipamento estava em cada data específica.
  - Calcula e mostra a produtividade do equipamento com base no tempo em operação.
  - Calcula e exibe o ganho total do equipamento com base no valor por hora para cada estado.

## Extras Implementados

- **Busca com Filtragem**: A busca na tabela de equipamentos serve como uma forma de filtragem, permitindo encontrar rapidamente um equipamento específico.
- **Percentual de Produtividade**: Calculado com base no tempo em que o equipamento esteve operando.
- **Ganho por Equipamento**: Calculado com base no tempo e no valor por hora em cada estado.
- **Diferenciação dos Equipamentos**: Utilização de ícones distintos no mapa para representar diferentes modelos de equipamentos.
- **Histórico de Posições**: Exibição do trajeto completo do equipamento no mapa.
- **Testes**: Implementados com Vitest para garantir a funcionalidade e a qualidade do código.
- **Documentação**: Documentação detalhada incluída para fornecer uma visão geral do projeto e instruções de uso.

## Instalação e Execução

```bash
# Baixar dependencias
  pnpm install
# Rodar testes
  pnpm test
# Rodar servidor de desenvolvimento
  pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o projeto rodando!.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **`app/`**: Contém a estrutura principal da aplicação.

- **`api/`**: Contém as rotas da API simulada utilizando Next.js.

- **`presentation/`**: Camada de Apresentação que inclui todos os componentes e partes visuais da aplicação com os quais o usuário interage.

- **`external/`**: Contém bibliotecas externas e estilos que são utilizados na apresentação, incluindo o CSS estilizado com styled-components.

- **`modules/`**: Agrupa páginas e funcionalidades, utilizando arquivos da camada `shared` e módulos específicos.

- **`shared/`**: Contém componentes reutilizáveis em toda a aplicação.

- **`test/`**: Contém testes unitários para garantir a qualidade do código.

- **`data/`**: Contém os arquivos JSON com os dados necessários.
