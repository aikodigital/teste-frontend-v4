# Teste Frontend V4

## O Desafio

O desafio consiste em criar uma aplicação web que permita ao cliente monitorar sua frota de equipamentos por meio de uma interface com um mapa. Nele, é possível ver todos os equipamentos cadastrados, assim como informações específicas dos mesmos.

## Acessar a aplicação

A aplicação está hospedada no serviço do Netlify e pode ser encontrada [aqui](https://track-equipment-on-map.netlify.app/).

## Para rodar a aplicação localmente

- Clone o projeto

```
https://github.com/seu-user-aqui/teste-frontend-v4.git
```

![image](https://github.com/user-attachments/assets/9079262d-54d9-4332-bafa-ffe04ad7ad9d)

- Acesse o diretório

```
cd teste-frontend-v4
```

- Instale as dependências

```
npm install
```

- Suba o servidor

```
npm start
```

- Acesse a URL no navegador

Costumeiramente, uma aba nova é aberta no seu navegador padrão.

## Como usar

![image](https://github.com/user-attachments/assets/29ac3532-fbe7-4966-96ba-ccdf220500d2)

### Legenda

Os equipamentos são representados no mapa por meio de ícones e cores.

#### Ícones

- Folha: representa o equipamento do tipo _harvester_.

![image](https://github.com/user-attachments/assets/9c594b45-c125-4974-8961-8450f130c641)

- Trator: representa o equipamento do tipo _garra traçadora_.

![image](https://github.com/user-attachments/assets/5f932136-1418-44a0-b95c-9cca9701f771)

- Caminhão: representa o equipamento do tipo _caminhão de carga_.

![image](https://github.com/user-attachments/assets/03500f54-41a2-44c8-b9c3-2dca365251f9)

#### Cores

As cores representam os três estados possíveis para os equipamentos.

- Operando (verde)
- Parado (amarelo)
- Manutenção (vermelho)

### Interagir com um equipamento

Basta clicar no seu ícone que um pop up será aberto e mostrará as informações básicas do equipamento. [Vídeo](https://www.loom.com/share/243682926d694f20b8dc6752e1f8be09?sid=fed296f9-bc06-4f50-9a5d-dd10d445c30a)

### Ver histórico de estados

Basta clicar no botão e uma área com esses dados surgirá logo abaixo. É possível rolar o botão de rolagem do mouse para ver mais registros. [Vídeo](https://www.loom.com/share/cda2a1c703c440b7bea5241685fa2518?sid=c9eac89b-f99e-495e-9c11-053469b0d294)

### Ver histórico de localizações

Ao clicar no botão, marcadores serão adicionados no mapa, indicando todas as localizações em que este equipamento esteve. Cada ponto é numerado para ser possível identificar a ordem do deslocamento. Clicar em um marcador revela as suas coordenadas. Automaticamente, um pop up com as coordenadas da localização mais recente abrirá. Para removê-los, clique no botão "Resetar" no topo da página. A aplicação não impede que mais de um grupo de localizações seja adicionada no mapa ao mesmo tempo, então é recomendável usar o botão de reset quando desejar conferir as posições de outro equipamento. [Vídeo](https://www.loom.com/share/3ed8b6adb4a44e3c9ace6cf7f71571dc?sid=ad9b4da7-551b-43bb-afe9-01349805b1fc)

### Filtrar equipamentos por modelo ou estado

Para fazer uma visualização com determinado critério, é possível utilizar o filtro no topo da página. Primeiro, é necessário escolher o critério desejado, estado ou modelo, no dropdown da esquerda. O dropdown da direita, então, será populado com as opções disponíveis. Selecionada a opção, o botão que aplica o filtro ficará habilitado para clique. Para desfazer tudo, basta usar o botão de reset ou alterar os critérios do filtro. [Vídeo](https://www.loom.com/share/ecb29506c6a04079a3afe5a8e70d1238?sid=8143178c-af77-42ff-a7bc-b0e29c867b0c)

## Tecnologias e recursos

- [React](https://pt-br.legacy.reactjs.org/)
- [Mantine](https://mantine.dev/)
- [Leaflet](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Tabler Icons](https://tabler.io/icons/)
- [Loom](https://www.loom.com/)
