# Projeto FindEquip

O **FindEquip** é uma aplicação para visualizar equipamentos em um mapa, com seus estados e histórico de posições. O projeto utiliza **React** como framework principal, com suporte para mapas interativos através da **React-Leaflet**. A aplicação também consome dados de um servidor JSON local, gerenciando equipamentos e seus estados.

## Stack Utilizada

- **React**: Biblioteca principal para a construção da interface.
- **React-Leaflet**: Biblioteca para renderização de mapas interativos utilizando Leaflet.
- **Context API**: Para gerenciamento de estados globais.
- **Tailwind CSS**: Para estilização da interface de forma rápida e eficiente.
- **DaisyUI**: Extensão do Tailwind CSS para componentes pré-definidos.
- **Axios**: Para fazer requisições HTTP e consumir os dados do servidor JSON.

## Bibliotecas Utilizadas

- **React**: Criação de interfaces declarativas.
- **React-Leaflet**: Renderização de mapas.
- **Axios**: Comunicação HTTP com o backend.
- **Tailwind CSS**: Estilização da interface.
- **DaisyUI**: Componentes pré-definidos para estilização rápida.
- **JSON Server**: Simulação de uma API REST para servir dados dos equipamentos.

## Como Iniciar o Projeto

### Instalação

1.  Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2.  Entre na pasta do projeto:

    ```bash
    cd seu-repositorio
    ```

3.  Instale as dependências utilizando **npm**:
    ```bash
    npm install
    ```

### Iniciando o Servidor JSON

A aplicação utiliza o **JSON Server** para simular uma API REST que fornece dados dos equipamentos e seus estados. Para iniciar o servidor:

1.  No terminal, execute o comando:

    ```bash
    node index
    ```

2.  O **JSON Server** estará rodando em <http://localhost:3001>.

### Iniciando a Aplicação React

Após instalar as dependências e iniciar o servidor JSON, você pode iniciar a aplicação React com o comando:
`bash
    npm start
    `

O projeto estará disponível em <http://localhost:3000>.

## Funcionalidades

- Visualização dos equipamentos em um mapa interativo.
- Informações sobre o estado atual do equipamento diretamente no mapa.
- Histórico de estados e posições dos equipamentos.
- Sidebar para listar e pesquisar equipamentos.
- Filtragem de equipamentos por estado e modelo.

## Estrutura de Pastas

- **/src/components**: Contém todos os componentes reutilizáveis.
- **/src/context**: Contexto da aplicação para gerenciamento de estados globais.
- **/src/hooks**: Hooks customizados para separar a lógica de dados.
- **/src/api**: Módulo responsável pelas requisições HTTP para o servidor JSON.
