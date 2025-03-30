

## Aiko - Teste Frontend

Aplicação web desenvolvida para a gestão de equipamentos utilizados em operações florestais. A aplicação coleta e exibe dados sobre o histórico de posições e estados dos equipamentos, proporcionando uma visão detalhada com gastoe e performance das operações.

## Funcionalidades


* **Posições dos equipamentos**: Exibe no mapa os equipamentos nas suas posições mais recentes.

* **Estado atual do equipamento**: Estado mais recente dos equipamentos. Exemplo: mostrando no mapa, como um pop-up, mouse hover sobre o equipamento, etc.

* **Histórico de estados do equipamento**: A visualização do histórico de estados de um equipamento específico ao clicar sobre o equipamento.

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

### equipment.json
Contém todos os equipamentos da aplicação.

```JSONC
[
    {
        // Identificador único do equipamento
        "id": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        // Chave estrangeira, utilizada para referenciar de qual modelo é esse equipamento 
        "equipmentModelId": "a3540227-2f0e-4362-9517-92f41dabbfdf",
        // Nome do Equipamento
        "name": "CA-0001"
    },
    // ...
]
```

### equipmentState.json
Contém todos os estados dos equipamentos.

```JSONC
[
    {
        // Identificador único do estado de equipamento
        "id": "0808344c-454b-4c36-89e8-d7687e692d57",
        // Nome do estado
        "name": "Operando",
        // Cor utilizada para representar o estado
        "color": "#2ecc71"
    },
    // ...
]
```

### equipmentModel.json
Contém todos os modelos de equipamento e a informação de qual é o valor por hora do equipamento em cada um dos estados.

```JSONC
[
    {
        // Identificador único do modelo de equipamento
        "id": "a3540227-2f0e-4362-9517-92f41dabbfdf",
        // Nome do modelo de equipamento
        "name": "Caminhão de carga",
        // Valor gerado por hora para cada estado
        "hourlyEarnings": [
            {
                // Chave estrangeira, utilizada para referenciar de qual valor é esse estado
                "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57",
                // Valor gerado por hora nesse estado
                "value": 100
            },
            // ...
        ]
    },
    // ...
]
```

### equipmentStateHistory.json
O histórico de estados por equipamento.

```JSONC
[
    {
        // Chave estrangeira, utilizada para referenciar de qual equipamento são esses estados
        "equipmentId": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        // Histórico de estados do equipamento
        "states": [
            {
                // Data em que o equipamento declarou estar nesse estado
                "date": "2021-02-01T03:00:00.000Z",
                // Chave estrangeira, utilizada para referenciar qual é o estado
                // que o equipamento estava nesse momento
                "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
            },
            // ...
        ]
    },
    // ...
]
```

### equipmentPositionHistory.json
O histórico de posições dos equipamentos.

```JSONC
[
    {
        // Chave estrangeira, utilizada para referenciar de qual equipamento são esses estados
        "equipmentId": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        // Posições do equipamento
        "positions": [
            {   
                // Data em que a posição foi registrada
                "date": "2021-02-01T03:00:00.000Z",
                // Latitude WGS84
                "lat": -19.126536,
                // Longitude WGS84
                "lon": -45.947756
            },
            // ...
        ]
    },
    // ...
]
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