
# Aiko Tracker




## Visão Geral

Esta aplicação é uma plataforma de rastreamento de equipamentos florestais desenvolvida com Next.js usando o Pages Router. Ela utiliza TypeScript para garantir tipagem estática, SASS para estilização e @vis.gl/react-google-maps para integração com o Google Maps.


## Stack utilizada

React (next.js), SASS, TypeScript, @vis.gl/react-google-maps 


## Estrutura do Projeto

#### Diretórios e Arquivos Principais

#### /app: Contém as páginas da aplicação. Cada pasta dentro deste diretório representa uma rota.

page.tsx: Página principal (Home) que exibe o mapa.

contato/page.tsx: Página de contato.

sobre/page.tsx: Página sobre.

globals.scss: armazena a estilização.

#### /components: Contém componentes reutilizáveis.

maps.tsx: Componente responsável pela integração com o Google Maps.

footer.tsx: Conteúdo do Footer.

header.tsx: Conteúdo do Header

#### /public: Contém arquivos estáticos como imagens e ícones.
## Rotas

/: Página principal que exibe o mapa com filtros.

/sobre: Página sobre a aplicação

/contato: Página de contato e suporte
## Estilização

A estilização foi baseada em cores frias para manter o aspecto de sistema, foi utilizado tons de verde e marrom para remeter a natureza já que o aplicativo tem relação com operação florestal.

A aplicação foi feita com responsividade para tamanhos de 360px (largura) até 1400px (largura).
Abaixo da resolução de 1024px o layout automaticamente alterna a versão compacta.

## Funcionalidades

- Posições dos equipamentos
- Filtro por Estado e Modelo
- Histórico de estados do equipamento
- Histórico clicável com exibição da posição no mapa
- Mobile e desktop responsivo


## Rodando localmente

Clone o projeto

```bash
  git clone https://link-para-o-projeto
```

Instale as dependências

```bash
  npm install
```

Inicie o projeto

```bash
  npm run dev
```
