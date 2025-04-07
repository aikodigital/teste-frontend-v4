# 🏆 Teste Frontend - Matheus Carvalho - Documentação da Aplicação de Monitoramento Florestal

![Aiko](img/aiko.png)

Link do vídeo com explicação e mostrando o funcionamento da aplicação: https://youtu.be/17s9jwKcIiI
## Visão Geral do Sistema

### Objetivo principal

A aplicação fornece um painel de monitoramento para equipamentos em operações florestais, permitindo:

- Visualização geográfica dos ativos;
- Acompanhamento do status operacional;
- Análise de produtividade;
- Gestão de manutenções;

## Arquitetura e Tecnologias

### Stack Principal

- Frontend: React 19 com TypeScript;
- Build: Vite - Devido ao descontinuamento do (CRA) optei pelo vite
- Estilização: TailwindCSS
- Mapas: Leaflet + React-Leaflet : Optei pelo Leaflet devido a documentação bem rica e robusta
- Biblioteca de Componentes: shadcn/ui \*
- Biblioteca de Ícones: Lucide-React \*

### shadcn/ui & lucide-react

- Optei por escolher ambas as bibliotecas por familiariadade, já trabalhei com elas antes e ambas tem integração com tailwind, performance otimizada.
- Essas duas bibliotecas se complementam, é a escolha oficial recomandada pelo shadcn.

<hr>

### shadcn/ui

- Customização total - Os componentes são seus, você pode modificar como quiser.
- Performance otimizada – Zero bloat de JavaScript desnecessário.
- Integração perfeita com Tailwind – Estilização rápida e consistente.
- Ao contrário de outras bibliotecas que você precisa instalar todos os componentes dela, com shadcn ao invés de instalar a biblioteca toda você pode instalar somente o componente que vai utilizar, tornando o projeto mais leve, como por exemplo

```sh
  npm i shadcn@2.3.0
npx shadcn add button  # Exemplo: Adiciona apenas o componente "Button"
```

<hr>

- Ao instalar será criado o componente customizável dentro do seu projeto em 'src/components/ui' dentro dessa pasta fica todos os componentes instalados em arquivos '.tsx'

### lucide-react

- Performance leve
- Design harmonioso- Todos os ícones seguem o mesmo estilo
- Escalabilidade perfeita - Vetores nítidos em qualquer tamanho
- Compatível com tailwind - Personalização direta via classes CSS
- Tipagem TypeScript
- Customização simples

## ESLint & Prettier

- ESLint - Configurei o ESLint para ordenar os imports para deixar em ordem para melhorar a legibilidade do código e consistência com todos os arquivos com mesmo padrão.
- O ESLint ordena os imports dessa forma:
- Bibliotecas externas
  (Ex: react, axios, lodash)
- Bibliotecas internas/aliases
  (Ex: @/components, ~/utils)
- Arquivos locais (relativos)
  (Ex: ./Button, ../utils)

- Prettier - Configurei o prettier só para ordenar as classes das estilizações do tailwind, ao salvar ordena sozinho.

## 🚀 Começando

Siga as instruções abaixo para configurar o ambiente de desenvolvimento e rodar o projeto localmente.

### 1. Instale as dependências

```bash
npm install
```

### 2. Rode o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## 📱 Resultados

- Irei seguir o fluxo do teste para ficar mais organizado
- <strong>Posições dos equipamentos Exibir no mapa os equipamentos nas suas posições mais recentes. ✅</strong>
  - (Clique na imagem para ver melhor)
    ![image](https://github.com/user-attachments/assets/860b86c4-a62f-4d78-ae39-3e656370caf0)

<hr>

- <strong>Estado atual do equipamento: Visualizar o estado mais recente dos equipamentos. Exemplo: mostrando no mapa, como um pop-up, mouse hover sobre o equipamento, etc. ✅ </strong>
  - Na imagem abaixo é possível observer o efeito de hover mostrando os dados mais atualizados
  - - Nome do equipamento, Modelo, Estado, Produtividade diária, Última atualização, Latitude e Longitude do posição mais atualizada - (Clique na imagem para ver melhor)
      ![image](https://github.com/user-attachments/assets/32ecabd0-14ef-4994-9056-2bb30b91acc5)

<hr>

- <strong>Histórico de estados do equipamento: Permitir a visualização do histórico de estados de um equipamento específico ao clicar sobre o equipamento. ✅</strong>
  - Já nessa imagem abaixo é possível observar o pop-up ao clicar no Equipamento localizado no mapa
  - Nele é mostrado o histórico de status (ou estados), então é mostrado, A data e hora, latitude e longitude, e o status de 'Operando', 'Manutenção' e 'Parado'
  - (Clique na imagem para ver melhor)
    ![image](https://github.com/user-attachments/assets/ee907d2a-1617-45cd-ad35-eaf28ba0f617)

<hr>

### Como foi feito

- Para criar precisei ler a Documentação do [Leaflet](https://leafletjs.com/index.html) e também a [React Leaflet](https://react-leaflet.js.org) para exibir o mapa na tela em um componente, a própria biblioteca suporte para toda as necessidades que este teste propõe:
- Antes de utilizar as opções que a biblioteca tem, é preciso importar o arquivo principal da biblioteca Leaflet: 'import "leaflet/dist/leaflet.css";' através dela a renderização do mapa se torna possível e correta. Então, onde eu criei o componente do mapa eu precisei importar esse arquivo de CSS.
-

## Componentes da biblioteca React Leaflet

### MapContainer

- Esse componente 'MapContainer' é responsável por criar a instância do Leaflet Map e fornecê-la aos seus componentes filhos, usando um React Context, nele é preciso passar parâmetros nas propriedades 'center' é ele que define as coordenadas iniciais do centro do mapa quando ele é carregado. , 'zoom' para definir o zoom inicial no mapa e scrollWheelZoom' para definir zoom no scroll do mouse.

### Marker

- Esse componente 'Marker' representa um ponto específico no mapa, usado para mostrar a localização de equipamentos, onde eu passei os parâmetros nas propriedades 'position' em position passei a localização (Obtida pelo dados vindo de '/data/equipmentPositionHistory'
  ![image](https://github.com/user-attachments/assets/4ed10e8c-4432-4070-b22a-c80254eeb52c)
- Tratei esses dados e fiz uma logica para obter a posição mais atual e passei no Marker para obter a posição mais atualizada e mostrar no mapa. e 'icon' utilizei essa propriedade para passar icones customizados que importei da biblioteca lucide-react para colocar icons coloridos baseado nos modelos dos equipamentos.

  <hr>

### Popup

- Esse componente 'Popup' já veio pronto da biblioteca, ao colocar ele já abre o popup então dentro dele coloquei o histórico de status, que horas esse equipamento estava em operação, manutenção ou parado criei uma logica no css para mostrar os status baseado nas cores que deve representar cada um que vem nos dados em 'equipmentState.json'. Organizei os dados por ordem cronológica (do mais recente) e adicionei scroll para casos com mais registros, interei sobre cada uma das posições vindas do 'equipmentPositionHIstory.json' e renderizei dentro desse Popup para mostrar a posição dele e quando estava Operando ou Parado ou em Manutenção.

 <hr>
 
### TileLayer
- Esse componente 'TileLayer' é o componente que carrega e exibe as imagens do mapa de fundo, oferecido pela própria documentação.

  <hr>
  
### Tooltip
- Esse componente 'Tooltip' é o efeito hover no pointer no mapa, nele renderizei os dados: Equipamento, Modelo, Estado, Produtividade, Ultima atualização, Latitude e Longitude

  <hr>
  
### useMap
- O'useMap' é instanciado para manipular eventos do mapa, eu usei ele para Ajustar a posição do mapa passando as coordenadas como parâmetro, dessa forma quando chamo ele, ele direciona o mapa para os equipamentos no mapa ![image](https://github.com/user-attachments/assets/d58ec9f0-3639-428e-a3db-d93aa4b3e2bc) ![image](https://github.com/user-attachments/assets/4f7a05a2-5b53-441b-9e11-af3a5e86a206) Então eu chamo ele logo no inicio do Mapa para sempre o mapa apontar para as posições dos equipamentos.

- Além disso coloquei filtros para mostrar os equipamentos filtrados

- ![image](https://github.com/user-attachments/assets/8a26e558-076d-4ca7-8cf4-8cf0d42407f6)

- - Adicionei um filtro para o nome do equipamento e também para o Status.
  - ![image](https://github.com/user-attachments/assets/8f2f3957-4280-45df-9a58-84b43101433f)

  <hr>

## 🎲 Dados

Os dados que estão na pasta `data/` no formato `json` foram consumidos no compoente do mapa para simular uma api, então usei o axios só para fazer uma simulação de uma requisição a uma api retornando os dados dela, dessa forma
(Clique na imagem para ver melhor)
![image](https://github.com/user-attachments/assets/fe464b31-10af-4597-aa81-fceb5cc97094)

## 📌 Considerações

- Tentei fazer o máximo que consegui, tive um emprevisto pessoal no periodo de desenvolvimento e não tive muito tempo para desenvolver tive algumas dificuldades por isso não consegui implementar todos os requisitos extras, mas o principal eu entreguei.

<h1>Obrigado pela atenção!!</h1>
