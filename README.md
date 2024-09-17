
# Documentação do Projeto - Teste Frontend V4 - AIKO

## Índice
1. [Introdução](#introdução)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Instalação e Execução](#instalação-e-execução)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Funcionalidades Implementadas](#funcionalidades-implementadas)
6. [Decisões de Design e Implementação](#decisões-de-design-e-implementação)
7. [Melhorias Futuras](#melhorias-futuras)

---

### 1. Introdução
Este projeto foi desenvolvido como parte de um teste de admissão para a posição de desenvolvedor front-end. O desafio é construir uma aplicação web que exibe o estado e a localização de equipamentos utilizados em uma operação florestal. A aplicação mostra a posição mais recente de cada equipamento em um mapa, permite a visualização do estado atual de cada equipamento, oferece a funcionalidade de acessar o histórico de estados de um equipamento específico, assim como a opção de filtrar os diferentes equipamentos.

### 2. Tecnologias Utilizadas
O projeto foi desenvolvido usando as seguintes tecnologias:

- **React**: Para construir a interface do usuário e gerenciar componentes.
- **Redux**: Para o gerenciamento global do estado da aplicação.
- **Mapbox**: Para exibir o mapa e as posições dos equipamentos.
- **Styled Components**: Para a estilização dos componentes.

### 3. Instalação e Execução

Para executar a aplicação localmente, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/jpbepu/teste-frontend-v4
   cd teste-frontend-v4
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o projeto:
   ```bash
   npm run start
   ```

### 4. Estrutura do Projeto

O projeto segue a seguinte estrutura:

```bash
src/
│
├── components/       # Componentes reutilizáveis
├── data/             # Arquivos JSON fornecidos para o teste
├── store/            # store e reducers do Redux
├── styles/           # Estilos globais do Styled Components
├── App.js            # Componente principal que orquestra a aplicação
└── index.js          # Ponto de entrada da aplicação
```

### 5. Funcionalidades Implementadas

As principais funcionalidades implementadas são:

- **Visualização no Mapa**: Exibe todos os equipamentos em sua posição mais recente usando um marcador no mapa junto com um pop-up detalhando o nome, modelo e último status de cada equipamento.
- **Histórico de Estados**: Ao clicar em um equipamento, é aberto um div no item da lista com o histórico completo de estados desse equipamento, assim como as datas correspondentes aos estados.
- **Filtros**: A aplicação inclui filtros opcionais para visualizar equipamentos por estado, modelo ou nome.

### 6. Decisões de Design e Implementação

Para distribuir os dados pela aplicação de forma eficiente, optei por agregar todas as informações relevantes de cada equipamento em um único objeto. Esse objeto (armazenado no estado `equipments` do redux) contém o histórico de posições, histórico de estados, última posição, último estado (para visualização no mapa), nome, modelo e id. Esse conjunto de dados é gerado dinamicamente a partir dos arquivos JSON fornecidos pela empresa, permitindo a modificação e expansão dos itens desses arquivos, desde que a estrutura original dos arquivos seja mantida.

- **Mapbox**: Apesar de não ser a ferramenta mais simples para se trabalhar com mapas, escolhi o Mapbox para a exibição de mapas pela facilidade de integração com React e pela possibilidade de adicionar customizações como filtros e pop-ups dinâmicos.
- **Redux**: O Redux foi utilizado para o gerenciamento do estado global, facilitando a manipulação dos dados dos equipamentos e seus estados, garantindo que qualquer componente da aplicação possa acessar essas informações.
- **Styled Components**: A biblioteca Styled Components foi usada para uma estilização mais organizada e reutilizável, além de permitir uma melhor manutenção de código CSS.

### 7. Melhorias Futuras

- **Histórico de Posições no Mapa**: Uma melhoria futura seria permitir a visualização do histórico de posições de um equipamento, mostrando as últimas localizações do trajeto realizado.
- **Percentual de Produtividade do equipamento**: Implementar no estado o percentual de produtividade de cada equipamento.
- **Ganho por equipamento**: A partir da sugestão de implementação anterior, implementar no estado o ganho de cada equipamento.
- **Testes**: Complementar a aplicação com uma suite de testes para garantir a manutenção do projeto em implementações futuras, ou para fins de debug.
- **Responsividade**: O projeto foi desenvolvido somente para desktops. No futuro, implementar a responsividade para telas menores seria uma boa adição. 
- **Otimização de Performance**: Melhorar o desempenho da aplicação ao lidar com grandes volumes de dados, otimizando a renderização dos componentes e a manipulação dos dados.
---


