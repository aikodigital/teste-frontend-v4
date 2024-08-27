# Teste Frontend V4

![Aiko](img/aiko.png)

## O Desafio

Nesse desafio, foi feita a proposta de desenvolver um frontend para uma aplicação web que trata e exibe informações dos equipamentos em um mapa.

## Requisitos

* **Posições dos equipamentos**: Exibição dos equipamentos no mapa, em suas posições mais recentes.

* **Estado atual do equipamento**: É possível visualizar o estado atual do equipamento ao passar o mouse sobre o "pin" do mapa.

* **Histórico de estados do equipamento**: Também será possivel visualizar o histórico de estados, por meio de um modal e sempre limitando a visualização de 10 em 10 itens, contendo uma função para paginar tais informações.

* **Histórico das Posições Anteriores**: Além do histórico de estados, também é possível acompanhar o histórico de posições anteriores do equipamento.

## Tecnologias Utilizadas

* Vue3
* Bootstrap
* Leaflet
* Axios

## Instalação

Para instalar o projeto, basta clonar o repositório e rodar o comando `npm install` para instalar as dependências.

```sh
git clone
```	

## Execução

Para rodar o projeto, basta rodar o comando `npm run serve`.

```sh
npm run serve
```

## Estrutura do Projeto

```
src/
|- assets/
|- components/
public/
|- data/
|- img/
```