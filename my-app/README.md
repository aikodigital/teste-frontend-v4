# Florestal Dashboard

Este é um projeto de dashboard florestal desenvolvido com [Next.js](https://nextjs.org) utilizando o App Router.

## Índice

- [Instalação](#instalação)
- [Acessibilidade](#acessibilidade)
- [Endpoints](#endpoints)
- [Estrutura do Site](#estrutura-do-site)
- [Recursos Adicionais](#recursos-adicionais)

## Instalação

Para instalar e executar o projeto localmente, siga os passos abaixo:

1. Instale as dependências

    npm install
    # ou
    yarn install
    # ou
    pnpm install

2. Execute o servidor de desenvolvimento

    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev

## Acessibilidade

O site foi desenvolvido com acessibilidade em mente, incluindo:

    - Suporte para leitores de tela.
    - Navegação via tecla Tab.
    - Foco automático em elementos interativos ao pressionar Enter.

## Endpoints

Foram criados três endpoints para facilitar o entendimento do front-end com base nos dados mockados disponibilizados:

    - equipaments: Lista os equipamentos.
    - filterAllStates: Filtra por todos os status.
    - filterMap: Endpoint para busca de latitude e longitude no mapa.

## Estrutura do site

O website contém duas páginas principais:

    - Home: Utiliza searchParams para tornar mais concisa a paginação diante do formulário.
    - Map: Página dinâmica que recebe o id do equipamento para poder localizá-lo.