# 🏆 Teste Frontend

![Aiko](app/assets/img/aiko.png)

Essa é o meu resultado para o teste de frontend da Aiko.

#### Video de apresentação do projeto

https://drive.google.com/file/d/1zKJRJxgBNw0-iZHCS1lSBw56LDEASIUS/view?usp=sharing

#### Link do projeto no Vercel

https://teste-frontend-v4-dcm6fsr58-p0sseid0ns-projects.vercel.app/

Neste projeto, desenvolvi uma aplicação utilizando Nuxt 3 (usando em beta a versão 4 para melhor organização do projeto) junto com Typescript. Na estilização optei por usar o Nuxt/UI, que é uma biblioteca de componentes UI para Vue.js, por ser leve, de fácil integração e com uma documentação excelente. Na escolha do mapa preferi usar o Leaflet, por ser um mapa código aberto e leve, com uma API simples de usar, fazendo a integração usando a biblioteca **@nuxtjs/leaflet**.

## Estrutura do projeto

![Estrutura do projeto](app/assets/img/estrutura.png)

- **app/**: Contém os componentes principais da aplicação front end.

  - **components/**: Contém os componentes reutilizáveis da aplicação.
  - **stores/**: Contém os stores do Pinia, que é a biblioteca de gerenciamento de estado do Vue.js.

- **server/**: Contém os arquivos do servidor da aplicação.
  - **api/**: Contém os arquivos de rotas do servidor.
  - **data/**: Contém os arquivos de dados da aplicação.

## Como rodar o projeto

1. Certifique-se de ter o [pnpm](https://pnpm.io/) instalado em sua máquina.
2. No terminal, navegue até o diretório do projeto.
3. Instale as dependências do projeto executando:
   ```bash
   pnpm install
   ```
4. Inicie o servidor de desenvolvimento com o comando:
   ```bash
   pnpm dev
   ```
5. Acesse a aplicação no navegador através do endereço exibido no terminal (geralmente `http://localhost:3000`).
