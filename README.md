# Documentação da Aplicação: Gestão de Equipamentos Florestais

## Descrição Geral
A aplicação "Gestão de Equipamentos Florestais" foi desenvolvida para monitorar equipamentos em uma operação florestal. Os dados coletados incluem a posição geográfica dos equipamentos e o estado de operação, que podem ser "Operando", "Parado" ou "Manutenção". A aplicação permite aos gestores visualizar a localização dos equipamentos em tempo real, bem como acessar o histórico de estados e posições de cada equipamento.

## Decisões Técnicas Tomadas

### Framework
A aplicação foi desenvolvida utilizando **Nuxt 3**, um framework poderoso baseado no **Vue.js**, que facilita a criação de aplicações frontend modernas com uma estrutura de pastas eficiente, renderização do lado do servidor (SSR), e uma ótima performance.

### Bibliotecas e Ferramentas
- **Vuetify**: Para a criação de componentes de UI responsivos e compatíveis com o Material Design.
- **Pinia**: Para o gerenciamento de estado da aplicação de maneira eficiente e simples, substituindo o Vuex.
- **Google Maps API**: Para a exibição do mapa e dos marcadores que representam os equipamentos.
- **Jest**: Para testes unitários, garantindo que os principais componentes e funcionalidades da aplicação sejam testados.

### Estilo e Layout
Optou-se por utilizar **Pug** para simplificar a sintaxe de marcação do HTML e facilitar a leitura dos arquivos `.vue`. Também foi utilizado **SCSS** para personalizar o estilo da aplicação de forma mais eficiente, respeitando as boas práticas de design responsivo.

## Componentes Desenvolvidos

### 1. `Index.vue`
**Responsabilidade**: Página principal que contém o mapa e os filtros para visualização dos equipamentos.

**Descrição**:
- Exibe filtros para filtrar equipamentos por estado ou modelo.
- Renderiza o mapa com marcadores dos equipamentos e atualiza conforme os filtros aplicados.
- Implementa a pesquisa de equipamentos e faz a renderização dos ícones customizados no mapa com base no modelo de equipamento.

**Funcionalidades**:
- Exibe a lista de equipamentos e suas posições mais recentes no mapa.
- Ao clicar em um equipamento, exibe o modal com o histórico de estados do equipamento.
- Exibe a rota percorrida por um equipamento específico ao clicar no marcador.
- Permite a pesquisa por nome de equipamento e a filtragem por estado e modelo.

### 2. `EquipmentHistoryDialog.vue`
**Responsabilidade**: Modal para exibição do histórico de estados de um equipamento.

**Descrição**:
- Exibe uma lista paginada dos estados que o equipamento passou, incluindo data e estado.
- Calcula e exibe a produtividade do equipamento com base nas horas operacionais.
- Exibe o total de ganhos acumulados por um equipamento com base no modelo e estado em que ele se encontrava.

**Funcionalidades**:
- Paginação do histórico de estados.
- Cálculo de produtividade e ganhos.
- Pode ser fechado para retornar à visualização do mapa.

### 3. `main.js`
**Responsabilidade**: Store central da aplicação gerenciada pelo Pinia.

**Descrição**:
- Gerencia o estado global da aplicação, incluindo dados dos equipamentos, posições, estados e históricos.
- Fornece métodos para acessar e manipular os dados da aplicação, como histórico de estados, produtividade e ganhos por equipamento.

**Principais métodos**:
- **loadData**: Carrega os dados iniciais dos arquivos JSON.
- **getEquipmentState**: Retorna o estado atual de um equipamento.
- **getEquipmentProductivity**: Calcula a produtividade de um equipamento.
- **getEquipmentEarnings**: Calcula o ganho total acumulado de um equipamento.
- **getEquipmentPositionHistory**: Retorna o histórico de posições de um equipamento.

## Instruções de Uso

### 1. Instalação do Projeto

Clone o repositório:
```bash
git clone https://github.com/lucaswd21/teste-frontend-v4
cd https://github.com/lucaswd21/teste-frontend-v4

## Instale as dependências:

```bash
npm install --force

## Execute o projeto em modo desenvolvimento:

```bash
npm run dev

Configure as variáveis de ambiente: Certifique-se de que você possui uma chave da API do Google Maps. No arquivo nuxt.config.ts, ajuste o api-key com sua chave do Google Maps.

### 2. Teste

Para rodar os testes unitários com o Jest, use o comando:
```bash
npm run test:unit

Certifique-se de que o Jest está corretamente configurado, e que o Pinia está sendo usado no modo de teste (createTestingPinia).

### 3. Build

Para gerar uma build de produção:
```bash
npm run build

## Funcionalidades Extras

### 1. Pesquisa por Equipamento
Permite ao usuário pesquisar um equipamento pelo nome. A pesquisa é dinâmica, ou seja, enquanto o usuário digita, o mapa é atualizado automaticamente com os resultados filtrados.

### 2. Cálculo de Produtividade
A produtividade de um equipamento é calculada com base nas horas em que ele esteve "Operando" em relação ao tempo total. Esse cálculo é exibido no modal de histórico de estados.

### 3. Cálculo de Ganho por Equipamento
O ganho de um equipamento é calculado com base no tempo em que ele esteve em diferentes estados ("Operando", "Manutenção", "Parado") e no valor que o equipamento gera por hora em cada um desses estados.

### 4. Diferenciação Visual de Equipamentos
Os equipamentos são diferenciados visualmente por meio de ícones personalizados no mapa, com base no modelo de equipamento.

### 5. Histórico de Posições
Ao clicar em um marcador no mapa, a rota percorrida pelo equipamento é exibida com uma linha no mapa, e os marcadores de cada ponto de registro de posição são mostrados no mapa.

---

## Decisões de Design

### Filtros Dinâmicos
Foram implementados filtros de estado e modelo para ajudar os gestores a visualizar os equipamentos de maneira mais segmentada e eficiente.

### Mapas Interativos
A **Google Maps API** foi utilizada para permitir uma interação mais fluida com o mapa, permitindo cliques em marcadores e a visualização de detalhes dos equipamentos diretamente na interface.

### Uso de Pug
Foi utilizado o **Pug** como engine de template para simplificar o HTML, melhorar a legibilidade do código e garantir uma estrutura mais concisa.

### UI Responsiva com Vuetify
Utilizou-se o **Vuetify** para garantir uma UI responsiva e moderna, garantindo boa usabilidade em dispositivos móveis e desktops.

