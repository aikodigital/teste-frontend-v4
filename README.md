# Teste Front-End V4 da Aiko

Aplicação Frontend em React para acompanhamento de estados de veículos da frota.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina/conhecer as seguintes ferramentas:
[Git](https://git-scm.com), [React](https://pt-br.reactjs.org/).

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lint](https://eslint.org/)
- [Leaflet](https://leafletjs.com/)
- [Bootstrap](https://getbootstrap.com/)

### Estrutura de Repositório

Abaixo, segue a descrição das principais pastas e arquivos presentes no repositório:

#### `api/`
- **api.ts**: Centraliza a comunicação com APIs externas. Este arquivo simula a chamada de uma API.

#### `assets/`
Contém as imagens estáticas usadas na aplicação.

#### `components/`
Contém subcomponentes reutilizáveis da aplicação, organizados em pastas:

- **CardList/**: Componente responsável por exibir uma lista de cartões (cards) relacionados aos equipamentos.

- **EquipmentFilters/**: Componente que lida com os filtros usados para organizar e exibir equipamentos com base em critérios específicos de estado e modelo.

- **EquipmentStateHistory/**: Contém componentes e lógica relacionados ao histórico de estados dos equipamentos.

- **Header/**: Esta pasta contém o componente de cabeçalho da aplicaçã.

- **MapComponent/**: Componente responsável por exibir um mapa interativo, mostrando a localização de um ou mais equipamentos.

- **SkeletonPage/**: Componente que atua como uma página de esqueleto para a aplicação, gerenciando seus estados relacionados ao carregamento ou seleção de um equipamento.

#### `contexts/`
- **EquipmentDataContext.tsx**: Arquivo que gerencia o estado global dos dados de equipamentos, permitindo que diferentes componentes compartilhem esses dados através do Context API do React.

#### `data/`
- Pasta reservada para armazenamento de dados estáticos ou funções relacionadas ao tratamento de dados.

#### `pages/`
Contém as principais páginas da aplicação:

- **DetailsPage.tsx**: Página de detalhes, onde informações específicas de um equipamento são exibidas.
- **HomePage.tsx**: Página inicial da aplicação, onde informações gerais são apresentados.

#### `utils/`
- Contém funções utilitárias que podem ser usadas em várias partes da aplicação.


## 🎲 Rodando a aplicação

```bash
# Clone este repositório
$ git clone <git@github.com:VictorHugoMartins/teste-VictorHugoMartins.git>

# Instale as dependências
$ npm install

# Execute o front-end da aplicação
$ npm start

# O servidor front-end iniciará em http://localhost:3000
```

Desenvolvido por Victor Hugo Martins 🦸