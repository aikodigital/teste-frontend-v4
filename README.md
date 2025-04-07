*******TESTE FRONTEND AIKO - Gabriel Alexandre de Aguiar

Documentação do Teste

ESSA DOCUMENTAÇÃO SERÁ DIVIDIA EM DUAS PARTES (script.js e mapa.js)

SCRIPT.JS código responsáveis pelo tratamento de dados:

Variáveis Globais:

local = './data/';

arquivos = ['equipment', 'equipmentModel', 'equipmentPositionHistory', 'equipmentState', 'equipmentStateHistory'];

let dados = {};

local : Define o caminho base onde os arquivos JSON estão armazenados.

arquivos : Lista os nomes dos arquivos JSON que contêm os dados do sistema (equipamentos, modelos, posições, estados e histórico de estados).

dados : Objeto global que armazenará todos os dados processados do sistema após a execução das funções de carregamento e processamento.


2. Carregamento de Dados


Finalidade : Carrega um arquivo JSON específico com base no índice fornecido (cod) na lista arquivos.
Funcionamento :
Constrói a URL completa para o arquivo JSON.
Usa fetch para fazer uma requisição HTTP e retorna os dados em formato JSON.

Retorno : Uma Promise que resolve para os dados JSON do arquivo solicitado.


3. Processamento de Dados
Função processaDados(equipamentos, modelos, posicoes, status, historico_status)

Finalidade : Processa os dados brutos carregados e os organiza em uma estrutura mais acessível e útil para o sistema.
Entrada :
equipamentos: Dados dos equipamentos.
modelos: Dados dos modelos de equipamentos.
posicoes: Dados das posições históricas dos equipamentos.
status: Dados dos estados possíveis dos equipamentos.
historico_status: Histórico de estados dos equipamentos.
Saída : Um objeto dados contendo:

equipamentos: Lista de equipamentos processados.

modelos: Dicionário de modelos.

posicoes: Dicionário de posições históricas por equipamento.

status: Dicionário de estados.

historico_status: Histórico de estados formatado por equipamento.

Processamento Detalhado

Modelos :
Cada modelo é armazenado em dados.modelos com seu nome e ganhos horários (hourlyEarnings).

Status :
Cada estado é armazenado em dados.status com seu nome e cor associada.

Posições :
As posições históricas são organizadas por ID de equipamento.

Histórico de Status :
O histórico de estados é processado para calcular o estado atual (ultimoStatus) e formatar os dados para facilitar o uso posterior.

Equipamentos :
Cada equipamento é associado ao seu modelo, histórico de estados, posições e último status.

4. Cálculo de Produtividade
Função calculaProdutividade()

Finalidade : Calcula métricas de produtividade para cada equipamento com base no histórico de estados.

Funcionalidades :
Horas por Estado :
Calcula o tempo total que cada equipamento passou em cada estado.

Rendimento Diário :
Calcula o valor gerado por dia para cada equipamento com base nos ganhos horários de cada estado.

Eficiência :
Calcula a eficiência operacional diária como uma porcentagem do tempo total operacional.

Ganhos Totais :
Calcula o valor total gerado pelo equipamento ao longo de todo o histórico.

Produtividade Total :
Calcula a produtividade geral como uma porcentagem do tempo operacional em relação ao tempo total.

Funções Auxiliares
adicionaHoras(equipamento, horasPorEstado, dia, estado, horas) :
Adiciona as horas de um estado específico ao rendimento diário e ao total acumulado.
converteHora(hora) :
Converte uma hora no formato "HH:mm" para apenas horas inteiras.


5. Montagem do Modal
Função montaModal()

Finalidade : Cria dinamicamente checkboxes para filtrar os equipamentos por modelo no modal.

Funcionalidades :
Itera sobre os modelos disponíveis em dados.modelos.
Para cada modelo, cria um checkbox e um label associado.
Adiciona um listener (change) ao checkbox para aplicar o filtro no mapa quando alterado.

6. Filtros no Mapa

Filtro por Modelo
O filtro por modelo é implementado no evento change dos checkboxes criados em montaModal. Quando um checkbox é marcado ou desmarcado, o mapa é atualizado para exibir apenas os marcadores correspondentes aos modelos selecionados.

Integração com Outros Filtros
Se houver outros filtros (como por estado), eles devem ser combinados para garantir que ambos sejam aplicados simultaneamente. Isso pode ser feito usando uma função de filtragem combinada que verifica tanto o modelo quanto o estado de cada marcador.

7. Funções de Mapa
Carregamento de Marcadores
Os marcadores são adicionados ao mapa usando a função criarMarcador, que associa propriedades personalizadas (como modelo e estado) a cada marcador.

Filtragem Dinâmica
A filtragem dinâmica é aplicada sempre que um filtro é alterado, garantindo que apenas os marcadores que atendem aos critérios selecionados sejam exibidos.

MAPA.JS Tem como função fazer a estrutuação e montagem do mapa na tela.

1. Configuração do Mapa

var map = L.map('mapa', {
    center: [-19.126536, -45.947756],
    zoom: 10
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

Finalidade : Inicializa o mapa usando a biblioteca Leaflet.

Funcionalidades :
O mapa é centralizado nas coordenadas [-19.126536, -45.947756] com um nível de zoom inicial de 10.
A camada de tiles (imagens do mapa) é carregada do OpenStreetMap.
A atribuição ao OpenStreetMap é incluída para dar crédito aos contribuidores dos dados.

2. Variáveis Globais

let marcadores = [];
const filtroModelos = [];

marcadores : Array global que armazena todos os marcadores adicionados ao mapa. Isso permite manipular os marcadores dinamicamente (ex.: exibir/ocultar).

filtroModelos : Array global que armazena os modelos selecionados para filtragem. (Nota: Este array não é usado no código fornecido, mas pode ser útil para extensões futuras.)

3. Função montaPopUp(equipamento)

Finalidade : Gera uma tabela HTML com informações de produtividade diárias para um equipamento.

Funcionamento :
Pré-processamento :
Organiza o histórico de estados (historico_status) em um Map, onde cada chave é um dia e o valor é uma lista 
de estados ocorridos nesse dia.

Geração do HTML :
Para cada dia, gera uma linha na tabela com as seguintes informações:
Data (dia).

Horário e estado de cada registro (hora e estadoNome).

Valor gerado no dia (valorDia).

Eficiência operacional no dia (eficiencia).

Retorno : Uma string contendo o HTML da tabela formatada.

4. Função carregaItensMapa(equipamentos, mostrarHistoricoCompleto = false)


Finalidade : Carrega marcadores no mapa com base nos equipamentos fornecidos.
Parâmetros :
equipamentos: Lista de equipamentos cujas posições serão exibidas no mapa.

mostrarHistoricoCompleto: Define se o histórico completo de posições deve ser exibido (true) ou apenas a última posição (false).

Funcionamento :
Limpeza de Marcadores :
Remove todos os marcadores existentes no mapa.

Modo Histórico Completo :
Para cada posição histórica, cria um marcador associado ao estado correspondente.

Centraliza o mapa na primeira posição histórica.

Modo Normal :
Cria um único marcador para a última posição de cada equipamento.

5. Função criarMarcador(equipamento, coordenadas, status, isHistorico)

    Finalidade : Cria e adiciona um marcador ao mapa com informações personalizadas.
Funcionamento :
Ícone Personalizado :
Usa L.divIcon para criar um ícone personalizado com informações como nome do equipamento, modelo e estado.

Popup :
Se for um marcador histórico, o popup exibe informações detalhadas sobre o estado naquele momento.

Se for um marcador normal, o popup exibe uma tabela de produtividade e um botão para carregar o histórico.

Propriedades Personalizadas :
Adiciona propriedades como marker.modelo e marker.status para facilitar a filtragem posterior.

Adição ao Mapa :
O marcador é adicionado ao mapa e ao array global marcadores.

6. Função encontrarStatusPorData(historicoStatus, dataPosicao)


Finalidade : Encontra o estado mais próximo antes de uma data específica.
Funcionamento :
Converte as datas do histórico para objetos Date.
Itera sobre o histórico de trás para frente para encontrar o primeiro estado anterior ou igual à data fornecida.

7. Função filtraMapa()

Finalidade : Filtra os marcadores no mapa com base nos estados e modelos selecionados.

Funcionamento :
Obtém os estados e modelos selecionados nos checkboxes.

Itera sobre os marcadores e verifica se eles atendem aos critérios de ambos os filtros.

Exibe ou oculta os marcadores no mapa conforme os filtros.

8. Funções de Modal

Função abreModal()

Finalidade : Abre o modal de seleção de modelos.

Função fechaModal()

Finalidade : Fecha o modal de seleção de modelos.

9. Objeto window.MapManager

Finalidade : Exporta a função carregaItensMapa para uso global, permitindo que ela seja acessada de outros scripts.


**************LISTA DE TESTES *********************

1- Testar se traz os dados corretamente, alterar alguns dados manualmente para verificar se mantém a integridade.

2- Inserir mais dados nos arquivos JSON.

3- Testar os Filtros tanto no histórico quanto no mapa normal.

4- Testar em outras Telas


# 🏆 Teste Frontend

![Aiko](img/aiko.png)

Neste teste serão avaliados seus conhecimentos em Javascript, HTML e CSS, a criatividade e metodologia aplicada no desenvolvimento, a usabilidade e design da aplicação final.

## 🚀 O Desafio

Você é o desenvolvedor frontend de uma empresa que coleta dados de equipamentos utilizados em uma operação florestal. Dentre esses dados estão o histórico de posições e estados desses equipamentos. O estado de um equipamento é utilizado para saber o que o equipamento estava fazendo em um determinado momento, seja *Operando*, *Parado* ou em *Manutenção*. O estado é alterado de acordo com o uso do equipamento na operação, já a posição do equipamento é coletada através do GPS e é enviada e armazenada de tempo em tempo pela aplicação.

Seu objetivo é, de posse desses dados, desenvolver o frontend de aplicação web que trate e exibida essas informações para os gestores da operação.

## 🎯 Requisitos

Esses requisitos são obrigatórios e devem ser desenvolvidos para a entrega do teste.

* **Posições dos equipamentos**: Exibir no mapa os equipamentos nas suas posições mais recentes.

* **Estado atual do equipamento**: Visualizar o estado mais recente dos equipamentos. Exemplo: mostrando no mapa, como um pop-up, mouse hover sobre o equipamento, etc.

* **Histórico de estados do equipamento**: Permitir a visualização do histórico de estados de um equipamento específico ao clicar sobre o equipamento.

## 🎲 Dados

Todos os dados que precisa para desenvolver os requisitos estão na pasta `data/` no formato `json` e são detalhados a seguir.

```sh
data/
|- equipment.json
|- equipmentModel.json
|- equipmentPositionHistory.json
|- equipmentState.json
|- equipmentStateHistory.json
```

### equipment.json
Contém todos os equipamentos da aplicação.

```JSONC
[
    {
        // Identificador único do equipamento
        "id": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        // Chave estrangeira, utilizada para referenciar de qual modelo é esse equipamento 
        "equipmentModelId": "a3540227-2f0e-4362-9517-92f41dabbfdf",
        // Nome do Equipamento
        "name": "CA-0001"
    },
    // ...
]
```

### equipmentState.json
Contém todos os estados dos equipamentos.

```JSONC
[
    {
        // Identificador único do estado de equipamento
        "id": "0808344c-454b-4c36-89e8-d7687e692d57",
        // Nome do estado
        "name": "Operando",
        // Cor utilizada para representar o estado
        "color": "#2ecc71"
    },
    // ...
]
```

### equipmentModel.json
Contém todos os modelos de equipamento e a informação de qual é o valor por hora do equipamento em cada um dos estados.

```JSONC
[
    {
        // Identificador único do modelo de equipamento
        "id": "a3540227-2f0e-4362-9517-92f41dabbfdf",
        // Nome do modelo de equipamento
        "name": "Caminhão de carga",
        // Valor gerado por hora para cada estado
        "hourlyEarnings": [
            {
                // Chave estrangeira, utilizada para referenciar de qual valor é esse estado
                "equipmentStateId": "0808344c-454b-4c36-89e8-d7687e692d57",
                // Valor gerado por hora nesse estado
                "value": 100
            },
            // ...
        ]
    },
    // ...
]
```

### equipmentStateHistory.json
O histórico de estados por equipamento.

```JSONC
[
    {
        // Chave estrangeira, utilizada para referenciar de qual equipamento são esses estados
        "equipmentId": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        // Histórico de estados do equipamento
        "states": [
            {
                // Data em que o equipamento declarou estar nesse estado
                "date": "2021-02-01T03:00:00.000Z",
                // Chave estrangeira, utilizada para referenciar qual é o estado
                // que o equipamento estava nesse momento
                "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
            },
            // ...
        ]
    },
    // ...
]
```

### equipmentPositionHistory.json
O histórico de posições dos equipamentos.

```JSONC
[
    {
        // Chave estrangeira, utilizada para referenciar de qual equipamento são esses estados
        "equipmentId": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        // Posições do equipamento
        "positions": [
            {   
                // Data em que a posição foi registrada
                "date": "2021-02-01T03:00:00.000Z",
                // Latitude WGS84
                "lat": -19.126536,
                // Longitude WGS84
                "lon": -45.947756
            },
            // ...
        ]
    },
    // ...
]
```

## 🛠️ Regras do Teste
### ✅ O que é permitido

* Vue, React e Angular.

* Typescript.

* Bibliotecas de componentes (Element-ui, Vuetify, Bootstrap, etc.)

* Bibliotecas e APIs de Mapas (Leaflet, Openlayers, Google Maps API, etc).

* Template engines (Pug, Ejs, etc).

* Gerenciamento de estado (Vuex, Redux, etc).

* Frameworks CSS (Tailwind, Bulma, Bootstrap, Materialize, etc).

* Pré-processadores CSS (SCSS, SASS, LESS, etc).

* Frameworks baseados em Vue (Nuxt.js, Quasar, etc).

* Qualquer tecnologia complementar as citadas anteriormente são permitidas desde que seu uso seja justificável.

### ❌ O que não é permitido

* Utilizar componentes ou códigos de terceiros que implementem algum dos requisitos.

## 💡 Recomendações

* **Linter**: Desenvolva o projeto utilizando algum padrão de formatação de código.

## 🌟 Extras

Aqui são listados algumas sugestões para você que quer ir além do desafio inicial. Lembrando que você não precisa se limitar a essas sugestões, se tiver pensado em outra funcionalidade que considera relevante ao escopo da aplicação fique à vontade para implementá-la.

* **Filtros**: Filtrar as visualizações por estado atual ou modelo de equipamento.

* **Pesquisa**: Ser possível pesquisar por dados de um equipamento especifico.

* **Percentual de Produtividade do equipamento**: Calcular a produtividade do equipamento, que consiste em uma relação das horas produtivas (em estado "Operando") em relação ao total de horas. Exemplo se um equipamento teve 18 horas operando no dia a formula deve ser `18 / 24 * 100 = 75% de produtividade`.

* **Ganho por equipamento**: Calcular o ganho do equipamento com base no valor recebido por hora informado no Modelo de Equipamento. Exemplo se um modelo de equipamento gera 100 por hora em operando e -20 em manutenção, então se esse equipamento ficou 10 horas em operação e 4 em manutenção ele gerou `10 * 100 + 4 * -20 = 920`.

* **Diferenciar os equipamentos**: Diferenciar visualmente os equipamentos por modelo de equipamento na visualização do mapa.

* **Histórico de posições**: Que seja possível visualizar o histórico de posições de um equipamento, mostrando o trajeto realizado por ele.

* **Testes**: Desenvolva testes que achar necessário para a aplicação, seja testes unitários, testes automatizados, testes de acessibilidade, etc.

* **Documentação**: Gerar uma documentação da aplicação. A documentação pode incluir detalhes sobre as decisões tomadas, especificação dos componentes desenvolvidos, instruções de uso dentre outras informações que achar relevantes.

## Entregas

Para realizar a entrega do teste você deve:

1. Relizar o fork e clonar esse repositório para sua máquina.
2. Crie uma branch com seu nome no seguinte formato:
    - `teste/[NOME]`
    - `[NOME]`: Seu nome.
    - Exemplos: `teste/fulano-da-silva`; `teste/beltrano-primeiro-gomes`.
3. Implemente sua solução e faça commit das alterações.
4. Grave um vídeo explicando sua solução. O vídeo deve:
    - Mostrar a aplicação em funcionamento
    - Explicar as decisões técnicas adotadas
    - Comentar sobre desafios enfrentados e como foram resolvidos
    - O link do vídeo deve estar no Pull Request ou no README.md do projeto (pode ser não listado no YouTube ou um link compartilhável no Google Drive)
5. Crie um Pull Request para este repositório com sua branch.
  
## 📌 Considerações
- Você pode utilizar qualquer tecnologia adicional ou abordagem diferente, desde que justifique sua escolha no README.md.
- A organização, legibilidade e boas práticas no desenvolvimento serão avaliadas, então priorize código limpo, modular e bem documentado.
- Dúvidas? Caso tenha qualquer dúvida sobre o teste, fique à vontade para perguntar!


**📩 Boa sorte! Estamos ansiosos para ver seu código e sua apresentação! 🚀**