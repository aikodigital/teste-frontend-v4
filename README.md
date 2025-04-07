# Sistema de Rastreamento de Equipamentos

## Introdução

Este projeto é um aplicativo React/TypeScript projetado para rastrear e gerenciar equipamentos florestais. Ele fornece uma interface de mapa visual, informações detalhadas sobre equipamentos e uma visualização de lista para navegação fácil.

[link do vídeo:](https://drive.google.com/file/d/1hFzj_LvsR7D59cbtbnWpcKwecsPPbPK8/view?usp=sharing)

### Principais Funcionalidades

*   **Visualização de Mapa:** Exibe as localizações dos equipamentos em um mapa com marcadores interativos.
*   **Detalhes do Equipamento:** Mostra informações detalhadas sobre cada equipamento, incluindo seu modelo, estado atual, produtividade, ganhos e histórico de estados.
*   **Lista de Equipamentos:** Fornece uma visualização em lista de todos os equipamentos com recursos de filtragem e pesquisa.
*   **Filtragem:** Permite que os usuários filtrem os equipamentos por nome, modelo e estado atual.
*   **Pesquisa:** Permite que os usuários pesquisem equipamentos por nome.
*   **Histórico de Estados:** Exibe o histórico de mudanças de estado para cada equipamento.
*   **Cálculos:** Calcula a produtividade e os ganhos de cada equipamento.

## Componentes

### `EquipmentMap.tsx`

*   **Descrição:** Este componente renderiza um mapa com marcadores para cada equipamento. Ele permite a filtragem por nome, modelo e estado.
*   **Props:** Nenhuma.
*   **Estado:**
    *   `search`: A consulta de pesquisa atual (string).
    *   `selectedModel`: O ID do modelo selecionado (string).
    *   `selectedState`: O ID do estado selecionado (string).
    *   `mapMarkers`: Um array de objetos `MarkerData` a serem exibidos no mapa.
    *   `filteredEquipment`: Um array de objetos de equipamento que correspondem aos critérios de filtro atuais.
*   **Funcionalidade:**
    *   Busca dados de equipamentos, dados de modelos e dados de estados de arquivos JSON.
    *   Filtra equipamentos com base na pesquisa, modelo selecionado e estado selecionado.
    *   Calcula a posição e o estado mais recentes para cada equipamento.
    *   Renderiza marcadores no mapa com popups mostrando detalhes do equipamento.
    *   Usa `react-leaflet` para renderização do mapa.
    *   Usa `leaflet` para ícones.
    *   Usa `react-router-dom` para navegação.
    *   Usa `useEffect` para atualizar os marcadores quando os filtros mudam.
    *   Usa `FitBoundsToMarkers` para ajustar os limites do mapa aos marcadores.
*   **Elementos de UI:**
    *   Campo de entrada de pesquisa.
    *   Dropdown de modelo.
    *   Dropdown de estado.
    *   Contêiner do mapa.
    *   Marcadores com popups.

### `EquipmentDetails.tsx`

*   **Descrição:** Este componente exibe informações detalhadas sobre um único equipamento.
*   **Props:** Nenhuma.
*   **Estado:**
    *   `order`: A ordem do histórico de estados ('latest' ou 'oldest').
*   **Funcionalidade:**
    *   Busca dados de equipamentos, dados de modelos, dados de estados, histórico de estados e histórico de posições de arquivos JSON.
    *   Calcula a produtividade e os ganhos usando as funções utilitárias em `calculations.ts`.
    *   Exibe o nome do equipamento, modelo, estado atual, produtividade, ganhos e histórico de estados.
    *   Renderiza um mapa com um marcador mostrando a localização atual do equipamento.
    *   Usa `react-leaflet` para renderização do mapa.
    *   Usa `date-fns` para formatação de data.
    *   Usa `react-router-dom` para obter o ID do equipamento da URL.
    *   Usa `getStateHistoryInOrder` para ordenar o histórico de estados.
*   **Elementos de UI:**
    *   Nome do equipamento.
    *   Nome do modelo.
    *   Estado atual.
    *   Produtividade.
    *   Ganhos.
    *   Histórico de estados.
    *   Contêiner do mapa.
    *   Marcador.

### `EquipmentList.tsx`

*   **Descrição:** Este componente exibe uma lista de equipamentos com recursos de filtragem e pesquisa.
*   **Props:** Nenhuma.
*   **Estado:**
    *   `search`: A consulta de pesquisa atual (string).
    *   `selectedModel`: O ID do modelo selecionado (string).
    *   `selectedState`: O ID do estado selecionado (string).
*   **Funcionalidade:**
    *   Busca dados de equipamentos, dados de modelos e dados de estados de arquivos JSON.
    *   Filtra equipamentos com base na pesquisa, modelo selecionado e estado selecionado.
    *   Calcula o estado mais recente para cada equipamento.
    *   Renderiza um `EquipmentCard` para cada equipamento.
*   **Elementos de UI:**
    *   Campo de entrada de pesquisa.
    *   Dropdown de modelo.
    *   Dropdown de estado.
    *   Lista de componentes `EquipmentCard`.

### `EquipmentCard.tsx`

*   **Descrição:** Este componente exibe um cartão com informações básicas sobre um equipamento.
*   **Props:**
    *   `equipment`: Os dados do equipamento (objeto).
    *   `currentState`: O estado atual do equipamento (objeto).
*   **Funcionalidade:**
    *   Exibe o nome do equipamento e o estado atual.
    *   Fornece um link para a página `EquipmentDetails`.
*   **Elementos de UI:**
    *   Nome do equipamento.
    *   Estado atual.
    *   Link para `EquipmentDetails`.

## Funções Utilitárias (`utils/calculations.ts`)

*   **`calculateProductivity(states: StateHistory[]): number`**
    *   **Descrição:** Calcula a produtividade de um equipamento com base em seu histórico de estados.
    *   **Parâmetros:**
        *   `states`: Um array de objetos `StateHistory`.
    *   **Retorna:** A produtividade como uma porcentagem (número).
*   **`calculateEarnings(states: StateHistory[], model: EquipmentModel): number`**
    *   **Descrição:** Calcula os ganhos totais de um equipamento com base em seu histórico de estados e modelo.
    *   **Parâmetros:**
        *   `states`: Um array de objetos `StateHistory`.
        *   `model`: Um objeto `EquipmentModel`.
    *   **Retorna:** Os ganhos totais (número).

## Configuração e Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/jacksont-santos/teste-frontend-v4.git
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd aiko-test
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```
5. **Execute os testes:**
    ```bash
    npm test
    ```

## Tecnologias e 

Principais tecnologias:

*   Vite
*   React
*   Typescript
*   Tailwind

Este projeto usa as seguintes dependências principais:

*   **`react`:** ^18.3.1
*   **`react-dom`:** ^18.3.1
*   **`react-router-dom`:** ^6.22.3
*   **`leaflet`:** ^1.9.4
*   **`react-leaflet`:** ^4.2.1
*   **`date-fns`:** ^3.3.1
*   **`lucide-react`:** ^0.344.0

E as seguintes dependências de desenvolvimento:

*   **`@eslint/js`:** ^9.9.1
*   **`@types/react`:** ^18.3.5
*   **`@types/react-dom`:** ^18.3.0
*   **`@types/leaflet`:** ^1.9.8
*   **`@vitejs/plugin-react`:** ^4.3.1
*   **`autoprefixer`:** ^10.4.18
*   **`eslint`:** ^9.9.1
*   **`eslint-plugin-react-hooks`:** ^5.1.0-rc.0
*   **`eslint-plugin-react-refresh`:** ^0.4.11
*   **`globals`:** ^15.9.0
*   **`postcss`:** ^8.4.35
*   **`tailwindcss`:** ^3.4.1
*   **`typescript`:** ^5.5.3
*   **`typescript-eslint`:** ^8.3.0
*   **`vite`:** ^5.4.2
