# Documentação do Projeto GeoTrack Dashboard

## Visão Geral do Projeto

Este projeto foi desenvolvido como parte de um teste técnico para uma vaga de desenvolvedor frontend. A proposta consistia em criar uma aplicação que exibisse e permitisse a interação com dados de equipamentos utilizados em uma operação florestal. A aplicação deve exibir a posição atual dos equipamentos em um mapa, mostrar seus estados em tempo real, e permitir a visualização de históricos de estados e posições.

## Estrutura do Projeto

### Frontend

Para o frontend, utilizei Next.js como framework principal devido à sua capacidade de rendering no lado do servidor (SSR) e sua integração facilitada com React, além de ser uma escolha moderna e eficiente para aplicações web interativas.

* **Mantine:** Escolhi essa biblioteca de componentes UI por sua simplicidade e flexibilidade. Ela me permitiu construir interfaces modernas e responsivas rapidamente.

* **Leaflet e React-Leaflet:** Optei por usar o Leaflet junto com React-Leaflet para renderizar o mapa interativo, pois é uma combinação robusta que oferece alta personalização e suporte para dados geoespaciais, o que era essencial para este projeto.

* **Axios:** Utilizei o Axios para fazer as requisições HTTP ao backend. Isso permitiu uma fácil integração com os endpoints e a manipulação de respostas assíncronas de forma simplificada.

#### Principais Componentes Desenvolvidos:
1. **HomePage:** É a página principal do dashboard. Ela renderiza o mapa, os filtros, e os marcadores dos equipamentos. Inclui funções para carregar dados, aplicar filtros e exibir informações detalhadas sobre os equipamentos no mapa.

2. **CustomMarker:** Este componente é responsável por renderizar os marcadores personalizados no mapa, incluindo o popup que exibe informações detalhadas como nome, modelo, estado e produtividade do equipamento.

3. **Navbar:** Componente de navegação que permite ao usuário acessar rapidamente diferentes seções da aplicação, como o dashboard e a FAQ.

4. **FaqPage e Faq Component:** Páginas que oferecem informações úteis e perguntas frequentes sobre a aplicação, implementadas usando os componentes de acordeão da Mantine.

5. **Hooks Personalizados:** Implementei hooks personalizados como useDashboard, useStates, useModels, e useEquipment para gerenciar as chamadas à API e o estado global dos dados na aplicação.

#### Funcionalidades Extras Implementadas:
* **Filtros Avançados:** Adicionei a capacidade de filtrar equipamentos por estado, modelo, e nome diretamente na interface do usuário, o que facilita a navegação e o gerenciamento dos dados exibidos no mapa.

* **Histórico de Posições:** Desenvolvi uma funcionalidade que permite visualizar o trajeto realizado pelos equipamentos ao longo do tempo, exibido como uma linha no mapa, com marcadores que representam as posições anteriores.

 
### Backend
Para a API de backend, usei NestJS, um framework moderno e altamente modular que permite a criação de APIs RESTful de forma organizada e escalável. A API foi desenvolvida com foco em fornecer todos os dados necessários para o frontend, incluindo:

* **Endpoints para Equipamentos, Modelos, Estados e seus Históricos:** Criei endpoints específicos para recuperar dados sobre equipamentos, seus modelos, estados, e os históricos de posição e estado. Estes dados são carregados a partir dos arquivos JSON fornecidos no teste e servidos ao frontend via API.

* **Integração com MongoDB:** Utilizei MongoDB como banco de dados para armazenar e manipular os dados. A escolha foi baseada na flexibilidade do MongoDB para lidar com documentos JSON, que se alinham diretamente com os dados fornecidos.

* **Cálculo de Produtividade e Ganhos:** Além de apenas fornecer os dados brutos, a API também realiza cálculos importantes como a produtividade dos equipamentos e os ganhos acumulados com base nos modelos e estados, antes de retornar os dados ao frontend.

#### Relacionamento Backend-Frontend:
Todo o backend foi desenvolvido de forma a servir diretamente os requisitos do frontend. Cada funcionalidade no frontend foi respaldada por um endpoint específico na API, garantindo que os dados fossem sempre atualizados e sincronizados.

* **Carregamento de Mapas:** A API fornece os dados de posição dos equipamentos em tempo real, que são então renderizados no mapa pelo frontend.

* **Visualização de Histórico:** Quando o usuário clica em um equipamento no mapa, o frontend faz uma requisição à API para obter o histórico completo daquele equipamento, que é então processado e exibido ao usuário.

* **Filtros e Pesquisas:** A API suporta consultas complexas que permitem ao frontend filtrar os equipamentos com base em estado, modelo e outros critérios diretamente na interface de usuário.

## Decisões de Design
### Escolha de Frameworks e Bibliotecas
* **Next.js:** Escolhido por sua eficiência em rendering SSR e SSG, além de facilitar a integração com outras ferramentas React.

* **NestJS:** Permitindo uma estrutura modular e organizada, facilitando a escalabilidade da aplicação backend.

* **Leaflet com React-Leaflet:** Escolhidos por sua robustez e facilidade de uso para renderização de mapas interativos.

* **Mantine:** Pela sua simplicidade e eficiência na criação de interfaces modernas.

### Integração Frontend e Backend
Cada funcionalidade foi desenhada com foco na integração direta entre o frontend e o backend. A aplicação foi desenvolvida para ser facilmente expansível, permitindo a adição de novos filtros e funcionalidades sem grande esforço.


### Funcionalidades Implementadas
* **Dashboard Interativo:** Equipamentos são exibidos no mapa com seus estados e posições mais recentes.

* **Visualização de Histórico:** Exibição do histórico de estados e posições ao clicar em um equipamento.

* **Filtros Avançados e Pesquisa:** Ferramentas de filtragem para facilitar a navegação entre os dados dos equipamentos.

### Finalização
Este projeto foi uma excelente oportunidade para demonstrar habilidades tanto no frontend quanto no backend, além de integrar e manipular dados geoespaciais em tempo real. O GeoTrack Dashboard foi desenvolvido para ser uma ferramenta eficiente e intuitiva para gestores monitorarem suas operações florestais, cumprindo todos os requisitos do desafio e indo além com funcionalidades extras como o cálculo de produtividade e visualização de histórico detalhado.