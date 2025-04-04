# Sistema de Monitoramento de Equipamentos Florestais

Sistema web para monitoramento em tempo real de equipamentos florestais, permitindo visualização de localização, estados e análise de desempenho.

## 🚀 Funcionalidades

- 📍 Visualização de equipamentos em mapa em tempo real
- 📊 Monitoramento de estados operacionais
- 📈 Histórico detalhado de estados
- 💰 Cálculo automático de ganhos/perdas por hora
- 🔍 Sistema de filtro e busca avançada
- 📱 Interface responsiva e intuitiva

## 🛠️ Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/)
- [Google Maps API](https://developers.google.com/maps)
- [Vite](https://vitejs.dev/)

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── EquipmentList.tsx
│   ├── Header.tsx
│   └── Map.tsx
├── data/
│   ├── equipment.json
│   ├── equipmentModel.json
│   ├── equipmentPositionHistory.json
│   ├── equipmentState.json
│   ├── equipmentStateHistory.json
│ 
├── services/
│   ├── equipmentService.ts
│   └── stateService.ts
│   └── states.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## 🚀 Começando

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Chave da API do Google Maps

### Instalação

1. Clone o repositório
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

## 📚 Documentação

### Componentes Principais

#### App.tsx
Componente principal que gerencia o estado global e layout da aplicação.

```typescript
interface State {
  loading: boolean;
  equipments: EquipmentWithDetails[];
  filteredEquipments: EquipmentWithDetails[];
  selectedEquipment: EquipmentWithDetails | null;
}
```

#### Header
Componente de cabeçalho com filtros e busca.

```typescript
interface HeaderProps {
  equipments: EquipmentWithDetails[];
  onFilterChange: (searchText: string) => void;
  onEquipmentSelect: (equipmentId: string) => void;
}
```

#### EquipmentList
Lista de equipamentos com detalhes e histórico.

```typescript
interface EquipmentListProps {
  equipments: EquipmentWithDetails[];
  selectedEquipment: EquipmentWithDetails | null;
  onSelectEquipment: (equipment: EquipmentWithDetails) => void;
}
```

### Interfaces Principais

```typescript
export interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarning[];
}

export interface StateHistory {
  equipmentStateId: string;
  date: string;
}

export interface EquipmentWithDetails extends Equipment {
  currentPosition?: Position;
  currentState?: StateHistory;
  stateHistory?: StateHistory[];
  model?: EquipmentModel;
}
```

### Serviços

#### equipmentService.ts
```typescript
fetchEquipments(): Promise<Equipment[]>
getEquipmentWithDetails(equipment: Equipment): Promise<EquipmentWithDetails>
getLatestPosition(positions: Position[]): Position
```

#### stateService.ts
```typescript
getStateName(stateId: string): string
getStateColor(stateId: string): string
getHourlyEarning(modelId: string, stateId: string): number
```

## 📦 Estrutura dos Dados

### equipment.json
```json
[
  {
    "id": string,
    "equipmentModelId": string,
    "name": string
  }
]
```

### equipmentModel.json
```json
[
  {
    "id": string,
    "name": string,
    "hourlyEarnings": [
      {
        "equipmentStateId": string,
        "value": number
      }
    ]
  }
]
```

## 🔧 Scripts Disponíveis

```bash
npm run dev     # Inicia servidor de desenvolvimento
npm run build   # Gera build de produção
npm run preview # Visualiza build de produção
npm run lint    # Executa verificação de código
```

## 📝 Guia de Desenvolvimento

### Boas Práticas
- Use TypeScript strict mode
- Mantenha componentes pequenos e focados
- Documente alterações significativas
- Siga o padrão de commits convencional
- Teste todas as alterações antes de commit

### Adicionando Novos Recursos
1. Crie/atualize interfaces necessárias
2. Implemente serviços relacionados
3. Crie/atualize componentes
4. Atualize documentação
5. Teste todas as funcionalidades

## 🔐 Considerações de Segurança

- Valide todos os dados de entrada
- Implemente rate limiting
- Use HTTPS em produção
- Mantenha dependências atualizadas
- Implemente logging adequado

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE.md)

## 📧 Contato

- Documentação: [URL da documentação]
- Suporte: [email de suporte]
- Repositório: [URL do repositório]

---
⌨️ com ❤️ por [seu nome] 😊
