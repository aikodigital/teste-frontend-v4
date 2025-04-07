# Dashboard de Monitoramento de Equipamentos

Esta documentação descreve a **arquitetura**, os **requisitos**, as **decisões de design** e as **práticas adotadas** para o desenvolvimento do **dashboard de monitoramento de equipamentos**, desafio proposto pela **AIKO** para o processo seletivo para vaga de **desenvolvedor front-end**. O objetivo da aplicação é exibir, de forma **intuitiva** e **responsiva**, informações coletadas de equipamentos, tais como **posições** e **estados**.

---

## 1. Introdução

O **Dashboard de Monitoramento de Equipamentos** foi desenvolvido para fornecer aos gestores uma visão **integrada** e **dinâmica** dos equipamentos utilizados. A aplicação permite visualizar:

- **Posições mais recentes dos Equipamentos:** Exibidas em um **mapa interativo**.
- **Estado Atual dos Equipamentos:** Visualizados como **pop-ups** ou ao passar o mouse sobre os **markers**.
- **Histórico de Estados:** Disponível ao clicar em um equipamento, permitindo analisar a **evolução dos estados**.

---

## 2. Arquitetura e Tecnologias

### 2.1. Tecnologias Utilizadas
- **Framework Frontend:** **Vue 3** (Composition API)
- **Gerenciamento de Estado:** **Pinia**
- **Mapas:** **Leaflet** (para exibição de posições)
- **Estilização:** **Tailwind CSS**
- **Testes:** **Vitest** para testes unitários
- **Linguagem:** **JavaScript** (ES6+)

### 2.2. Estrutura de Arquivos
A estrutura do projeto segue as boas práticas de **componentização** e **modularização**.
---

## 3. Modelagem dos Dados

Os dados são fornecidos em formato **JSON** na pasta `data/`, e cada arquivo possui a seguinte finalidade:

- **equipment.json:** Lista de equipamentos, contendo **id**, **equipmentModelId** e **name**.
- **equipmentModel.json:** Modelos de equipamentos com atributos como **name** e **hourlyEarnings** (valores por hora para cada estado).
- **equipmentState.json:** Estados dos equipamentos (por exemplo, **Operando**, **Parado**, **Manutenção**) com propriedades **id**, **name** e **color**.
- **equipmentStateHistory.json:** Histórico de estados de cada equipamento, permitindo identificar o **estado atual** e a **evolução**.
- **equipmentPositionHistory.json:** Histórico de posições (**GPS**) dos equipamentos, permitindo plotar os **markers** no mapa.

---

## 4. Funcionalidades e Fluxo da Aplicação

### 4.1. Exibição do Mapa e Posições
- **MapComponent.vue:** Responsável por carregar os dados de posição e exibi-los como **markers** no mapa usando **Leaflet**.
  - Os markers são **customizados** com cores que refletem o estado do equipamento.
  - Ao passar o mouse (**hover**) são exibidos **pop-ups** com detalhes básicos sobre o equipamento.
  - Ao clicar em um marker, a **sidebar de detalhes** será acionada.

### 4.2. Visualização do Estado Atual
- **EquipmentSidebar.vue:** Ao selecionar um equipamento, a sidebar exibe:
  - **Nome do equipamento** e **modelo**.
  - **Estado atual** com **cor**, obtidos através do getter **getCurrentState** na store.
  - **Última posição** registrada.

### 4.3. Histórico de Estados e Posições
- **Histórico de Estados:** Disponível na sidebar, onde o usuário pode visualizar uma lista de estados do equipamento.

### 4.4. Pesquisa e Filtros
- **SearchBar.vue:** Permite ao usuário digitar e filtrar equipamentos com **sugestões dinâmicas**.
  - Implementa **debounce** para melhorar a experiência.
- **EquipmentFilter.vue:** Permite filtrar os equipamentos por **estado atual** ou **modelo**.

---

## 5. Gerenciamento de Estado

A **Pinia** é utilizada para gerenciar o **estado global** da aplicação. O **equipmentStore** centraliza:

- **Listas** de equipamentos, modelos, estados, históricos de estados e posições.
- **Métodos** para carregar os dados (via fetch dos arquivos JSON).
- **Getters** para obter informações agregadas (ex.: estado atual, detalhes do equipamento, posição mais recente).
- **Ações** para selecionar um equipamento, filtrar e pesquisar.

---

## 6. Boas Práticas de UI/UX e Responsividade

- **Layout Responsivo:**  
  O layout adapta-se a diferentes tamanhos de tela utilizando classes do **Tailwind** como `flex`, `md:` e `lg:`, garantindo que o mapa e as sidebars sejam exibidos adequadamente em **dispositivos móveis**, **tablets** e **desktops**.

- **Interação Intuitiva:**
  - O **mapa** é o elemento central, enquanto os **filtros** e a **sidebar** são acessíveis e interativos.
  - **Transições suaves** (com `<transition>` e classes de CSS customizadas) melhoram a experiência de abrir e fechar a sidebar.
  - **Feedback visual** (hover, focus) é aplicado a botões e elementos interativos para uma experiência consistente.

- **Acessibilidade:**
  Utilização de tags semânticas como: `<nav>`, `<main>`, `<aside>`, `<section>`, `<footer>`.

- **Performance:**
  - Uso de **debounce** na search bar para reduzir chamadas desnecessárias.
  - Carregamento **assíncrono** dos dados com **Promises** e `await`.

---

## 7. Testes

### 7.1. Testes Unitários
Utilização do **Vitest** para testar funções essenciais em **equipmentStore.js** e a exibição dos dados através do **MapComponent.vue**, garantindo a precisão do funcionamento da **store** e do **mapa**.

### 7.2. Testes End-to-End
Testes E2E com **Cypress** verificam os fluxos principais:
- Exibição do **mapa** e dos **filtros**.
- Funcionamento da **search bar** com sugestões dinâmicas.
- Interação com **markers** e abertura da **sidebar de detalhes**.
- Visualização do **histórico de estados** e posições.

---

## 8. Possíveis Melhorias Futuras

- **Integração com APIs Reais:**  
  Atualmente, os dados são carregados de arquivos **JSON**. Uma evolução seria integrar com **APIs REST** para dados em tempo real.

- **Melhoria dos Gráficos e Visualizações:**  
  Incorporar **gráficos** (ex.: **D3.js**, **Chart.js**) para exibir a evolução dos estados e indicadores de forma visual e interativa.

- **Notificações e Alertas:**  
  Implementar **notificações** para alertar os gestores sobre equipamentos com **produtividade baixa** ou com histórico de **manutenção elevado**.

- **Testes Automatizados:**  
  Expandir a cobertura dos testes unitários e implementar testes E2E, incluindo testes de **acessibilidade** e **desempenho**.

---

## 9. Conclusão

Esta documentação apresenta de forma clara e detalhada a **arquitetura** e as **funcionalidades** do **Dashboard de Monitoramento de Equipamentos**, alinhado às boas práticas de desenvolvimento e aos requisitos do projeto. A aplicação foi desenvolvida com foco em **responsividade**, **interatividade** e **usabilidade**, fornecendo uma ferramenta robusta para a gestão e monitoramento dos equipamentos.

## Demonstração em vídeo

Link: https://drive.google.com/file/d/1OohHBVrBbgeidI7GX0y698l6SLRp0iIf/view?usp=drive_link

---

