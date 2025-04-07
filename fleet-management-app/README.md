# 🚜 App para Gestão de Frota
Aplicação para gestão de frota desenvolvida como parte do Teste Frontend Aiko.

## Índice

* [🎯 **Proposta**](#-proposta)
* [💻 **Funcionalidades**](#-funcionalidades)
* [🛠️ **Tech Stack**](#️-tech-stack)
* [▶️ **Como Executar a Aplicação**](#️-como-executar-a-aplicação)
* [📝 **Como Executar os Testes**](#-como-executar-os-testes)
* [📝 **Como Executar o ESLint**](#-como-executar-o-eslint)

## 🎯 Proposta

Desenvolver o frontend de aplicação web que trate e exiba em um mapa dados de equipamentos utilizados em uma operação florestal originalmente salvos no formato `json`.

## 💻 Funcionalidades

* **Posições dos equipamentos**: Exibe em um mapa navegável os equipamentos nas suas posições mais recentes. É possível aumentar ou diminuir o zoom através dos botões na lateral superior esquerda da tela ou utilizando o scroll do mouse.

* **Estado atual do equipamento**: Permite a visualização do estado atual do equipamento (*Operando*, *Parado* ou em *Manutenção*) no mapa através da cor do marcador utilizado para a localização do equipamento. O nome do estado é exibido ao realizar o hover sobre o equipamento desejado.

* **Histórico de estados do equipamento**: Exibe o histórico de estados de um equipamento específico ao clicar sobre o equipamento.

* **Versão mobile**: Ao clicar no marcador de posição do equipamento no mapa é possível visualizar o estado atual e o histórico de estados do equipamento.

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

**OBS. 1**: Conforme recomendado pela documentação do React, este projeto utiliza o **Next.js (App Router)**.

**OBS. 2**: Foi utilizada a biblioteca [React Leaflet](https://react-leaflet.js.org/) para possibilitar o uso do [Leaflet](https://leafletjs.com/) (biblioteca JavaScript open-source para trabalhar com mapas em aplicações web e mobile) na aplicação.

## ▶️ Como Executar a Aplicação

No terminal, clone o projeto:
```
git clone https://github.com/raphaellyv/teste-frontend-v4.git
```

Acesse a branch do projeto:
```
git switch teste/raphaelly-valiengo
```

Entre na pasta do projeto:
```
cd teste-frontend-v4/fleet-management-app
```

Instale as dependências:
```
npm install
```

Execute o servidor de desenvolvimento:
```
npm run dev
```

Acesse a aplicação em **http://localhost:3000**.

## 📝 Como Executar os Testes

Execute o comando:
```
npm test
```

## 📝 Como Executar o ESLint

Execute o comando:
```
npm run lint
```