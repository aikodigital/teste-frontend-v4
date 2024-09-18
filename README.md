# Ideias

-Tentei ao máximo cumprir todos requisitos propostos.
-De inicio já decidi que teria duas páginas, uma que seria a Home e outra página que seria os detalhes do equipamento clicado.

-HOME
-MAPA
-Na Home renderizo um mapa que indica onde está cada equipamento na sua última posição, mostrando seu nome, modelo e estado.
-FILTRO
-No canto inferior direito do mapa eu renderizo um botão flutuante, clicando nele abrirá um modal na tela, onde o usuário poderá filtrar os equipamentos no mapa por nome ou modelo. Meu próximo objetivo era criar um filtro por estado também.

-DETAILS
-Na página details é onde mostro todos detalhes do equipamento.
-CARDS
-Criei 3 CARDS, no primeiro mostro o quanto o usuário perdeu pelo equipamento estar parado em todo o tempo, no segundo mostro o quanto o usuário faturou em todo tempo com o equipamento e no terceiro quanto o usuário perdeu pelo equipamento estar em manutenção
-TIMELINE
-Na Timeline mostro todo histório de estado do equipamento, como data/hora e estado. Meu próximo objetivo seria mostrar o quanto o usuário perdeu ou ganhou no tempo que o equipamento ficou no seu respectivo estado.
-MAPA
-Na página Details também mostro um mapa, é nele que mostro todas as posições que o equipamento esteve, fazendo também uma rota por onde ele passou

# ferramentas

-React
-Vite
-Typescript
-Mui material
-leaftlet
-Jest
-react-router-dom

# especificações do código

-Pasta API
-É na pasta API que realizo toda a lógica de manipulação e tratamento dos dados.
-equipments
-É no arquivo equipments que busco todas informações inicias da Home
-equipment
-É no arquivo equipment que busco todas informações para a página Details
-Pasta routes
-É na pasta routes que gerencio as rotas
