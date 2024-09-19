# Forestry Equipment Tracker

Este projeto é um sistema de rastreamento e monitoramento de equipamentos florestais. Ele utiliza uma interface de mapa interativa para visualizar a posição dos equipamentos em tempo real e exibe informações detalhadas sobre o estado atual e o histórico de cada equipamento.

## Funcionalidades

- **Mapa Interativo**: Mostra a localização atual de cada equipamento florestal.
- **Histórico de Posições**: Visualize a posição anterior de cada equipamento.
- **Estado dos Equipamentos**: Exibe o estado atual de cada equipamento, como "Operando", "Parado", ou "Manutenção".
- **Histórico de Estados**: Consulte o histórico de estados de cada equipamento.
- **Estilo Responsivo**: A interface é totalmente responsiva e funciona bem em diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **Angular**: Frontend da aplicação.
- **Leaflet**: Biblioteca JavaScript para mapas interativos.
- **SCSS**: Estilização personalizada e responsiva.
- **RxJS**: Para o gerenciamento de dados reativos.

## Estrutura dos Dados

Os dados estão localizados na pasta `data/` e são carregados dinamicamente a partir dos seguintes arquivos JSON:

- **equipment.json**: Lista de todos os equipamentos.
- **equipmentModel.json**: Modelos de equipamentos e seus valores por hora.
- **equipmentPositionHistory.json**: Histórico de posições dos equipamentos.
- **equipmentState.json**: Estados possíveis dos equipamentos.
- **equipmentStateHistory.json**: Histórico de estados dos equipamentos.

## Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente:

### Pré-requisitos

Você precisará ter o [Node.js](https://nodejs.org/) instalado em sua máquina para rodar a aplicação.

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
Navegue até o diretório do projeto:

bash
Copy code
cd seu-repositorio
Instale as dependências:

bash
Copy code
npm install
Rode a aplicação:

bash
Copy code
ng serve
Acesse a aplicação no navegador:

arduino
Copy code
http://localhost:4200
