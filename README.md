<p align="center"></p>

<p align="center">
<img width="248px" src="/github_images/aiko.png" />
</p> 
<p align="center" style="font-weight: bold">Projeto Teste Frontend V4</p>

</div>

## Sobre o projeto

<div >
<img style="width: 100%" src="/github_images/cover.jpg" />
</div>

<br/>

A proposta desse projeto foi o desenvolvimento de uma aplicação de gererênciamento de equipamentos utilizados em operações florestais.
A solução visa proporcionar uma interface intuitiva e funcional para o controle e monitoramento de máquinas e equipamentos florestais.

**Objetivos principais**

- Exibir no mapa os equipamentos nas suas posições mais recentes
- Visualizar o estado mais recente dos equipamentos.
- Permitir a visualização do histórico de estados de um equipamento específico ao clicar sobre o equipamento.

### Desenvolvido com

- Angular: Framework para desenvolvimento web _(Versao 18)_
- Leaflet: Api para trabalhar com mapas
- Tailwind: Biblioteca CSS para estilização de páginas
- Flowbite: Biblioteca de componentes baseada em Tailwind
- Lucide: Biblioteca de ícones
- Dayjs: Biblioteca para lidar com datas

### Iniciar o projeto

Siga os passos abaixo para iniciar o projeto

**Pré requisitos**

Clone o projeto em seu dispositivo através do git

```
git clone https://github.com/psbrunosouza/teste-bruno-souza.git
```

**Instação das dependências**

instale todas as dependências necessárias do projeto

```
npm install
```

**Inicialização do projeto**

```
ng serve
// ou
npm run start
```

### Componentes

utilizei no desenvolvimento desse projeto uma estratégia de criação de componentes conhecida como smart-dumb-components. Os "smart" componentes recebem e tratam os dados enquanto os "dumb" componentes se preocupam apenas com a exibição das informações.

```
teste-bruno-souza/
├── src/                      # Código-fonte principal do projeto
│   ├── app/                  # aplicação
│   ├── components/           # Componentes reutilizáveis
│   ├── models/               # Estruturas de dados
│   ├── services/             # Serviços para chamadas de API ou
└── └── styles/               # Arquivos de estilo (CSS/SASS/SCSS)
│
└── public/                   # Recursos da aplicação (Imagens, SVGs, fonts, etc)

```

**Página principal**

Página responsável por apresentar a linha do tempo e o mapa

```html
<app-equipment-tracker></app-equipment-tracker>
```

Componente que apresenta a linha do tempo de estados

```html
<app-equipment-history></app-equipment-history>
```

Componente que apresenta visualmente o mapa

```html
<app-equipment-map></app-equipment-map>
```

**Componentes**

Componente responsável por apresentar visualmente a imagem do equipamento

```html
<app-equipment-bottom></app-equipment-bottom>
```

Responsável pela apresentação visual da navegação dos equipmantos

```html
<app-equipment-card></app-equipment-card>
```

Input para realização do filtro de equipmantos

```html
<app-search></app-search>
```
