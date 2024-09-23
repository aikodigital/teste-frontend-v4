# Desafio Aiko - Monitoramento de Equipamentos

Este projeto foi desenvolvido com foco em criar uma aplicação para monitoramento de equipamentos. A aplicação permite a visualização detalhada dos equipamentos, incluindo seus estados atuais, histórico de localização e estado, além de proporcionar uma interface de navegação intuitiva e interativa com mapas dinâmicos.

![Apresentação do Aplicativo](./public/screenshots/Movie/Apresentação.gif)

## Funcionalidades

### Visualização de Equipamentos
A aplicação exibe uma lista de equipamentos, mostrando seus estados atuais e permitindo a filtragem por diferentes categorias de estado. Cada equipamento pode ser selecionado para visualizar detalhes adicionais, como o modelo, produtividade e ganhos.

- **Listagem de Equipamentos:** Exibe todos os equipamentos com seus estados atuais.
- **Filtro de Estados:** Filtra os equipamentos por categorias de estado (ex: operando, parado, manutenção).
- **Pesquisa por Nome ou Modelo:** É possível pesquisar um equipamento tanto pelo seu nome quanto pela sua categoria de modelo.

### Histórico de Localização e Estados
Os usuários podem visualizar o histórico de localização dos equipamentos em um mapa interativo, além de acompanhar os estados históricos de cada equipamento.

- **Mapa Interativo:** Mostra o histórico de localizações com traçado de rotas (polylines) entre os pontos registrados.
- **Histórico de Estados:** Exibe a linha do tempo dos estados de cada equipamento, permitindo um acompanhamento detalhado das alterações ao longo do tempo.

### Mapa Dinâmico
A aplicação inclui um mapa dinâmico que exibe em tempo real as posições dos equipamentos. O usuário pode interagir com o mapa para visualizar as posições atuais, além de explorar as rotas percorridas.

- **ultimas posições do equipamento:** Visualiza a localização mais recente dos equipamentos em um mapa interativo.
- **Rotas Percorridas:** Mostra o trajeto dos equipamentos ao longo do tempo com polylines.

### Página do Equipamento 
A aplicação conta com uma página dedicada a mais detalhes sobre o equipamento selecionado. Por meio do ID do equipamento, várias informações sobre ele são coletadas.

- **Detalhes do Equipamento:** Inclui informações detalhadas como modelo, produtividade e ganhos calculados.

### Menu de Navegação
Um menu de navegação facilita o acesso a diferentes partes da aplicação, permitindo uma experiência de usuário fluida e intuitiva.

- **Navegação Simplificada:** Ícones e labels ajudam a identificar rapidamente as diferentes páginas da aplicação.
- **Transições Suaves:** Navegação entre páginas com transições suaves e sem recarregamento da página.

### Responsividade
O projeto conta com uma interface responsiva para todos os tipos de telas, se adaptando ao tamanho da mesma. Para isso foi utilizado a tecnologia Tailwind CSS.


## Tecnologias Utilizadas

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" height="35" alt="typescript logo"  />
  <img width="8" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="35" alt="react logo"  />
  <img width="8" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" height="35" alt="next logo"  />
  <img width="8" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" height="35" alt="java logo"  />
  <img width="8" />
</div>

##

- **React:** Biblioteca principal para construção da interface.
- **Next.js:** Framework para renderização do lado do servidor e geração de páginas estáticas recomendado pela documentação do react.
- **TypeScript:** Superset do JavaScript para tipagem estática, garantindo maior segurança e previsibilidade no código.
- **Tailwind CSS:** Framework de CSS para estilização, permitindo uma customização rápida e responsiva.
- **Shadcn UI:** Conjunto de componentes acessíveis e estilizados, garantindo uma melhor experiência de usuário.
- **Lucide Icons:** Conjunto de ícones utilizados para enriquecer a interface.
- **Leaflet & React-Leaflet:** Bibliotecas para criação de mapas interativos e integração com React.
- **Dynamic Imports:** Para carregamento dinâmico de componentes, melhorando a performance da aplicação ao carregar somente o necessário.

---

## Como Executar o Projeto
Clone o repositório:

```sh
git clone https://github.com/m4rrec0s/teste-frontend-v4/tree/teste/marcos-henrique-araujo
```

Navegue até o diretório do projeto:

```sh
cd teste-frontend-v4
```

Instale as dependências:

```sh
npm install
```

Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

Abra o navegador e acesse:

```arduino
http://localhost:3000
```
