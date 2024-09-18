# Teste Frontend V4 (Raphael Nunes dos Santos)

## English README
<details>
<summary>Click to expand</summary>

## About

#### This project serves as a practical test for Aiko, as well as a good repo to learn about Vue 3, Nuxt, Pinia and the BFF architecture.

## Requirements

<details>
<summary>Click to expand</summary>
  
* [VSCode IDE](https://code.visualstudio.com/Download)
* [GIT](https://git-scm.com/downloads)
* [Node.JS + NPM](https://nodejs.org/en/download/)
* [PNPM](https://pnpm.io) ```Opcional```

</details>

## Install

<details>
<summary>Click to expand</summary>

* Download and install the required tools;
* On VSCode, open any folder of your preference;
* Open the terminal (Terminal -> New Terminal);
* Clone the project:

> git clone https://github.com/RaphaelNunes10/teste-frontend-v4.git

* Switch branches:

> git checkout 'teste/raphael-nunes-dos-santos'  
OR  
> git switch 'teste/raphael-nunes-dos-santos'  

* Install the dependencies:

\* If you wish to use another pack manager, other than PNPM, delete "pnpm-lock.yaml" before proceeding.  
> pnpm i  
OR  
> npm install  
OR  
> yarn install

* Activate the linter ```Opcional```

\* Don't do this before installing all of the dependencies first or if you wish to publish this project on Netlify, Vercel, etc.

Remove the comments from the code bellow, on "nuxt.config.mjs"

```
hooks: {  
  'build:before': () => {  
    exec('pnpm lint-watch', (err, stdout, stderr) => {  
      if (err) {  
        console.error(`lint-watch error: ${stderr}`)  
        throw err  
      }  
      console.log(stdout)  
    })  
  },  
},  
```

* Start the project in dev mode:

> pnpm dev  
OR  
> npm run dev  
OR  
> yarn dev  

\* The project will open by default on http://localhost:3000/ or http://127.0.0.1:3000/.

</details>
  
## *Overview*

### Tools

| **Tool**                                           | **Info**                                                                                            |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Vue](https://vuejs.org)                           | JavaScript Framework.                                                                               |
| [Nuxt](https://nuxt.com)                           | Vue's Meta-Framework, used for auto-import, directory-based routing and web server.                 |
| [Pinia](https://pinia.vuejs.org)                   | Store used for API consumption and global data sharing.                                             |
| [Nuxt Leaflet](https://leaflet.nuxtjs.org)         | Nuxt module for map components.                                                                     |
| [PrimeVue](https://primevue.org)                   | Component library for layout building.                                                              |
| [UnoCSS](https://unocss.dev)                       | CSS engine with presets for utility classes similar and compatible with Tailwind, resets and icons. |
| [Iconify](https://iconify.design)                  | Icon library used through UnoCSS classes.                                                           |
| [ESLint](https://eslint.org)                       | Linter used to highlight, fix and format the code.                                                  |
| [onchange](https://www.npmjs.com/package/onchange) | Package used to run ESLint on file file save. Runs with any IDE.                                    |

### Tasks Done

* **Equipment positions:** Shows markers on the map with icons for every piece of equipment.
* **Equipment's current state:** It's possible to see the current state of equipments on mouse hover. 
* **Equipment's state history:** Click on the marker to see its state history.

### Extras

* **BFF Architecture:** 'Back-end for Front-end' leveraging Nuxt's server capabilities to fetch and return JSON data through API routes.
* **Markers with icons:** To visually tell apart equipments.
* **Histórico de posições:** A dashed line with markers will appear, informing the date, latitude and longitude as you click on an equipment marker.
* **Highlighting and focussing':** As you click on each marker, they are highlighted and centered on the screen as the drawer opens to inform the state history.
* **State notification:** Non-operational equipments will show a little notification dot above its marker.
* **Centered and bound to world limits:** The map starts centered on the markers (currently hardcoded) and won't display Leaflet's repeating tiles.
* **Auto-lint:** 'ESLint' runs through Nuxt initialization processes and uses 'onchange' to highlight, fix and format files on save, no matter the IDE.

### Extras Left Out

* Filters
* Search
* Equipment productivity info
* Earnings
* Automated tests
* API Docs
* Layout components
* Responsiveness
* Live-APP

</details>

## Introdução

#### Esse projeto se destina à Aiko como teste prático, bem como um repositório de facil acesso para aprender sobre Vue 3, Nuxt, Pinia e arquitetura BFF.

## Requisitos

<details>
<summary>Clique para expandir</summary>
  
* [VSCode IDE](https://code.visualstudio.com/Download)
* [GIT](https://git-scm.com/downloads)
* [Node.JS + NPM](https://nodejs.org/en/download/)
* [PNPM](https://pnpm.io) ```Opcional```

</details>

## Instalação

<details>
<summary>Clique para expandir</summary>

* Baixe e instale as ferramentas requeridas;
* No VSCode, abra uma nova pasta de sua preferência;
* Abra o terminal (Terminal -> Novo Terminal);
* Clone o projeto:

> git clone https://github.com/RaphaelNunes10/teste-frontend-v4.git

* Altere a branch:

> git checkout 'teste/raphael-nunes-dos-santos'  
OU  
> git switch 'teste/raphael-nunes-dos-santos'  

* Instale as dependências:

\* Se preferir utilizar outro gerenciador de pacotes que seja o PNPM, remova o arquivo "pnpm-lock.yaml" antes de prosseguir.  
> pnpm i  
OU  
> npm install  
OU  
> yarn install

* Ative o lint ```Opcional```

\* Não faça isso antes de instalar as dependências e não suba essa alteração se pretender subir o projeto com Netlify, Vercel, etc.

Descomente este trecho de código do arquivo "nuxt.config.mjs"

```
hooks: {  
  'build:before': () => {  
    exec('pnpm lint-watch', (err, stdout, stderr) => {  
      if (err) {  
        console.error(`lint-watch error: ${stderr}`)  
        throw err  
      }  
      console.log(stdout)  
    })  
  },  
},  
```

* Inicie o projeto em modo de desenvolvimento:

> pnpm dev  
OU  
> npm run dev  
OU  
> yarn dev  

\* O projeto abrirá por padrão em http://localhost:3000/ ou http://127.0.0.1:3000/.

OBS.: Se você já tiver um projeto rodando no endereço padrão de *localhost* na porta 3000 o projeto abrirá em uma nova porta, então fique atento no que apareçe no terminal.

</details>
  
## *Overview*

### Ferramentas Utilizadas

| **Ferramenta**                                     | **Utilização**                                                                               |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Vue](https://vuejs.org)                           | Framework JavaScript.                                                                        |
| [Nuxt](https://nuxt.com)                           | Meta-Framework do Vue utilizado para auto-import, rotas baseadas em diretórios e servidor.   |
| [Pinia](https://pinia.vuejs.org)                   | Store utilizada para consumo de APIs e disponibilização do dados de forma global.            |
| [Nuxt Leaflet](https://leaflet.nuxtjs.org)         | Módulo Nuxt para exibição e desenvolvimento de mapas e objetos relacionados.                 |
| [PrimeVue](https://primevue.org)                   | Biblioteca de componentes para facilitar a montagem do layout.                               |
| [UnoCSS](https://unocss.dev)                       | Motor de CSS com presets de classes semelhantes e compatíveis com Tailwind, resets e ícones. |
| [Iconify](https://iconify.design)                  | Biblioteca de ícones utilizados através das classes do UnoCSS.                               |
| [ESLint](https://eslint.org)                       | Linter utilizado para destacar, corrigir e formatar o código.                                |
| [onchange](https://www.npmjs.com/package/onchange) | Pacote utilizado para rodar o ESLint ao salvar arquivos, independentemente da IDE.           |

### Objetivos Alcançados

* **Posições dos equipamentos:** Exibe no mapa os equipamentos em suas posições mais recentes em forma de marcadores com ícones.
* **Estado atual do equipamento:** Possível visualizar o estado mais recente dos equipamentos através de um popup ao passar o mouse sobre os marcadores. 
* **Histórico de estados do equipamento:** Possível visualizar o histórico de estados de um equipamento específico ao clicar sobre seu marcador.

### Extras

* **Arquitetura BFF:** 'Back-end for Front-end' utilizando Nuxt para consumir dados JSON e distribuir através de rotas API.
* **Ícones:** Para distinguir os marcadores de equipamentos.
* **Histórico de posições:** É exibido uma trilha tracejada denotada por marcadores com tooltip informando data, latitude e longitude ao clicar sobre um marcador de equipamento.
* **Destaque e foco:** Marcadores são destacados e focados ao abir a gaveta com o histórico de estados ao clicar sobre os marcadores.
* **Alerta de estado:** Equipamentos não operacionais são sinalizados por um ponto colorido acima de seu marcador.
* **Centralização e delimitação do mapa:** O mapa é centralizado nos marcadores (somente de forma estática/hardcoded) e delimitado de modo a não exibir os azulejos repetidos, como no padrão do Leaflet.
* **Auto-lint:** O 'ESLint' roda através da inicialização do Nuxt e o pacote 'onchange' para destaque, correção e formatação automática ao salvar arquivos, de forma agnóstica à IDE.

### Extras Interessantes Não Implementados

* Filtros
* Pesquisa
* Percentual de Produtividade do equipamento
* Ganho por equipamento
* Testes
* Documentação da API
* Componentes de layout
* Responsividade
* Live-APP


