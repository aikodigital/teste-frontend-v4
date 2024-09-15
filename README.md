# Teste Frontend V4

![Aiko](img/aiko.png)

## O Desafio

Você é o desenvolvedor frontend de uma empresa que coleta dados de equipamentos utilizados em uma operação florestal. Dentre esses dados estão o histórico de posições e estados desses equipamentos. O estado de um equipamento é utilizado para saber o que o equipamento estava fazendo em um determinado momento, seja *Operando*, *Parado* ou em *Manutenção*. O estado é alterado de acordo com o uso do equipamento na operação, já a posição do equipamento é coletada através do GPS e é enviada e armazenada de tempo em tempo pela aplicação.

O objetivo é, de posse desses dados, desenvolver o frontend de aplicação web que trate e exibida essas informações para os gestores da operação.

# GeoEquip - Sistema de Monitoramento de Equipamentos Florestais

## Visão Geral

GeoEquip é uma aplicação web desenvolvida para monitorar e gerenciar equipamentos utilizados em operações florestais. O sistema permite visualizar a localização dos equipamentos em tempo real, seus estados atuais, histórico de estados e outras informações relevantes.

## Funcionalidades Principais

1. **Mapa Interativo**: Visualização da localização dos equipamentos em um mapa.
2. **Filtros e Pesquisa**: Capacidade de filtrar equipamentos por tipo e estado, além de pesquisar por nome ou modelo.
3. **Detalhes do Equipamento**: Exibição de informações detalhadas sobre cada equipamento ao clicar em seu ícone no mapa.
4. **Histórico de Estados**: Visualização do histórico de estados de cada equipamento.
5. **Legenda Interativa**: Legenda expansível mostrando os tipos de equipamentos e seus estados.

## Tecnologias Utilizadas

- React
- TypeScript
- Material-UI
- Leaflet (para o mapa interativo)
- Vite (para build e desenvolvimento)

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (normalmente vem com Node.js)

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/geoequip.git
   cd geoequip
   ```

2. Instale as dependências:
   ```
   npm install
   ```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173` (ou outra porta, se a 3000 estiver ocupada).

## Estrutura do Projeto

```
src/
  ├── components/
  │   ├── CustomAppBar.tsx
  │   ├── EquipmentMap.tsx
  │   ├── MainLayout.tsx
  │   ├── MapLegend.tsx
  │   ├── SideMenu.tsx
  │   └── StateHistoryModal.tsx
  ├── types/
  │   └── sharedTypes.ts
  ├── utils/
  │   └── dataProcessing.ts
  ├── data/
  │   ├── equipment.json
  │   ├── equipmentModel.json
  │   ├── equipmentPositionHistory.json
  │   ├── equipmentState.json
  │   └── equipmentStateHistory.json
  ├── assets/
  │   ├── tracerClaw.svg
  │   ├── harvester.svg
  │   └── truck.svg
  ├── theme/
  │   └── customTheme.ts
  ├── App.tsx
  └── main.tsx
```

## Componentes Principais

- **EquipmentMap**: Renderiza o mapa com os equipamentos.
- **SideMenu**: Oferece opções de filtro e pesquisa.
- **MapLegend**: Mostra a legenda dos tipos de equipamentos e estados.
- **StateHistoryModal**: Exibe o histórico de estados de um equipamento.

## Personalização

- As cores e estilos podem ser ajustados no arquivo `theme/customTheme.ts`.
- Os ícones dos equipamentos podem ser substituídos na pasta `assets/`.

## Contribuindo

Instruções para contribuir com o projeto...

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE). Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
