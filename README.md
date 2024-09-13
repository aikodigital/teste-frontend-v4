# Mapa de Operações

Este projeto é uma aplicação web interativa que exibe a localização de diversos equipamentos em um mapa. A aplicação foi construída usando React, Leaflet para mapas, e estilizada com Tailwind CSS. As informações sobre os equipamentos e seus estados são carregadas de arquivos JSON e exibidas em popups interativos no mapa.

## Funcionalidades

- Visualização de equipamentos e suas localizações no mapa.
- Exibição do estado atual de cada equipamento.
- Histórico de estados para cada equipamento, exibido em uma lista expansível no popup.
- Popups responsivos, com rolagem automática para listas de dados grandes.
- Ícones personalizados para cada equipamento, variando conforme o estado.



## Tecnologias Utilizadas

- React: Biblioteca JavaScript para construção de interfaces de usuário.
- Leaflet: Biblioteca JavaScript para visualização de mapas interativos.
- React-Leaflet: Integração do Leaflet com React.
- Tailwind CSS: Framework de CSS para estilização rápida e responsiva.
- Day.js: Biblioteca para manipulação e formatação de datas.
- TypeScript: Adicionado para melhor tipagem de dados e desenvolvimento seguro.

## Estrutura de Dados

O projeto utiliza arquivos JSON para simular a base de dados:

- equipment.json: Contém as informações básicas dos equipamentos (ID, modelo, nome).
- equipmentPositionHistory.json: Contém o histórico de posições dos equipamentos.
- equipmentState.json: Contém os estados dos equipamentos (nome e cor associada).
- equipmentStateHistory.json: Contém o histórico de estados de cada equipamento.

## Uso

Para iniciar o sistema, execute o seguinte comando:

- npm start

Email e senha padrão

  Email = "operacao@example.com";
    Senha = "operacao123";

Isso iniciará a aplicação em modo de desenvolvimento. Abra o seu navegador e acesse [http://localhost:3000](http://localhost:3000) para visualizar o sistema.

## Testes

Este projeto inclui testes automatizados usando a biblioteca Jest. Para executar os testes, utilize o seguinte comando:

- npm test

