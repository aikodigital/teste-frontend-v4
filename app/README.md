# 📝 Case Técnico | Desenvolvedor Frontend - Aiko

Este projeto foi desenvolvido como parte de um case técnico para a empresa **Aiko**. Ele inclui funcionalidades como a visualização de equipamentos em um mapa, cálculo de produtividade com base nos estados dos equipamentos ao longo do tempo, além de uma visualização de timeline para o histórico de estados.

---

## 🛠️ Tecnologias Utilizadas

- **Next.js v14** - Framework React para renderização no lado do servidor e geração de páginas estáticas.
- **React v18** - Biblioteca JavaScript para criação de interfaces de usuário.
- **Leaflet v1.9** - Biblioteca JavaScript open-source para mapas interativos.
- **TailwindCSS** - Framework de utilitários CSS para estilização rápida e eficiente.

---

## 🖥️ Backend com Next.js API

Foi utilizado o **backend do Next.js** para criar rotas de API que fornecem os dados de exemplo, como o **histórico de posições** e **estados dos equipamentos**. A API é responsável por simular a comunicação com um banco de dados, disponibilizando as informações necessárias para o frontend.

As rotas criadas retornam os seguintes dados:
- **/api/equipment**: Lista de equipamentos.
- **/api/equipment/model**: Modelos de equipamentos, contendo ganhos por hora em diferentes estados.
- **/api/equipment/state**: Estados disponíveis para os equipamentos.
- **/api/equipment/state/history**: Histórico de estados dos equipamentos.
- **/api/equipment/position/history**: Histórico de posições dos equipamentos.

---

## 📈 Cálculo de Produtividade

### Descrição:

O cálculo da **produtividade do equipamento** é baseado no tempo em que ele está no estado "Operando" em relação ao total de horas trabalhadas no dia. Foi importante ajustar a lógica para **não considerar horas noturnas** entre os dias, pois acreditamos que o equipamento não opera durante a madrugada.

Essa abordagem foi adotada devido à descrição do teste, que não especificava claramente como calcular o total de horas de trabalho. Portanto, a solução ignora transições de estados que atravessam dias, contabilizando apenas horas dentro de um mesmo dia.

---

## 🕒 Visualização de Timeline do Histórico de Estados

Além da visualização de produtividade, o projeto inclui uma **timeline interativa** para exibir o **histórico de estados** dos equipamentos ao longo do tempo. Isso permite ao usuário visualizar facilmente em que estado o equipamento estava em diferentes momentos do dia.

### Principais Funcionalidades:
- A **timeline** exibe as transições entre diferentes estados (como "Operando", "Manutenção", etc.) de forma clara e cronológica.
- As cores de cada estado são mapeadas para facilitar a identificação visual dos estados ao longo do tempo.

---

## 🚀 Getting Started

### Passos para rodar o projeto localmente:

1. **Instale as dependências**:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. **Execute o projeto**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. **Acesse o projeto no navegador**:

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o projeto em funcionamento.

---

### 🎨 Estilização com TailwindCSS

O projeto faz uso do **TailwindCSS** para garantir uma **estilização rápida** e consistente. A escolha por Tailwind se deu pela sua flexibilidade e rapidez na construção de interfaces de usuário sem a necessidade de escrever CSS repetidamente.

### 🗺️ Mapas Interativos com Leaflet

A biblioteca **Leaflet** foi utilizada para criar mapas interativos que exibem a posição dos equipamentos. Cada equipamento tem sua localização rastreada e apresentada no mapa, proporcionando uma interface visual e dinâmica para os usuários.
