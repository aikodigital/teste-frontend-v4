# Map Equipment (map-equipment)

Este projeto demonstra como acessar informações de equipamentos utilizados em uma operação florestal como histórico de posições e estados desses equipamentos. É possível visualizar uma dashboard inicial com algumas informações como status atual de cada equipamento, um somatório total dos equipamentos em cada estados. (TODO: cálculo de produtividade e ganho por equipamento)

Além disso na sidebar contamos com um visualização de Mapa, onde é possível ver a localização mais recente dos equipamentos, sendo que cada círculo contém a cor do status. Ao clicar em um equipamento, é exibido informações sobre nome, modelo, status e date da posição.

Ao clicar no botão de acesso ao histórico dentro do popup ou clicar na tela inicial em um dos cards dos equipamentos é redirecionado para a tela de listagem de histórico, onde é possível ver o histórico de estados de um equipamento. Também é possível, utilizando os filtros, filtrar os dados da tabela, por equipamento ou status (TODO: filtro por modelo)

Clicando em histórico de posições é exibido todas as posições de um equipamento específico, com a ligação dos pontos por onde passou.

TODO: Não implementei a internacionalização da aplicação, visto que é um projeto de teste técnico e para fins de estudo.

## Getting Started 🚀

Antes de executar o projeto, é necessário configurar algumas variáveis de ambiente. Siga os passos abaixo:

1. Dentro da pasta raiz do projeto, se não existie, crie um arquivo chamado `.env` com as seguintes configurações:

```sh
VITE_URL_API='API_URL'
VITE_MAPBOX_API_KEY='MAPBOX_ACCESS_TOKEN'
```

Substitua `MAPBOX_ACCESS_TOKEN` pelo Token de acesso do Mapbox (acesso em https://account.mapbox.com/auth/signin > Tokens > Create a token) para que você consiga consumir todos os recursos de exibição e navegação do mapa. (TODO: API_URL não implementada ainda, pois não foi necessário backend para este projeto até o momento) 

### Requirements 📋

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
