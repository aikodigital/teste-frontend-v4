# Gestor de Trafego

Gestor de Trafego é uma aplicação web desenvolvida para visualizar e gerenciar dados de equipamentos em uma operação florestal. A aplicação exibe posições e estados dos equipamentos em um mapa, permite visualizar o histórico de estados e fornece insights sobre a produtividade e ganho dos equipamentos.

## Tecnologias Utilizadas

- **React** - Biblioteca para construção da interface de usuário.
- **Leaflet** - Biblioteca de mapas para exibição de posições dos equipamentos.
- **SASS** - Pré-processador CSS para estilização.
- **Vite** - Ferramenta de construção e desenvolvimento rápido.
- **Jest** - Framework para testes.
- **ESLint** - Ferramenta de linting para garantir a qualidade do código.

## Instalação

Para rodar o projeto localmente, siga os passos abaixo:

1. Navegue para o diretório do projeto:
    ```bash
    cd traffic-management
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

## Scripts

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Cria uma versão otimizada para produção.
- `npm run test`: Executa os testes automatizados.

## Estrutura do Projeto

- **`src/`**: Contém o código fonte da aplicação.
  - **`components/`**: Componentes React utilizados na aplicação.
  - **`utils/`**: Funções utilitárias.
  - **`tests/`**: Arquivos para testes.
  - **`styles/`**: Arquivos de estilo.
  - **`App.jsx`**: Componente principal da aplicação.
- **`public/`**: Arquivos estáticos e configuração do projeto.
- **`data/`**: Arquivos JSON com dados dos equipamentos (não incluído no repositório).

## Funcionalidades

- Exibição das posições dos equipamentos: Equipamentos são exibidos em suas posições mais recentes no mapa.
- Estado atual do equipamento: Visualização do estado mais recente dos equipamentos.
- Histórico de estados: Permite visualizar o histórico de estados de um equipamento específico.
- Filtros e Pesquisa: Filtrar por estado atual ou modelo de equipamento e pesquisa por equipamentos específicos.
- Cálculo de Produtividade e Ganho: Calcula a produtividade e o ganho dos equipamentos com base nos estados e modelos.

## Testes

Os testes são realizados usando Jest. Para rodar os testes, utilize o comando:
    ```bash
    npm run test
    ```

## Contato

Para perguntas ou comentários, entre em contato com [manoel_sabino@hotmail.com.br](mailto:manoel_sabino@hotmail.com.br).
