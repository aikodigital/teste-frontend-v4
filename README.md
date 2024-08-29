# Documentação do Projeto de Monitoramento de Equipamentos Florestais

## Visão Geral
Este projeto tem como objetivo monitorar e visualizar dados de equipamentos em operações florestais. A aplicação permite que gestores acompanhem a posição, estado atual, histórico de estados e desempenho dos equipamentos.

## Tecnologias Utilizadas
- **React & TypeScript:** Para o desenvolvimento da interface do usuário.
- **Leaflet:** Para a visualização de mapas e marcadores.
- **ReactApexChart:** Para a geração de gráficos de produtividade e ganho.
- **Cypress:** Para testes end-to-end e de interface.

## Estrutura do Projeto
- **Components:** Componentes reutilizáveis como `Header` e `FiltroCard`.
- **Containers:** Contém lógica de negócio e interações mais complexas como `MapaLocalizacao` e `BarraLateral`.
- **Utils:** Cálculos e lógica específica de produtividade e ganhos.

## Funcionalidades

### 1. Input (Busca)
O Input de Busca de pesquisa para pesquisar qualquer estado do Equipamento ou modelo de Equipamento.

### 2. Mapa de Localização
Exibe a posição atual dos equipamentos com ícones diferenciados para cada estado. Ao clicar em um marcador, é possível visualizar o histórico de estados do equipamento.
E visualizar o trajecto feito de cada equipamento induvidualmente implementei o botão "clear" para não poluir o Mapa assim é possivel apagar o histórico do trajecto
individualmente.

### 3. Filtros de Estado e Modelo
Filtros permitem que o usuário visualize apenas equipamentos que estão em determinado estado (Operando, Parado, Manutenção) ou que pertencem a um determinado modelo.

### 4. Gráficos de Produtividade e Ganho
Gráficos mostram o desempenho dos equipamentos em termos de produtividade (percentual de tempo operando) e ganhos (calculado com base nos estados e horas de operação).
Graficos Interativos.

## Testes
Testes foram realizados com Cypress para garantir que os filtros, mapa, e elementos principais da interface estejam funcionando corretamente.


## Decisões Técnicas
- **Leaflet:** Escolhido para a visualização do mapa devido à sua flexibilidade e suporte a camadas customizadas.
- **ReactApexChart:** Utilizado para gráficos devido à sua simplicidade e bom suporte a gráficos interativos.
- **Cypress:** Para testes automatizados, garantindo a integridade da interface em diversas situações.


## Considerações Finais
Este projeto implementa as principais funcionalidades de monitoramento, com filtros avançados e gráficos interativos. Futuras melhorias podem incluir a visualização de trajetos históricos e a integração de mais dados em tempo real.
