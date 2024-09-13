# Equipment Tracker

**Equipment Tracker** é uma aplicação interativa para monitorar e visualizar o status e histórico de equipamentos em um mapa. Utiliza a biblioteca Leaflet para exibir dados geográficos e permite a filtragem e visualização de informações detalhadas sobre cada equipamento.

## Estrutura do Projeto

O projeto é dividido em três arquivos principais:

1. **`index.html`**: Contém a estrutura HTML e os links para os arquivos de estilo e scripts.
2. **`script.js`**: Contém o código JavaScript responsável pela lógica de interação e manipulação de dados.
3. **`style.css`**: Define o estilo e layout da aplicação.

## Decisões de Design

### Interface do Usuário

1. **Header**
   - Exibe o título da aplicação com um fundo degradê quase transparente para um efeito moderno e elegante.

2. **Filtros**
   - Três filtros são disponibilizados: Estado, Modelo e Pesquisa. Estes permitem ao usuário filtrar os dados exibidos no mapa de acordo com suas preferências.

3. **Mapa**
   - O mapa é a peça central da aplicação, exibindo a localização dos equipamentos e suas informações associadas.

### Funcionalidades

1. **Visualização de Equipamentos**
   - Equipamentos são representados por marcadores no mapa.
   - Cada marcador exibe um popup com informações detalhadas sobre o equipamento, incluindo estado atual, ganho total e produtividade.

2. **Histórico de Estados**
   - Disponível através de um botão no popup do marcador. Exibe uma lista de estados do equipamento ao longo do tempo.

3. **Histórico de Posições**
   - Disponível através de um botão adicional no popup do marcador. Mostra o trajeto realizado pelo equipamento no mapa.

4. **Filtros e Pesquisa**
   - Permitem ao usuário ajustar a visualização do mapa de acordo com o estado, modelo e nome do equipamento.

## Instruções de Uso

1. **Abrir a Aplicação**
   - Abra o arquivo `index.html` em um navegador web.

2. **Utilizar os Filtros**
   - Selecione um estado e/ou modelo para filtrar os equipamentos visíveis no mapa.
   - Digite um nome de equipamento na caixa de pesquisa para encontrar equipamentos específicos.

3. **Visualizar Detalhes do Equipamento**
   - Clique em um marcador no mapa para abrir um popup com informações sobre o equipamento.
   - Utilize o botão "Ver Histórico" para visualizar a lista de estados históricos.
   - Utilize o botão "Ver Trajeto" para visualizar o trajeto realizado pelo equipamento no mapa.

## Responsividade

A aplicação foi projetada para ser responsiva e proporcionar uma boa experiência em diferentes dispositivos e tamanhos de tela. As seguintes medidas foram tomadas para garantir a responsividade:

1. **Layout Flexível**
   - O layout da aplicação utiliza flexbox para alinhar e distribuir os filtros e o mapa. Isso garante que a disposição dos elementos se ajuste conforme o tamanho da tela.

2. **Responsividade do Mapa**
   - O mapa é redimensionado automaticamente para preencher o espaço disponível na tela, com altura definida como 80% da altura da janela de visualização (viewport).

3. **Estilos Adaptativos**
   - O CSS inclui regras específicas para garantir que os elementos sejam visualizados corretamente em dispositivos móveis e desktops. As fontes, tamanhos e espaçamentos são ajustados para melhorar a legibilidade e usabilidade em diferentes tamanhos de tela.

