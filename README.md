# Teste prático - Desenvolvedor Frontend Aiko

Desafio da Aiko para vaga de Dev Frontend

## Pré-requisitos

- Node.js
- npm

## Instruções

1. Baixe e instale [node.js](https://nodejs.org/en).

2. Crie um arquivo .env na raiz do projeto

3. Adicione as seguintes variaveis:

```
VITE_GOOGLE_MAPS_API_KEY=<Chave da API do Google Maps>
VITE_MAP_ID=<ID do Mapa>
```

4. Abra seu terminal/cmd no diretório do projeto

5. Instale as dependencias

```bash
> npm install
```

6. Rode a aplicação em ambiente de desenvolvomento
```bash
> npm run dev
```

## Scripts

- *dev*: Rodar APP em ambiente de desenvolvimento

```bash
> npm run dev
```

- *build*: Compilar aplicação

```bash
> npm run build
```

- *preview*: Rodar preview da aplicação compilada

```bash
> npm run preview
```

- *lint*: Executa eslint para checagem de código

```bash
> npm run lint
```

## Detalhes técnicos do projeto

Foram utilizados os seguintes pacotes no desenvolvimento do APP:

- **[tailwindcss](https://tailwindcss.com/)**: Para estilização da aplicação e dos componentes.
- **[react-router](https://reactrouter.com/start/data/installation)**: Para a criação de rotas/páginas dentro da aplicação.
- **[zustand](https://zustand-demo.pmnd.rs/)**: Para gerenciamento de estados.
- **[@vis.gl/react-google-maps](http://vis.gl/react-google-maps)**: Para a criação de mapas utilizando a API do Google Maps.
- **[react-bootstrap-icons](https://github.com/ismamz/react-bootstrap-icons#readme)**: Biblioteca de ícones svg.
- **[clsx](https://github.com/lukeed/clsx#readme)**: Utilitário para concatenar e construir *string* para classes de forma condicional.

Além disso, a plicação possui um design responsivo compativel com smartphones.

## Págins

Seguindo os requisitos e alguns extras, foram criadas as seguintes páginas:

- **/**: Página *home* da aplicação. Contém uma tabela com a listagem completa de todos os equipamentos e seus estados mais atuais.
- **/state**: Página com mapa para vizualização das posições mais recentes dos equipamentos com filtros para modelos e estados. O mapa possui marcadores diferentes para cada modelo que, ao serem clicados, exibem um popup com informações do equipamento. Ao clicar no marcados, também é exibido o histórico de estados em uma tabela.
- **/route**: Página com mapa para a visualização das rotas dos equipamentos, marcando os pontos A (Primeira posição salva) e B (Ultima posição salva).