# Map Equipment (map-equipment)

Este projeto demonstra como acessar informações de equipamentos utilizados em uma operação florestal como histórico de posições e estados desses equipamentos. É possíel visualizar uma dashboard inicial com algumas informações como status atual de cada equipamento, um somatório total dos equipamentos em cada estados. (TODO: cálculo de produtividade e ganho por equipamento)

Além disso na sidebar contamos com um visualização de Mapa, onde é possível ver a localização mais recente dos equipamentos, sendo que cada círculo contém a cor do status. Ao clicar em um equipamento, é exibido informações sobre nome, modelo, status e date da posição. (TODO: exibição de todas as posições de um equipamento específico e ligar os pontos)

Ao clicar no botão de acesso ao histórico dentro do popup ou clicar na tela inicial em um dos cards dos equipmaentos é redirecionado para a tela de listagem de histórico, onde é possível ver o histórico de estados de um equipamento. Também é possível, utilizando os filtros, filtrar os dados da tabela, por equipamento ou status (TODO: filtro por modelo)

## Getting Started 🚀

Consumindo dados do JSON e  operações com firebase.

Antes de executar o projeto, é necessário configurar algumas variáveis de ambiente. Siga os passos abaixo:

1. Dentro da pasta raiz do projeto, crie um arquivo chamado `.env` com a seguinte configuração:

```sh
API_MAPBOX=SUA_API_MAPBOX
```

Substitua `SUA_API_MAPBOX` pela API KEY do Mapbox, necessário para exibição correta do mapa e localizações dos equipamentos.

### Requirements 📋

_Node.js._

_Vue.js._

### Run Application 🔧

_Clone the repository._

```sh
git clone -b teste/murilo-leal https://github.com/muriloleal13/map-equipment.git
```

_Install dependencies._

```sh
npm install
```

## Run Test ⚙️

```sh
npm run dev
```

O projeto será executado e estará acessível em `http://localhost:9000`. Certifique-se de que todas as dependências necessárias tenham sido instaladas previamente.

## Autor ✒️

- **Murilo Leal** - [muriloleal13](https://github.com/muriloleal13)

---
