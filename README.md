# Central de Equipamentos e Gestão (CEG)

Este projeto é uma aplicação web desenvolvida para gerenciar e visualizar dados de equipamentos utilizados em operações florestais. A aplicação exibe informações sobre a posição e estado dos equipamentos e permite a análise histórica desses dados para melhorar a gestão e a operação.

## Índice

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Decisões de Design](#decisões-de-design)
6. [Instruções de Uso](#instruções-de-uso)
7. [Testes](#testes)

## Descrição do Projeto

A Central de Equipamentos e Gestão (CEG) é uma aplicação web desenvolvida para gerenciar e visualizar dados de equipamentos utilizados em operações florestais. O sistema exibe a posição e o estado atual dos equipamentos, além de fornecer acesso ao histórico de posições e estados para melhorar a gestão e operação dos equipamentos.

A aplicação permite:

- Exibir a posição atual dos equipamentos em um mapa interativo.
- Visualizar o estado atual dos equipamentos com detalhes.
- Consultar o histórico de estados e posições dos equipamentos.

Os dados são fornecidos em formato JSON e incluem informações sobre equipamentos, estados, modelos, e históricos de posições e estados.

## Funcionalidades

- **Posições dos Equipamentos**: Mapa interativo exibindo as posições mais recentes dos equipamentos.
- **Estado Atual do Equipamento**: Visualização do estado mais recente dos equipamentos com opções de exibição em pop-ups ou por hover.
- **Histórico de Estados do Equipamento**: Acesso ao histórico de estados de um equipamento específico ao clicar sobre ele.
- **Histórico de Posições**: Exibição do trajeto das posições de um equipamento. 
- **Filtros**: Filtragem por estado atual ou modelo do equipamento.
- **Pesquisa**: Busca de dados específicos de equipamentos.
- **Ganho por Equipamento**: Cálculo do ganho do equipamento com base no valor por hora informado no modelo.
- **Diferenciação Visual**: Diferenciação dos equipamentos por modelo no mapa.

## Tecnologias Utilizadas

- **React**: Biblioteca para construir interfaces de usuário dinâmicas e componentizadas.
- **Leaflet**: Biblioteca para criar mapas interativos.
- **Context API**: Gerenciamento de estado global no React.
- **Tailwind CSS**: Framework de utilitários CSS para criar layouts responsivos.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Vitest**: Framework de testes rápido para JavaScript e TypeScript.

## Estrutura do Projeto

- **/src**: Código fonte da aplicação.
  - **/components**: Componentes React para a interface.
  - **/contexts**: Contextos para gerenciamento de estado global.
  - **/data**: Conjunto de dados da aplicação.
  - **/pages**: Páginas da aplicação.
  - **/tests**: Testes da aplicação.
  - **/types**: Tipagens da aplicação.
  - **/utils**: Funções utilitárias.
- **package.json**: Gerenciamento de dependências e scripts de execução.

## Decisões de Design

A aplicação foi projetada para fornecer uma interface clara e intuitiva para os gestores florestais. Utilizamos o React para a construção da UI e o Leaflet para a visualização das posições no mapa. A Context API foi escolhida para o gerenciamento de estado global, garantindo que as informações sobre os equipamentos possam ser acessadas em diferentes partes da aplicação.

## Instruções de Uso

1. **Instalação**:

   - Clone o repositório:

     ```bash
     git clone https://github.com/virginiamaia/teste-frontend-v4
     ```

   - Navegue até o diretório do projeto:

     ```bash
     cd teste-frontend-v4
     ```

   - Instale as dependências:

     ```bash
     yarn install
     ```

2. **Execução**:

   - Inicie o servidor de desenvolvimento:

     ```bash
     yarn start
     ```

   - Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Testes

- **Testes Unitários**:

  ```bash
  yarn test
  ```

  Os testes unitários verificam a funcionalidade de componentes e funções individuais para garantir que o sistema esteja funcionando conforme esperado.


