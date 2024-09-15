
# Projeto: Sistema de Monitoramento de Equipamentos Florestais
Este projeto consiste em uma aplicação web frontend para monitorar equipamentos utilizados em uma operação florestal. A aplicação foi desenvolvida utilizando Vue.js e Quasar Framework, com o objetivo de exibir e analisar dados relacionados ao estado e à posição dos equipamentos.


## Funcionalidades

### Filtro de Modelo:

- Permite filtrar os equipamentos com base no modelo selecionado.

- Utiliza um componente q-select do Quasar para seleção do modelo.
### Posições dos Equipamentos:

- Exibe os equipamentos nas suas posições mais recentes em um mapa interativo.
- As posições são exibidas através de marcadores no mapa, atualizados conforme os dados mais recentes.
### Estado Atual do Equipamento:

- Mostra o estado mais recente dos equipamentos.
- Exibe informações sobre o estado do equipamento em um pop-up ao clicar ou passar o mouse sobre o marcador no mapa.
### Histórico de Estados:

- Permite visualizar o histórico de estados de um equipamento específico.
- Ao clicar sobre um equipamento, um diálogo exibe o histórico de estados, incluindo informações detalhadas sobre cada estado.


## Stack utilizada

- Vue.js: Framework JavaScript para construção da interface de usuário
- Quasar Framework: Framework para Vue.js que fornece componentes e funcionalidades adicionais.
- Leaflet: Biblioteca para a criação de mapas interativos.


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  yarn quasar dev
```

