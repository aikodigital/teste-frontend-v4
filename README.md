# Monitoramento de Equipamentos Florestais

## Introdução

Esta aplicação monitora equipamentos em uma operação florestal, exibindo suas posições e estados em um mapa interativo e fornecendo insights sobre a produtividade e o histórico de cada equipamento.

## Decisões Tomadas

- **Framework:** Utilizamos React com TypeScript para uma estrutura de código mais robusta e com melhor manutenção.
- **Bibliotecas:**
  - `react-leaflet` para integração com mapas e exibição das posições dos equipamentos.
  - `recharts` para visualização de dados através de gráficos.
- **Estilo e Layout:** Optou-se por um layout flexível com CSS responsivo para garantir uma boa experiência em diferentes dispositivos.

## Estrutura de Arquivos e Componentes

- `components/MapView.tsx`: Renderiza o mapa com as posições dos equipamentos, utilizando react-leaflet.
- `components/Modal.tsx`: Exibe o histórico de estados e posições de um equipamento específico.
- `components/BarChart`: Visualiza a produtividade dos equipamentos em formato gráfico.
- `data/types.ts`: Define os tipos de dados usados na aplicação para garantir a consistência.

## Funcionalidades Implementadas

- **Mapa Interativo:** Exibe as posições dos equipamentos com ícones que representam seu estado atual.
- **Visualização de Histórico:** Mostra o histórico de estados e trajetos de cada equipamento.
- **Gráficos:** Apresenta a produtividade e ganhos dos equipamentos usando gráficos de barras.
- **Filtros e Pesquisa:** Filtra os equipamentos por estado e modelo, além de permitir a busca por nome ou ID.

## Instruções de Uso

- **Instalação:** <br><br>
  Clone o repositório e instale as dependências:

```
git clone [repositório-url]
cd nome-do-projeto
npm install
```

- **Execução:**<br><br>
  Inicie o servidor de desenvolvimento:

```
npm run dev
```
