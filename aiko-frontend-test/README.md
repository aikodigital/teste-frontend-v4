# Projeto Aiko

## 1. Instalando Dependências e Executando o Projeto

Primeiro, execute o comando abaixo para instalar as dependências do projeto:

```
npm install
```

Em seguida, inicie a aplicação com o comando:

```
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.


### 3. Sobre a Aplicação


Na tela inicial do projeto, você verá:

- **Um mapa com marcadores posicionados** representando o último estado e posição registrados pelos equipamentos.
- **Um filtro para Estado** (estado do equipamento) e/ou Modelo, acompanhado de um botão de limpar que retorna a aplicação à sua exibição inicial.

### 4. Funcionalidades

- **Interação com Marcadores**: Ao clicar em um marcador, você verá o histórico de estados daquele equipamento. Um card aparecerá mostrando a produtividade e os ganhos do equipamento em destaque.
- **Mostrar Trajetória**: O botão "Mostrar Trajetória" exibirá no mapa todas as posições registradas daquele equipamento. Clicando no ícone de "X" ou no botão de limpar, a visualização retornará ao estado inicial.

## 5. Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando o framework [Next.js](https://nextjs.org/), com o suporte das seguintes bibliotecas:

- [Material UI](https://mui.com/)
- [Leaflet](https://leafletjs.com/)

## 6. Estrutura do Projeto

- **Store**: Na pasta `store`, você encontrará os Slices utilizados pelo Redux e os Selectors que tratam a lógica mais complexa para a manipulação dos dados armazenados.
- **App**: Na pasta `app` estão localizados os componentes, organizados em pastas respectivas para facilitar a localização e manutenção, além do contexto utilizado no projeto.
- **Carregamento do Redux**: O carregamento dos dados via Redux é feito diretamente no arquivo `page.js`. Como o componente `MapDisplay` utiliza esses dados, uma verificação é feita no contexto antes que o componente seja totalmente carregado na aplicação.


