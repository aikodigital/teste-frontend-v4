# Desafio Frontend: Acompanhamento de Ativos Florestais

Este projeto foi desenvolvido como parte do desafio de frontend, com foco no acompanhamento de ativos florestais. O objetivo principal é fornecer uma plataforma interativa para visualizar e gerenciar ativos utilizados em atividades florestais, exibindo informações de localização e histórico das situações dos ativos em um mapa dinâmico.

# Video do Drive

Assista ao vídeo clicando no link abaixo:

[Video do Projeto](https://drive.google.com/file/d/1s40nJ9ztqiGXFPJBhfktgWyATBbzYJFv/view?usp=drive_link)

[Realizado Deploy](https://testefrontendv4.netlify.app/)


## 🚀 Funcionalidades Implementadas

### Localizações dos Ativos
Utilização da **Google Maps API** para mostrar as localizações mais recentes dos ativos diretamente no mapa.

### Situação Atual do Ativo
Exibição da situação mais recente do ativo, com uma **indicação visual de cores** associadas às situações (ex: "Em Operação", "Parado", "Em Manutenção").

### Histórico de Situações
Ao clicar em um ativo, é possível visualizar o **histórico completo de situações** com a data e a descrição de cada situação, incluindo sua cor associada.

### Cálculo de Desempenho
O desempenho de um ativo é calculado com base nas **horas em operação** versus o total de horas disponíveis. A fórmula utilizada é:

```markdown
Desempenho = (Horas Em Operação / Horas Totais) × 100
```

### Cálculo de Lucro Estimado
O lucro estimado é calculado levando em conta o **tempo gasto** em cada situação do ativo e o **valor gerado por hora** em cada estado.

### Histórico de Localizações
Exibição do **histórico de localizações** de cada ativo no mapa, permitindo que o usuário visualize o caminho percorrido ao longo do tempo.

---

## 🏗️ Organização do Projeto

### Componentes

#### Mapa
Exibe informações detalhadas sobre o ativo selecionado (desempenho, horas trabalhadas, lucro estimado, situação atual) e o mapa com o histórico de localizações.

#### HistoricoLocalizacoes
Apresenta o histórico de situações e localizações de um ativo específico, permitindo fácil navegação pelas mudanças ao longo do tempo.

### Hooks

#### useEstadoDoAtivo
Gerencia o estado geral dos ativos, incluindo os filtros de situação e modelo.

#### useAtivosFiltradosHook
Permite filtrar os ativos por situação (ex: "Em Operação", "Em Manutenção") e modelo (ex: "Modelo X").

### Funções Utilitárias

#### calcularDesempenho
Calcula o desempenho de um ativo com base nas horas em operação e o total de horas disponíveis.

#### calcularLucro
Calcula o lucro do ativo considerando o valor por hora e o tempo gasto em cada situação.

#### buscarDados
Função responsável por buscar os dados dos ativos, incluindo o histórico de localizações e situações.

### Tipos de Dados

#### Ativo
Representa um ativo, contendo informações como nome, modelo, situação atual e histórico de localizações.

#### EstadoDoAtivo
Representa uma situação do ativo, como "Em Operação" ou "Em Manutenção", com a cor associada a essa situação.

#### HistoricoDeLocalizacoes
Contém o histórico de localizações do ativo, com dados de latitude, longitude e datas.

---

## 🔧 Tecnologias Usadas

### React
Biblioteca principal utilizada para construção da interface de usuário, garantindo alta performance e reatividade.

### Google Maps API
Usada para mostrar o mapa e exibir as localizações dos ativos, proporcionando uma visualização precisa e interativa.

### TypeScript
Utilizado para garantir a tipagem forte e evitar erros comuns durante o desenvolvimento, garantindo mais segurança no código.

### CSS
Usado para a estilização e construção da interface, oferecendo uma aparência visual limpa e moderna.

### React Context
Para gerenciar o estado global da aplicação de forma eficiente e modular.

### Biblioteca de Componentes (Bootstrap)
Utilizada para criar uma interface responsiva e de fácil utilização, com componentes prontos e altamente configuráveis.

---

## ⚙️ Como Executar o Projeto

### Instalação das Dependências
Clone o repositório e instale as dependências necessárias:

```bash
git clone <URL_DO_REPOSITÓRIO>
```

### Iniciando o Servidor
Para rodar o projeto no modo de desenvolvimento:

```bash
npm start
```

Abra o aplicativo no seu navegador acessando: [http://localhost:3000](http://localhost:3000).

---

## 📊 Organização dos Dados

Os dados são estruturados em arquivos **JSON**, com a seguinte organização:

### equipment.json
Lista de equipamentos com ID e modelo.

### equipmentState.json
Estados dos equipamentos (ex: "Em Operação", "Em Manutenção").

### equipmentModel.json
Modelos dos equipamentos e seus valores por hora.

### equipmentStateHistory.json
Histórico das mudanças de estados dos ativos.

### equipmentPositionHistory.json
Histórico das localizações (latitude/longitude) dos ativos.

---

## 🛠️ Decisões Técnicas

### Google Maps API
Optei pela **Google Maps API** devido à sua confiabilidade e vasta documentação, o que permite uma integração fácil e eficiente com mapas dinâmicos.

### TypeScript
Escolhi o **TypeScript** para garantir uma maior segurança no código, evitando erros durante o desenvolvimento e garantindo melhor escalabilidade para o projeto.

### React
A biblioteca **React** foi escolhida por ser altamente flexível, eficiente na criação de interfaces interativas e oferecer uma excelente experiência de usuário.

### Componentes Reutilizáveis
A estrutura foi organizada para criar **componentes reutilizáveis**, o que facilita a manutenção do código e futuras expansões.

---

## 🧑‍💻 Funcionalidades Extras

### Filtros
Permite que o usuário filtre os ativos por estado (ex: "Em Operação", "Em Manutenção") e modelo.

### Pesquisa
Função de pesquisa para encontrar um equipamento pelo nome.

### Visualização no Mapa
Equipamentos são exibidos de maneira distinta no mapa, facilitando a visualização e diferenciação entre eles.
