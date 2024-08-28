Documentação da Aplicação

VISÃO GERAL
Esta aplicação React é uma plataforma que utiliza mapas interativos para visualizar dados de equipamentos. Os principais componentes incluem o Navbar, o Aside, o Map, e a página Home. A aplicação também faz uso do Context API para gerenciar o estado global.

COMO RODAR O PROJETO
Instalar dependências: npm install
Rodar servidor de desenvolvimento: npm run dev

ESTRUTURA DE COMPONENTES

App.tsx
Componente principal que renderiza a página Home.

Home.tsx
Componente de página que organiza a estrutura da aplicação, incluindo o Navbar, Aside e Map.

Navbar.tsx
Barra de navegação no topo da aplicação, que inclui o logotipo, um campo de busca, e um botão de menu.

Aside.tsx
Componente de barra lateral que pode ser usado para filtros e outras informações adicionais.

Map.tsx
Componente que renderiza o mapa interativo usando react-leaflet. Inclui pontos de dados e históricos de posições. Vantagens de usar Leaflet: Código aberto e gratuito, leve e rápido, extensibilidade, facilidade de uso.

Input.tsx
Componente de entrada (input) usado na Navbar.

EquipmentContext
Contexto para fornecer e gerenciar o estado dos equipamentos globalmente na aplicação.

Data
equipment: Informações sobre equipamentos.
equipmentModel: Informações sobre modelos de equipamentos.
equipmentPositionHistory: Histórico de posições de equipamentos.
equipmentState: Estados dos equipamentos.
equipmentStateHistory: Histórico de estados dos equipamentos.

Types
Os tipos de dados incluem interfaces para Equipamentos, Modelos de Equipamento, Histórico de Posições, Estados e Histórico de Estados.

src
├── assets
│ ├── icons
│ └── img
│
│
├── components
│ ├── Aside
│ │ ├── Aside.tsx
│ │ └── aside.module.css
│ │
│ ├── Card
│ │ ├── Card.tsx
│ │ └── card.module.css
│ │
│ ├── data
│ │ ├── EquipmentList.tsx
│ │ └── EquipmentModel.tsx
│ │ └── EquipmentPositionHistory.tsx
│ │ └── Equipments.tsx
│ │ └── EquipmentState.tsx
│ │ └── EquipmentStateHistory.tsx
│ │
│ ├── filtros
│ │ ├── MenuFilter.tsx
│ │ └── menuFilter.module.css
│ │
│ ├── Map
│ │ ├── Map.tsx
│ │ └── map.module.css
│ │
│ ├── grafico
│ │ ├── Grafico.tsx
│ │ └── grafico.module.css
│ │
│ ├── Input
│ │ ├── Input.tsx
│ │ └── input.module.css
│ │
│ ├── Map
│ │ └── Map.tsx
│ │ └── map.module.css
│ │
│ └── Navbar
│ ├── Navbar.tsx
│ └── navbar.module.css
│
├── context
│ └── EquipmentContext.tsx
│
├── hooks
│ └── useEquipment.ts
│
├── pages
│ └── Home.tsx
│
├── types
│ └── types.ts
│
├── utils
│ └── dataOrganizer.ts
│
├── index.tsx
├── App.tsx
├── index.css
└── App.css
