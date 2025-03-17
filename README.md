<div align="center">

  <img 
    height="100"
    src="img/aiko.png"
  />

  <h1>Desafio Aiko</h1>

  <p>Seja bem-vindo(a) ao desafio da Aiko.</p>

  <section>
  <!-- Node -->
  <img src="https://img.shields.io/static/v1?label=NODE&message=22.14.0&color=003184&style=for-the-badge&logo=nodedotjs"/>
  <img src="https://img.shields.io/static/v1?label=PNPM&message=10.4.1&color=003184&style=for-the-badge&logo=pnpm"/>
  <img src="https://img.shields.io/static/v1?label=LICENSE&message=MIT&color=003184&style=for-the-badge"/>
  </section>

</div>

<h2>Pré Requisitos</h2>
<p>
  Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
  <a href="https://nodejs.org/pt/" target="_blank">Node.js</a> e
  <a href="https://pnpm.io/installation" target="_blank">PNPM</a>
</p>

<h2>🛠 Tecnologias</h2>
<section>
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="badge Vite">
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" alt="badge Vue JS">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="badge typescript">
  <img src="https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxt&logoColor=#00DC82" alt="badge Nuxt 3">
</section>

<h2>Como Rodar?</h2>

```bash
# Clone o repositório.
git clone https://github.com/felipebarreto148/teste-frontend-v4.git

# Acesse o frontend
cd teste-frontend-v4

# Instale as dependências do front
pnpm install

# Rode o frontend
pnpm dev

# Acesse a aplicação em seu navegador
http://localhost:3000
```

<h2>Funcionalidades</h2>

- [x] Mostrar os equipamentos no mapa.  
- [x] Permitir filtro pelo nome dos equipamentos.
- [x] Permitir filtro pelo estado atual dos equipamentos.
- [x] Permitir filtro pelo modelo dos equipamentos.
- [x] Mostrar o estado atual do equipamento no mapa.
- [x] Mostrar o histórico de posições do equipamento.
- [x] Mostrar o histórico de estados do equipamento.
- [ ] Mostrar o lucro por equipamento.
- [ ] Mostrar o percentual de produtividade por equipamento.
- [x] Mostrar informações dos equipamentos ao passar o mouse no ícone do mapa.
- [x] Diferenciar os equipamentos no mapa.

<h2>Estrutura</h2>

```
├── assets/          # Estilos globais
├── components/      # Componentes Vue reutilizáveis
├── plugins/         # Plugins Vue/Nuxt (ex: Moment)
├── public/          # Servir os ativos estáticos
├── store/           # Gerenciamento de estado (Pinia)
├── nuxt.config.ts   # Configurações do Nuxt
├── eslint.config.js # Configurações do Lint
└── package.json     # Dependências e scripts
```
