# Documentação do Aplicativo de Monitoramento de Equipamentos

## Visão Geral

Este aplicativo foi desenvolvido para exibir informações sobre equipamentos utilizados em uma operação florestal. Ele mostra as posições atuais dos equipamentos em um mapa, permite a visualização do estado mais recente, exibe o histórico de estados e calcula a produtividade e o ganho total dos equipamentos com base em dados fornecidos.

## Requisitos

- **React**: Biblioteca principal para construção da interface de usuário.
- **Leaflet**: Biblioteca para exibir mapas.
- **Material-UI**: Biblioteca de componentes para a interface.
- **TypeScript**: Opcional, mas recomendado para desenvolvimento em tipos.
- **Node.js**: Ambiente de execução para o backend (se necessário).
- **NPM/Yarn**: Gerenciador de pacotes.

## Instalação

1. **Clone o repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o aplicativo**

   ```bash
   npm start
   # ou
   yarn start
   ```

   Isso iniciará o servidor de desenvolvimento e abrirá o aplicativo no seu navegador padrão.

## Estrutura do Projeto

- **src/**: Contém o código-fonte do aplicativo.
  - **components/**: Componentes React utilizados no aplicativo.
  - **data/**: Pasta com arquivos JSON que contêm os dados dos equipamentos.
  - **App.js**: Componente principal que integra todos os dados e componentes.

## Funcionalidades

### 1. Exibição das Posições dos Equipamentos

O mapa exibe as posições mais recentes dos equipamentos. As posições são atualizadas a partir do histórico de posições fornecido no arquivo `equipmentPositionHistory.json`.

### 2. Estado Atual do Equipamento

Ao clicar em um marcador no mapa, um é exibido no seu marcador o estado atual. Junto a isso é mostrado o histórico em um modal.

### 3. Histórico de Estados

Um modal é exibido ao clicar no marcador do equipamento. O modal mostra o histórico de estados, incluindo:
- Data do estado
- Nome do estado
- Duração do estado
- Ganho no estado
- Ganho total
- Percentual de produtividade

### 4. Cálculo de Ganho Total e Percentual de Produtividade

- **Ganho Total**: Calculado com base no valor por hora para cada estado e a duração em cada estado.
- **Percentual de Produtividade**: Calculado como a proporção de horas operando em relação ao total de horas.


## Extensões Futuras

- **Filtros**: Adicionar filtros para visualizar os equipamentos por estado ou modelo.
- **Pesquisa**: Implementar uma funcionalidade de pesquisa para encontrar equipamentos específicos.
- **Histórico de Posições**: Adicionar a capacidade de visualizar o histórico de posições e trajetos dos equipamentos.
