# Histórico de Equipamentos de Operação Florestal

Este projeto é uma aplicação web desenvolvida em Vue 3 para exibir o histórico de posições e estados de equipamentos utilizados em operações florestais. A aplicação foi criada como parte de um teste de desenvolvimento frontend, focando na visualização de dados históricos de equipamentos.

## Tecnologias Utilizadas

- **Vue 3**: Framework JavaScript utilizado para construção da interface do usuário.
- **TypeScript**: Utilizado para adicionar tipagem estática ao JavaScript.
- **Vite**: Ferramenta de build utilizada para configuração do projeto Vue.
- **Vue Router**: Utilizado para gerenciar o roteamento na aplicação.
- **Leaflet**: Biblioteca JavaScript para mapas interativos.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida.
- **Composables**: Gerenciador de estado para Vue 3.

## Funcionalidades

- **Visualização de Mapa**: Exibe as posições dos equipamentos em um mapa interativo utilizando a biblioteca `Leaflet`.
- **Histórico de Estados**: Exibição de um histórico detalhado dos estados dos equipamentos, como "Operando", "Parado", e "Em Manutenção".
- **Paginação**: Implementação de paginação na visualização de tabelas de histórico de estados.
- **Ordenação de Dados**: Suporte para ordenar os dados de histórico por data, tanto em ordem crescente quanto decrescente.
- **Mock de Dados**: Os dados dos equipamentos e seu histórico de estados são mockados.

## Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para Rodar

1. **Clone o repositório**

   ```bash
   npm install
# ou
   yarn install

   npm run dev
# ou
   yarn dev

   Abra o navegador e acesse http://localhost:3000.


## Estrutura do Projeto

A estrutura do projeto segue o padrão de uma aplicação Vue 3 moderna:

```plaintext
├── public/                      # Arquivos públicos (favicon, index.html, etc.)
├── src/                         # Código fonte da aplicação
│   ├── assets/                  # Arquivos estáticos (imagens, estilos, etc.)
│   ├── components/              # Componentes reutilizáveis Vue
│   │   ├── icon/                # Componentes de ícones que recebem props em Vue
│   │   ├── LMap.vue             # Componente de mapa interativo utilizando Leaflet
│   │   ├── Table.vue            # Componente de tabela para exibição de dados com paginação
│   │   ├── Button.vue           # Componente de botão
│   │   ├── Header.vue           # Componente de menu responsivo
│   │   ├── Input.vue            # Componente de input com validador VeeValidate integrado
│   │   ├── Pagination.vue       # Componente de paginação utilizado na tabela
│   │   ├── Select.vue           # Componente de select integrado com Vue-Select
│   │   └── Spinner.vue          # Componente de loading
│   ├── composables/             # Funções reutilizáveis e lógica compartilhada
│   │   └── useDataEquipments.ts # Composable para gerenciamento de dados de equipamentos
│   ├── router/                  # Configuração de rotas do Vue Router
│   │   └── index.ts             # Arquivo principal de rotas
│   ├── types/                   # Definições de tipos TypeScript
│   │   ├── marker.ts            # Tipos para marcadores do mapa
│   │   ├── positionList.ts      # Tipos para posições de equipamentos
│   │   └── table.ts             # Tipos para estrutura de dados da tabela
│   ├── pages/                   # Páginas principais da aplicação
│   │   ├── EquipmentHistory.vue # Página de histórico de equipamentos
│   │   ├── Home.vue             # Página principal onde exibe o mapa com as localizações e markers dos equipamentos
│   │   └── Login.vue            # Página de login para autenticação no sistema
│   ├── App.vue                  # Componente raiz da aplicação
│   └── main.ts                  # Arquivo de entrada principal
├── index.html                   # Template HTML principal
├── package.json                 # Dependências e scripts do projeto
└── vite.config.ts               # Configuração do Vite