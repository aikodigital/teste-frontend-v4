# Teste Frontend V4
Boas vindas ao Frontend V4 da empresa Aiko! Aqui você pode visualizar no mapa onde está seu equipamento florestal. Além disso, também consegue ver o status atual e todo o histórico daquele item.

## Objetivos:

O objetivo do projeto é tratar e exibir os dados de uma operação florestal.

## Para acessar o link da aplicação:
[V4-AIKO-DANIEL] (https://v4-aiko-danieldahers-projects.vercel.app/)

## Como rodar a aplicação no computador:

#### Seu computador precisa de Git (para versionamento do código), Node.js & npm (para executar a aplicação). Clique nos links, caso ainda não tenha instalado algum desses:

 - [ ] [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
 - [ ] [Node.js e npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Agora sim estamos prontos para instalar o projeto.

## Instalando a aplicação:

1. Primeiro, abra um novo terminal e clone o repositório utilizando o comando 
`git clone git@github.com:DanielDaher/teste-frontend-v4.git`

2. Em seguida, digite `cd teste-frontend-v4` para entrar no diretório (pasta) do projeto, que acabou de ser criada.

3. Utilize o comando `git checkout teste/daniel-daher` para acessar a branch com o código correto.

4. Execute `npm install` para instalar as dependências necessárias.

5. Ao término da etapa anterior, rode no terminal `npm start`. Isto pode demorar alguns minutos, aguarde até que o terminal informe que compilou com sucesso. 

6. E agora é só desfrutar do site!


## Funcionalidades da aplicação

Esta aplicação consiste em uma tela que exibe três botões de filtro, um input e um mapa.

O mapa exibe a localização dos equipamentos usados em uma operação florestal. Clicando nos ícones de cada veículo, é possível ver seu status atual ('operando', 'parado' ou 'em manutenção') e o histórico geral.

Ao clicar nos filtros, é possível exibir apenas os equipamentos que, atualmente, possuem o status escolhido. Clicando novamente no mesmo botão, o filtro é desativado e o mapa volta a exibir todos os equipamentos.

O input serve para pesquisar pelos nomes dos veículos ('CA-0002', por exemplo).