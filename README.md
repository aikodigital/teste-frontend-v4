

## Aiko - Teste Frontend

Aplicação web desenvolvida para a gestão de equipamentos utilizados em operações florestais. A aplicação coleta e exibe dados sobre o histórico de posições e estados dos equipamentos, proporcionando uma visão detalhada com gastoe e performance das operações.

## Funcionalidades


* **Posições dos equipamentos**: Exibe no mapa os equipamentos nas suas posições mais recentes.

* **Estado atual do equipamento**: Estado mais recente dos equipamentos. Exemplo: mostrando no mapa, como um pop-up, mouse hover sobre o equipamento, etc.

* **Histórico de estados do equipamento**: A visualização do histórico de estados de um equipamento específico ao clicar sobre o equipamento, em ordem dos estados mais recentes para os mais antigos.

* **Filtragem de Equipamentos**: Filtros rápidos de equipamentos.

* **Exibição de Dados Detalhados**: Cada equipamento possui uma janela de informações, mostrando o estado atual e histórico de posição.

* **Visualização de performance**: Cada equipamento dentro da janel de informações detalhadas é possível acompanhar dados de performance geral e nos últimos 7 dias. Verificando a produtividade geral e mais recente do equipamento.

* **Visualização de ganhos**: Na mesma janela é possivel visualizar os ganhos que cada equipamento gerou, considerando perdas por hora com base no status e também o próprio ganho do mesmo

* **Visualização de ganhos**: Diferenciação visual de cada modelo e nome de equipamento pelo mapa.

## 🎲 Dados

Todos os dados utilizados para desenvolver os requisitos estão na pasta `data/` no formato `json` e são detalhados a seguir.

```sh
data/
|- equipment.json
|- equipmentModel.json
|- equipmentPositionHistory.json
|- equipmentState.json
|- equipmentStateHistory.json
```

## Tecnologias Implementadas


* **Nuxt 3**
* **Vue 3**
* **Typescript**
* **Vuetify**
* **Google Maps API**
* **Sass**
* **Vite**
* **ESLint**

## Instalação

* **Clone do projeto**
```
git clone https://github.com/Endryush/teste-frontend-v4.git
```
* **Mude para a branch específica do projeto**
```
git checkout teste/endryus-henrique
```

* **Instale as Dependências**
```
npm install
```

* **Configuração da API do Google Maps**
```
cp .env.example .env
``` 

* **Inicie o servidor de desenvolvimento**
```
npm run dev
``` 
* **estrutura do projeto**
```

/components      # Componentes Vue reutilizáveis
/services        # Serviços para interagir com dados
/pages           # Páginas da aplicação
/assets          # Arquivos estáticos como imagens e estilos
/interfaces      # Definições de tipos (TypeScript)
/enums           # Definições de Enums
/data            # Dados estáticos
/mixins          # Mixins reutilizáveis
/utils           # Funções utilitárias
/plugins         # Plugins do Vue
/tests           # Testes configurados

``` 

* **Video do Projeto**