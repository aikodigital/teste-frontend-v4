# 📝 Documentação

## Visão Geral
Esta aplicação é um sistema de rastreamento de equipamentos que permite visualizar, filtrar e gerenciar informações sobre diversos equipamentos em um mapa interativo.

## Componentes Principais

### 1 - EquipmentMap 
- Este é o componente principal que renderiza o mapa e os marcadores dos equipamentos.

### Funcionalidades:
- Exibe um mapa centrado no Brasil usando OpenStreetMap.
- Mostra marcadores para cada equipamento filtrado.
- Permite abrir um popup com detalhes do equipamento ao clicar em um marcador.

### Componentes filhos:
- *EquipmentFilter:* Filtros para estado e modelo de equipamento.
- *EquipmentSearch:* Campo de pesquisa para equipamentos.
- *EquipmentPopup:* Popup com detalhes do equipamento selecionado.

### 2 - EquipmentPopup  
- Exibe informações detalhadas sobre um equipamento específico.

### Funcionalidades:
- Mostra o nome, modelo, ID do modelo e estado atual do equipamento.
- Permite abrir um histórico de estados do equipamento.

### 3 - EquipmentFilter   
- Fornece opções de filtro para os equipamentos exibidos no mapa.

### Funcionalidades:
- Filtro por estado do equipamento.
- Filtro por modelo do equipamento.

### 4 - EquipmentSearch    
- Permite pesquisar equipamentos por nome.

### Funcionalidades:
- Campo de entrada de texto para pesquisa.
- Atualiza os equipamentos filtrados em tempo real conforme o usuário digita.

### 5 - EquipmentStateHistory     
- Exibe um histórico detalhado dos estados de um equipamento específico.

### Funcionalidades:
- Mostra uma tabela paginada com o histórico de estados.
- Inclui informações como data, nome do estado, ID do estado e valor por hora.

------------
## Store (Pinia)
### EquipmentStore
- Gerencia o estado global da aplicação e fornece ações e getters para manipular os dados.

### Estado
- *equipment:* Lista de equipamentos.
- *equipmentModels:* Lista de modelos de equipamentos.
- *equipmentStates:* Lista de estados possíveis para os equipamentos.
- *equipmentStateHistory:* Histórico de estados dos equipamentos.
- *equipmentPositionHistory:* Histórico de posições dos equipamentos.
- *searchQuery:* Query de pesquisa atual.
- *filteredEquipment:* Lista de equipamentos filtrados.
- *currentStateFilter:* Filtro de estado atual.
- *currentModelFilter:* Filtro de modelo atual.

### Ações
- *fetchData():* Busca todos os dados necessários da API.
- *getLatestPosition():* Obtém a posição mais recente de um equipamento.
- *getLatestState():* Obtém o estado mais recente de um equipamento.
- *setStateFilter():* Define o filtro de estado.
- *setModelFilter():* Define o filtro de modelo.
- *setSearchQuery():* Define a query de pesquisa.
- *applyFilters():* Aplica todos os filtros aos equipamentos.

### Getters
- *stateHistory:* Retorna o histórico de estados de um equipamento.
- *getStateHistoryWithValues:* Retorna o histórico de estados com os

------------
## Composables

### useMapIcons
- Gerencia a criação e cache de ícones SVG para os marcadores do mapa.

### Funcionalidades

- Gera URLs de ícones SVG dinamicamente.
- Armazena ícones em cache para reutilização.

### useMapMarkers
- Fornece funções utilitárias para trabalhar com marcadores no mapa.

## Funcionalidades:
- Obtém as coordenadas (latitude e longitude) mais recentes de um equipamento.


------------
## Tipagem de Dados
- *Equipment:* Representa um equipamento.
- *EquipmentState:* Representa um estado possível de um equipamento.
- *EquipmentModel:* Representa um modelo de equipamento.
- *StateHistoryEntry:* Representa uma entrada no histórico de estados.
- *EquipmentStateHistory:* Representa o histórico completo de estados de um equipamento.
- *Position:* Representa uma posição geográfica com data.
- *EquipmentPositionHistory:* Representa o histórico completo de posições de um equipamento.

 ## Fluxo de Dados
1.  Os dados são buscados da API ao iniciar a aplicação.
1. O usuário pode interagir com o mapa, filtros e pesquisa.
1. As ações do usuário atualizam o estado na store.
1. A store aplica os filtros e atualiza a lista de equipamentos filtrados.
1. O mapa e outros componentes reagem às mudanças na store e atualizam a interface.

## :heavy_plus_sign: Extras
- **Filtros:** Filtrar as visualizações por estado atual ou modelo de equipamento.
- **Pesquisa:** Ser possível pesquisar por dados de um equipamento especifico.
- **Diferenciar os equipamentos:** Diferenciar visualmente os equipamentos por modelo de equipamento na visualização do mapa.
- **Teste:** Teste e2e.


## :rocket:  Tecnologias utilizadas
Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Nuxt](https://nuxt.com/)
- [Pinia](https://pinia.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [Cypress](https://www.cypress.io/)
- [Primevue](https://tailwind.primevue.org/)
- [Leaflet](https://nuxt.com/modules/leaflet)

## 💾 Instalação

Instale todas as dependências do projeto

```
npm install
```

Rode a aplicação

```
npm run dev
```



