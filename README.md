# Projeto para o teste Frontend V4

![Aiko](img/aiko.png)

## Sobre a realização do projeto e a documentação

Deixo aqui um agradecimento para a Aiko Digital por ter realizado este desafio. Agradeço pela oportunidade de conhecer mais da empresa e dos serviços prestados por meio do projeto apresentado. Quanto ao projeto em si, pensei em usar parte dos conhecimentos requeridos pela vaga, como **Vue 3**, **Typescript** e **integração com API**, além de não ter a intenção de deixar um código muito verboso e/ou extenso. Por isso utilizei o framework **Nuxt 3** como principal tecnologia para o projeto.

No que compete a documentação: pensei em uma documentação mais descritiva e menos técnica, procurando explicar conceitualmente sobre as principais pastas e arquivos do projeto. Por fim, deixo abaixo alguns detalhes sobre minhas escolhas:

* **Vue 3**: Sem dúvida uma ferramenta poderosa no desenvolvimento web. Comparando com React e Angular, ele mantém a simplicidade na codificação e não é tão opinativo quanto a sua forma de uso. Além disso ele tem boa curva de aprendizado e documentação bem completa. Por fim, tenho mais familiaridade com a linguagem, considerando todos os projetos que já desenvolvi.

* **Nuxt 3**: Aproveita o melhor do Vue 3 (como o **composition API**, reatividade e suporte mehorado para o Typescript) e da sua engine **Nitro** (como **SSR**, **roteamento** flexível e **API integrada** para facilidades com backend). Ele ficou mais aprimorado em relação ao Nuxt 2 (**HMR** e compilação mais eficiente) e tem features como os **auto-imports**, um grupo de **hooks** mais robusto e uma convenção de **estrutura de pastas** bem definido para criação das rotas, componentes e outras funcionalidades.

* **Typescript**: Apesar de já ser implementado por causa do Nuxt 3, a **tipagem estástica** garante facilidade na detecção de erros em tempo de compilação, além da segurança, manutenção e consistência do código.

* **Composition API e scoped CSS**: Dei preferência ao padrão `<script setup lang="ts">`, `<template>` e `<style scoped>`. O composition API é mais flexível e moderno do que a abordagem tradicional de cptions API, simplificando o código a medida que avança em complexidade. Não optei por uso do **Tailwind** simplesmente para reduzir a verbosidade usada no template e fazer o melhor uso do scoped CSS, mas acredito que ambas as abordagens seriam válidas.

* **Leaflet**: Ótima ferramenta para a construção de mapas interativos. O Nuxt possui o módulo do **Nuxt Leaflet**, o que facilitou demais a construção do mapa e marcadores, por meio de componentes. Apenas depende de alguns detalhes como limitações ao **client side**, mas nada que não pudesse ser configurado com certa facilidade.

## Funcionalidades

A aplicação desenvolvida é dividida em 4 páginas. A seguintes funcionalidades são descritas abaixo:

* **Layout (header e footer)**: Navegação aplicada a todas as páginas. Links para a aba inicial e mapa dos equipamentos, além dos meus links pessoais. Embora não tenha relevância direta com o desafio, mantive para garantir uma experiência de usuário mínima.

* **Início - Lista de equipamentos**: Possui a lista dos equipamentos com filtros para nome, modelo e estado atual do equipamento. A listagem em si é "clicável" e redireciona para as páginas de detalhes de cada equipamento.

* **Mapa de equipamentos**: Possui os detalhes da localização mais recente de cada equipamento, mantendo os mesmos filtros da página inicial. Sobre os marcadores no mapa é possível ver detalhes gerais de cada equipamento.

* **Detalhes do equipamento**: Possui os detalhes do equipamento, em especial o cálculo dos ganhos e do percentual de produtividade por período. Os filtros de início e fim servem para definir esse período, tanto nas listagem de estados e localizações quanto nos cálculos considerados.

* **Mapa de localizações do equipamento**: Possui o histórico de localizações do equipamento. Mantém os filtros por período para facilitar a visualização da rota do equipamento em curtos períodos.

## Principais pastas e arquivos

### Componentes

Divididos em duas pastas: **App** para componentes aplicáveis a um contexto geral, e **Equipments** para components que tem dependência das informações específicas dos equipamentos.

**Observação**: as pastas dos componentes não são apenas definidas para efeitos de organização, mas também se tornam "prefixos" do nome dos componentes ao fazer o auto-import. **Exemplo**: o componente em `/components/App/Table.vue` é usado como `AppTable` dentro dos templates.

#### App:

* **Header e Footer**: Compõe os componentes encapsulados no layout das páginas.
* **Table**: Tabela que aceita uma tipagem genérica para definir as linhas e colunas da mesma.

#### Equipments:

* **Card**: Possui as informações específicas do equipamento. Ficou separado para segmentar as informações da página em que é usado.
* **ListSearchBar e DateSearchBar**: Compõe os filtros das páginas, separei em dois tipos de filtros por causa dos propósitos distintos de cada um.
* **Map**: Mapa para gerar localizações dos equipamentos. Como eram muitas informações específicas decidi encapsular dentro do contexto de equipamentos.

### Composables

Também possui auto-import e foi usado apenas para definir o estado dos equipamentos. Pela complexidade das informações que seriam persistidas entre os componentes, optei por não usar o **Vuex** ou **Pinia** para gerenciamento de estado global. O hook de `useState()` serviu como uma alternativa nesse caso.

### Pages

Já descrito anteriormente, o sistema de roteamento da aplicação é definido em `/pages`. Procurei manter essa estrutura de páginas pelo propósito de cada uma. Caso tivesse uma página inicial além da página de listar equipamentos, eu teria modificado essa estrutura para deixar a listagem em `/pages/equipments/index.vue`.

### Server API

A rota `/api/equipments` que possui o handler que puxa todas as informações do equipmento de uma vez. Acredito que também pudesse ter separado em pequenas rotas para simular uma API fazendo diferentes requisições como, por exemplo, `/equipaments?page=42` para listar equipamentos por página, `/equipaments/models` para listar modelos e `/equipaments/42` para obter informações do equipamento por id. Mas novamente, pelo argumento de complexidade e volume informações, decidi manter apenas uma única rota.

A ideia foi simular um pouco da integração com o backend, mas não defini nenhuma validação das informações (exemplo: criar **DTOs** para converter os dados em data para a tipagem definida dentro dos componentes, ou verificar se a **response** pudesse retornar erros).

### Utils

Arquivos utilitários que facilitam a lógica usada nas páginas e componentes. Exemplo: dentro de `string.ts` existe a função `generateHashColorHex()` que gera um HEX de cores de acordo com a string passada. Isso facilitou a separação das cores dos equipamentos por modelo dentro do mapa sem precisar "hardcodar" as cores e garantindo maior escalabilidade (caso tivessem mais modelos).

### Outros

* **types**: Definição das tipagens (no contexto dos equipamentos) usadas nos componentes.

* **plugins**: Possui o plugin do **FontAwesomeIcons** para importação de ícones úteis.

* **layout**: Podendo ser usado por meio do `NuxtLayout`, apenas um único layout definido para as páginas.

* **assets**: Possui a imagem do logo e a estilização global das páginas. Um detalhe para a padronização de cores por meio das variáveis globais.

* **data**: Arquivo com as informações que irão servir de base para popular a página. Mantive a posição da pasta na estrutura geral do projeto para garantir que o projeto pudesse recolher essas informações do mesmo meio, podendo inclusive modificar a quantidade de equipamentos, estados, modelos, etc. O projeto irá continuar funcionando do mesmo jeito.

## Considerações finais

A descrição do desafio foi bem feita ao mesmo tempo que deu muita liberdade na criação da interface e das funcionalidade. Por isso acredito que o projeto também me ajudou pessoalmente como desenvolvedor. Só gostaria de destacar os pontos a melhorar no projeto, que notei e gostaria de ter implementado:

* Responsividade completa: embora a página tenha certa responsividade, acredito que possa ter melhorado ainda mais os detalhes para diferentes dispositivos.

* Uma página inicial que fosse uma introdução da aplicação, em vez de ir diretamente para a listagem de equipamentos.

* Bug nos filtros de datas: infelizmente a opção de "limpar" no datepicker dos campos de data gera um bug na aplicação. A solução é relativamente simples (não emitir evento quando o valor do campo for vazio ou inválido), mas deixei dessa forma.

* API de localização: mostrar informações do local em vez apenas do lat/lon. Por exemplo usar o https://nominatim.openstreetmap.org/ para retornar essas informações.

* Melhorias no mapa: Seria interessante ter uma rota entre os pontos do mapa em vez de linhas retas. Embora não tenha pensado diretamente em uma solução para o caso, acredito que seja uma feature bem interessante de implementar.
