# 📝 Teste Frontend Aiko

Projeto de um site de controle de operações florestais, visando fornecer informações visuais sobre posições de equipamentos e sua produtividade.

## 📑 Conceitos aplicados:

- Utilização do Vue CLI;
- Diretivas e binds;
- Componentização e estruturação de HTML dinâmico;
- Lifecycle Hooks;
- SPA;
- Responsividade;
- Estruturação de pastas;
- Padrões de commits;
- Estratégias de desenvolvimento assertivo;
- Tratamento de dados;

## 🛠 Ferramentas e linguagens:

- HTML;
- CSS;
- JavaScript;
- Vue 3;
- Vuetify;
- Leaflet;
- VSCode;

## 🤯 Decisões:

- Manter componentes simples e que façam a sua devida função da melhor forma;
- Escolhi o Vue como framework para traballhar por ser o que eu estou mais familiarizado e por sua facilidade de implementação;
- Utilizei a biblioteca do vuetify para agilizar processos de desenvolvimento, além de ser uma biblioteca muito boa;
- Iniciei pelo principal do projeto que era a parte do mapa. Conforme fui desenvolvendo tive ideias para a parte de filtros do mapa;
- Optei por deixar separada a parte de tratamento de dados na pasta util, para deixar apenas o essencial e o visual nas views e componentes;

## 🧱 Especificações dos componentes:

```
CardPrincipal: Componente de card.

- Propriedades - Não obrigatórias:
    - titulo: (String) Especifica um título para o card;
    - cor: (String) Especifica a cor de fundo para o card;
```

```
DataTable: Componente de tabela.

- Propriedades - Obrigatórias:
    - headers: (Array) Especifica os nomes das colunas e seus respectivos valores(key do objeto);
        - Exemplo: [ { text: 'Coluna', align: 'center', key: 'coluna'}];
    - items: (Array) Especifica um array de objetos com os items a serem mostrados na tabela;
- Propriedades - Não obrigatórias:
    - itemsPorPagina: (Number) Especifica a quantidade de items que serão mostrados por página ao iniciar a tabela, com o valor 50 como padrão;
    - height: (String) Especifica a altura da tabela, com o valor padrão de 68vh;
    - search: (String) Especifica o termo de busca da tabela, com o valor padrão null;
    - opcoesPagina: (Array || Function)  Especifica os valores de paginação possíveis;
        - Exemplo: [{ value: 10, title: '10' }]
```

```
SelectField: Campo de seleção.

- Propriedades - Obrigatórias:
    - value(v-model): (String) Especifica o valor selecionado do select;
    - items: (Array || Function) Especifica os items a serem mostrados no select;
    - label: (String) Especifica o titulo do select, com padrão 'Campo';
```

```
VButton: Componente de botão.

- Propriedades - Não obrigatórias:
    - variante: (String) Especifica o modelo do botão, com padrão flat;
    - cor: (String) Especifica a cor para o botão, com padrão primary;
    - loading: (Boolean) Especifica se deve animar o botão com carregamento ou não, com padrão false;
```

```
Diálogos: 
    - DialogoDecidirAcao: Diálogo para selecionar a ação ao clicar no marcador no mapa na tela posições e status;
        - Propriedades - Obrigatórias:
            - show: (Boolean) Especifica se o diálogo deve ser mostrado ou não, com padrão false;
            - estaNoHistorico: (Boolean) Especifica se o mapa está no modo histórico, para modificar as ações possíveis, com padrão false;

    - DialogoDetalhesProdutiividade: Diálogo para mostrar o histórico de status de um equipamento em um determinado dia.
        - Propriedades - Obrigatórias:
            - show: (Boolean) Especifica se o diálogo deve ser mostrado ou não, com padrão false;
            - historico: (Object) Especifica o objeto com um array de items para mostrar na tabela;

    - DialogoStatus: Diálogo para mostrar o histórico de status completo de um determinado equipamento.
        - Propriedades - Obrigatórias:
            - show: (Boolean) Especifica se o diálogo deve ser mostrado ou não, com padrão false;
            - equipamento: (String) Especifica o nome do equipamento para buscar seu histórico de status;
```

## ✅ Funcionalidades:

- Filtrar por modelo de equipamento;
- Filtrar por status do equipamento;
- Filtrar por nome do equipamento(Tela das posições e de produtividade);
- Visualizar histórico de posições no mapa;
- Visualizar histórico completo de status do equipamento;
- Visualizar a produtividade do equipamento em determinado dia(mostrando o tempo parado, em manutenção e operando), bem como o total gerado pelo equipamento;
- Visualizar histórico de status do equipamento em determinado dia;

## 🎬 Vídeo de Demonstração:

[demonstraçãoSistema.webm](https://github.com/user-attachments/assets/f89863c2-184f-489a-a626-950e322e10ff)
