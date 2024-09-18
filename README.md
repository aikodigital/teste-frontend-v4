📍 Aplicação de Monitoramento de Equipamentos
Sumário
📋 Descrição
✨ Funcionalidades
⚙️ Instalação e Configuração
🚀 Instruções de Uso
📁 Estrutura do Projeto
🛠️ Tecnologias Utilizadas


📋 Descrição
Este projeto é uma aplicação de monitoramento de equipamentos que permite rastrear a posição e o estado de equipamentos no Google Maps, além de calcular a produtividade e os ganhos com base no histórico de estados. A interface oferece uma visualização interativa, exibindo detalhes dos equipamentos ao clicar em cada marcador no mapa.

✨ Funcionalidades
Visualização no Mapa: Mostra a localização dos equipamentos no Google Maps com ícones personalizados.
Filtro e Busca: Filtro por estado e modelo de equipamento e busca por nome ou código.
Cálculo de Produtividade: Exibe a produtividade percentual com base nas horas operando.
Cálculo de Ganhos: Calcula e exibe os ganhos acumulados por estado do equipamento.
Histórico e Rotas: Visualização do histórico de estados e rotas percorridas pelos equipamentos.

⚙️ Instalação e Configuração
Pré-requisitos
Node.js (>=12.x)
NPM (ou Yarn)
Chave de API do Google Maps válida

Passos para Instalar e Rodar o Projeto
Clone o repositório:
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

Instale as dependências:
npm install

Adicione sua chave de API do Google Maps:
No arquivo Painel.tsx, substitua YOUR_GOOGLE_MAPS_API_KEY pela sua chave da API do Google Maps.

Inicie o servidor de desenvolvimento:
npm start

Acesse a aplicação no navegador:
URL: http://localhost:3000

🚀 Instruções de Uso
Filtros: Utilize os filtros disponíveis para selecionar equipamentos por estado ou modelo.
Interação no Mapa: Clique nos ícones dos equipamentos no mapa para ver detalhes como:
Nome e modelo do equipamento.
Estado atual e posição.
Produtividade e ganhos acumulados.
Histórico: Clique em "Ver Histórico" para abrir um modal com o histórico de estados.
Rotas: Clique em "Ver Rotas" para visualizar a rota histórica percorrida pelo equipamento.

📁 Estrutura do Projeto
src/
│
├── assets/               # Imagens e ícones dos equipamentos
├── component/            # Componentes reutilizáveis (Filtros, Menu, Modais)
├── data/                 # Dados JSON de equipamentos, estados, e histórico
├── utils/                # Funções utilitárias e interfaces TypeScript
├── Painel.tsx            # Componente principal que contém o mapa
└── App.tsx               # Arquivo de entrada da aplicação

🛠️ Tecnologias Utilizadas
React.js - Biblioteca JavaScript para construção de interfaces de usuário.
@vis.gl/react-google-maps - Biblioteca para integrar Google Maps com React.
Tailwind CSS - Framework CSS para estilização.
TypeScript - Suporte a tipagem estática.
Google Maps API - Para exibir e interagir com o mapa.