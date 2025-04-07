# Visualização de histórico de equipamentos 🗺️

Esse projeto foi construído usando React 19, [Typescript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/) and [Vite](https://vite.dev/guide/)

## Teste FrontEnd V4

O projeto consiste no desenvolvimento do frontend de uma aplicação web voltada para a gestão de operações florestais. A aplicação consome dados coletados em campo sobre os equipamentos utilizados na operação, incluindo o histórico de posições (via GPS) e estados operacionais.

O estado de cada equipamento indica sua atividade em um determinado momento, podendo ser categorizado como "Operando", "Parado" ou "Em Manutenção". Essas informações são registradas de acordo com o uso do equipamento durante a operação, enquanto as posições são captadas por GPS e enviadas periodicamente para armazenamento.

O objetivo da aplicação web é tratar esses dados e apresentá-los de forma clara e interativa para os gestores da operação, possibilitando o acompanhamento eficiente das atividades em campo. A interface oferece visualizações como mapas, linhas do tempo e painéis de status, facilitando a análise do desempenho e o apoio à tomada de decisões estratégicas.

- ✅ Posições dos equipamentos: Exibir no mapa os equipamentos nas suas posições mais recentes.
- ✅ Estado atual do equipamento: Visualizar o estado mais recente dos equipamentos. Exemplo: mostrando no mapa, como um pop-up, mouse hover sobre o equipamento, etc.
- ✅ Histórico de estados do equipamento: Permitir a visualização do histórico de estados de um equipamento específico ao clicar sobre o equipamento.

## Frameworks/Bibliotecas 📖

 - React 19 ⚛️
 - Typescript 🆒
 - Vite 6 ⚡
 - Tailwindcss 🖌️
 - Material UI 📘
 - Husky 🐺
 - React Google Maps 🌎

## Requerimentos 🔴

 - Node version 22.X ✅
 - Visual Studio Code 🌐
 - Yarn version 1.22 🐈

### Visual Studio Code Extensions

- Tailwind CSS Intellisense ✍️
- ESLint 🖌️
- Prettier ✏️

### Preview 🛜

- Page: [Aiko Page](https://teste-frontend-v4-iota.vercel.app)

### Vídeo explicação

- [Vídeo](https://drive.google.com/file/d/1KS51Se8t5SjiZ-jHmiafBuBq8N4aIimQ/view?usp=sharing)

## Iniciando projeto 🧑‍💻

### Instalando dependências ⬇️

Digite `yarn` ou `npm i` no terminal para instalar as dependências.

### .env

Sera necessário anexar um .env no projeto passando sua API Key do google maps para a o prop `VITE_GOOGLE_MAPS_API_KEY`.

### Rodando o projeto 🏁

Depois de instalado todas as dependências, digite `yarn dev` ou `npm dev` para rodar o projeto no seu local.