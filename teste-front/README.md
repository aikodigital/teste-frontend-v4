
## 1. Visão Geral do Projeto

Esta aplicação de monitoramento de equipamentos foi desenvolvida para fornecer uma interface intuitiva que permite visualizar, buscar e monitorar equipamentos operacionais em um mapa. Os usuários podem ver o estado atual dos equipamentos, produtividade, ganho por hora e o histórico de estados de cada equipamento. A aplicação inclui funcionalidades como pesquisa de equipamentos, filtragem por estado e detalhamento de informações operacionais.

<a name="tecnologias"></a>

## 2. Tecnologias Utilizadas

A aplicação foi construída utilizando as seguintes tecnologias:

-   **React.js**: Para criação da interface de usuário e controle de estado.
-   **React-Leaflet**: Para renderização de mapas interativos com base na biblioteca Leaflet.
-   **TypeScript**: Para tipagem estática e melhor suporte a manutenção.
-   **SCSS**: Para estilização com uso de variáveis, mixins e aninhamento de regras CSS.
-   **Node.js + Express**: Backend para simulação de serviços e APIs de dados.
-   **Jest**: Para testes unitários de funções lógicas.

<a name="decisoes-design"></a>

## 3. Decisões de Design

### 3.1. Componentização

Todos os componentes da aplicação foram divididos de maneira modular, seguindo boas práticas de reutilização e manutenção. Isso permitiu que cada parte da interface (como o mapa, a lista de equipamentos e os filtros) fossem desenvolvidos e testados separadamente.

### 3.2. Responsividade

O design da aplicação foi pensado para funcionar bem em diferentes dispositivos. A barra lateral é escondida em telas menores e pode ser aberta com um botão de "hamburger", o campo de pesquisa foi ajustado para não ultrapassar os limites da tela e o layout é flexível.

### 3.3. Sistema de Pesquisa e Filtros

Foi implementado um campo de pesquisa simples que permite ao usuário filtrar os equipamentos visíveis pelo nome, em conjunto com filtros de estados de operação.

### 3.4. Mapa Interativo

O mapa foi integrado utilizando **React-Leaflet** para permitir a visualização dos equipamentos no campo. Cada equipamento é representado com um ícone customizado que varia conforme o modelo.

<a name="componentes-desenvolvidos"></a>

## 4. Componentes Desenvolvidos

### 4.1. **Layout**

Este é o componente raiz que organiza a estrutura geral da página. Ele inclui a barra lateral, o mapa e os detalhes do equipamento selecionado. O Layout também gerencia o estado da aplicação, como a seleção de um equipamento e a busca por nome.

### 4.2. **EquipmentList**

Este componente exibe uma lista de todos os equipamentos. Ele permite que o usuário selecione um equipamento, atualizando o estado global com o equipamento selecionado.

### 4.3. **EquipmentInfo**

Responsável por exibir informações detalhadas do equipamento selecionado, como a produtividade, ganho por hora, modelo e estado atual.

### 4.4. **EquipmentMap**

Este componente utiliza o **React-Leaflet** para exibir a posição dos equipamentos no mapa, diferenciando-os visualmente por ícones específicos do modelo. O mapa permite que o usuário selecione e desmarque equipamentos.

### 4.5. **FilterPanel**

Este componente permite a aplicação de filtros baseados no estado operacional dos equipamentos, como “Todos” ou apenas “Operando”.

### 4.6. **Calculate Functions**

-   **calculateProductivity**: Função que calcula a produtividade dos equipamentos com base nas horas operadas.
-   **calculateEarnings**: Função que calcula os ganhos de um equipamento com base no histórico de estados e os valores de ganhos por hora informados.

<a name="fluxo-aplicacao"></a>

## 5. Fluxo da Aplicação

1.  **Carga Inicial de Dados**: Ao iniciar, a aplicação carrega todos os dados dos equipamentos, histórico de estados, modelos e estados possíveis.
2.  **Exibição do Mapa e Equipamentos**: O mapa exibe a posição dos equipamentos carregados e a lista ao lado permite selecionar um equipamento.
3.  **Detalhamento do Equipamento**: Ao selecionar um equipamento, são mostrados detalhes como a produtividade e o ganho calculado.
4.  **Filtragem e Pesquisa**: O usuário pode aplicar filtros para visualizar apenas os equipamentos em determinados estados ou pesquisar um equipamento específico pelo nome.

<a name="instrucoes-uso"></a>

## 6. Instruções de Uso

1.  **Busca de Equipamentos**: Utilize a barra de pesquisa no topo da barra lateral para buscar por um equipamento específico pelo nome.
2.  **Filtragem por Estado**: No painel de filtros, selecione o estado do equipamento desejado (ex.: Operando) para refinar os resultados.
3.  **Visualização no Mapa**: Os equipamentos são exibidos no mapa com ícones diferentes baseados no seu modelo. Clique em um equipamento para ver mais detalhes.
4.  **Exibição de Detalhes**: Após clicar em um equipamento, as informações detalhadas aparecerão no painel à direita, incluindo produtividade e ganho total.

<a name="execucao"></a>

## 7. Execução da Aplicação

### 7.1. Pré-requisitos

-   Node.js (versão 14+)
-   NPM ou Yarn
-   Ambiente configurado com React

### 7.2. Passos para execução:

1.  Clone o repositório:
    
    `git clone <repo_url>` 
    
2.  Instale as dependências:
    
    `npm install` 
    
3.  Inicie a aplicação:

    `npm start` 
    
5.  Acesse o ambiente local no navegador:
    
    `http://localhost:3000` 
    

<a name="testes"></a>

## 8. Testes

### 8.1. Configuração de Testes

A aplicação utiliza o **Jest** para testes unitários, especialmente para as funções de cálculo.

### 8.2. Execução de Testes:

Para rodar os testes unitários, execute o seguinte comando:

`npm test` 

### 8.3. Testes Implementados:

-   **calculateProductivity**: Testa se a função está calculando corretamente a produtividade com base nas horas operacionais.
-   **calculateEarnings**: Verifica se os ganhos são calculados corretamente, multiplicando o valor por hora de cada estado pela quantidade de horas naquele estado.

<a name="contribuicoes"></a>

## 9. Contribuições e Melhorias Futuros

### Melhorias Futuros:

-   **Autenticação e Controle de Acesso**: Implementar autenticação para acesso de diferentes níveis de usuários.
-   **Integração com API Real**: Substituir o mock de dados por uma API real para atualização em tempo real das informações.
-   **Melhorias de UI**: Ajustar o layout e a responsividade para melhor usabilidade em diferentes dispositivos.

### Contribuições:

Caso queira contribuir com melhorias ou novos recursos, siga as instruções abaixo:

1.  **Fork** o repositório.
2.  Crie uma nova branch:
    
    `git checkout -b feature/sua-melhoria` 
    
3.  Faça suas alterações e submeta um **Pull Request**.

<a name="consideracoes"></a>

## 10. Considerações Finais

Essa aplicação foi desenvolvida com foco em fornecer uma interface clara e fácil de usar para monitoramento de equipamentos em operação. A divisão modular e o uso de tecnologias modernas visam garantir uma boa performance e facilidade de manutenção.

Fico à disposição para qualquer dúvida e melhoria que possa ser realizada.