# 🌲 Teste Frontend - Aiko

Este projeto é parte do processo seletivo da **Aiko** e tem como objetivo demonstrar habilidades técnicas com React, TypeScript, HTML, CSS, bibliotecas de mapas e boas práticas de desenvolvimento frontend.

## 🚀 Descrição do desafio

A aplicação desenvolvida visa auxiliar gestores de operações florestais a visualizarem, em um mapa interativo, **a localização e o estado de operação de equipamentos** utilizados em campo.

Com base nos dados fornecidos via arquivos JSON, o sistema exibe:

- A posição mais recente de cada equipamento no mapa;
- O estado atual de cada equipamento (Operando, Parado ou Manutenção);
- O histórico de estados ao clicar sobre um equipamento;
- Ícone personalizado por tipo de equipamento;
- Cores e ícones distintos para cada estado, facilitando a leitura visual.

## 🖥️ Tecnologias utilizadas

- React
- TypeScript
- Vite
- Ant Design (equivalente ao Bootstrap, mas desenvolvido especialmente para o React)
- React Leaflet
- Prettier (formatação de código)
- ESLint (padronização e qualidade do código)

## 📦 Instalação e execução

Clone o repositório e instale as dependências:

```
git clone https://github.com/GabrielaSAP/teste-frontend-v4.git
cd teste-frontend-v4
npm install
```

Inicie a aplicação em ambiente de desenvolvimento:

```
npm run dev
```

Acesse em http://localhost:5173

Ou acessar a versão online (deploy no Vercel):
👉 https://aiko-test-by-gabrielasap.vercel.app

## 🎥 Demonstração do projeto

No vídeo a seguir, apresento o processo criativo do projeto, desde os primeiros esboços de layout até a implementação final. Explico as decisões de design e desenvolvimento ao longo do caminho, além de demonstrar o sistema funcionando e comentar cada funcionalidade implementada.

👉 [Assista à demonstração no YouTube](https://youtu.be/b_9DggLwmZ8)


## 🗺️ Funcionalidades implementadas

- ✅ Exibir os equipamentos no mapa com suas **posições mais recentes**
- ✅ Visualizar o **estado atual** de cada equipamento no mapa via **tooltip personalizada**
- ✅ **Histórico de posições** (trajetória) desenhada no mapa
- ✅ Acessar o **histórico de estados e posições** ao clicar em um equipamento
- ✅ Ícones distintos para cada **modelo de equipamento** (Caminhão de Carga, Harvester, Garra Traçadora)
- ✅ Diferenciação visual de estado com **badge colorida** e ícones (cores extraídas dos dados do desafio):

- - 🟢 Operando
- - 🔴 Manutenção
- - 🟠 Parado

## 📁 Estrutura dos dados

Os arquivos `.json` fornecidos foram utilizados como **base de dados**, porém, foi usado de base para criar novos arquivos do tipo **TypeScript** para garantir segurança e clareza na manipulação das informações ao longo da aplicação (além do recurso de tipagem).

## 🧠 Decisões técnicas

- A biblioteca **React Leaflet** foi escolhida por sua leveza e flexibilidade para visualizações geográficas.
- Foi criado uma função `getEquipmentsMerged` localizado na pasta `utils` com o propósito de unificar todos os dados em um único elemento `equipment`, para facilitar a manipulação dos dados.
- O Ant Design foi utilizado para construção de componentes ricos e consistentes, como `Card`, `Badge`, `Tooltip`, `Avatar`, entre outros.
- O projeto foi estruturado em **componentes reutilizáveis** com tipagem explícita via TypeScript.
- Os dados compartilhados entre componentes foram controlados com um estado elevado no componente pai, utilizando `useState`, `useEffect` e `useRef`.

## ✨ Funcionalidades extras a considerar

Ainda não implementadas, mas planejadas:

- 📱 Responsividade
- 📌 Filtro por modelo ou estado
- 🔍 Pesquisa por equipamento
- 📈 Cálculo de produtividade e ganho por equipamento
- 🧪 Testes unitários e acessibilidade
​- 📋​ Segundo modo de visualização (por tabela)

## 📝 Notas da Desenvolvedora

Confesso que me diverti demais implementado as interações com o mapa (nunca havia trabalhado com o Leaflet), que acabei ficando sem tempo de modularizar o CSS do `global.less` para cada componente — assim como mantive o meu terror chamado **style inline** em quase todos os componentes.

Também esqueci de fazer a responsividade básica para funcionar em dispositivos móveis, apesar de já ter planejado (em teoria) o funcionamento no mobile.

## 🤝 Contribuindo

Este projeto foi desenvolvido como parte de um teste técnico e não está aberto para contribuições externas no momento.

## 👤 Desenvolvido por

Gabriela Pestana
💼 [LinkedIn](https://www.linkedin.com/in/gabriela-sa-pestana/) | 💻 [GitHub](https://github.com/GabrielaSAP)
