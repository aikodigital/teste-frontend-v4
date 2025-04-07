# Equipment Dashboard 📊🗺️

Sistema desenvolvido com Vue 3 para visualização de dados de produtividade e ganho de equipamentos em um mapa interativo, com suporte a gráficos dinâmicos e filtros por data.

## 🛠️ Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) – Gerenciamento de estado
- [Vue Router](https://router.vuejs.org/)
- [Chart.js](https://www.chartjs.org/) + [vue-chartjs](https://vue-chartjs.org/)
- [Leaflet](https://leafletjs.com/) – Mapas interativos
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [i18n](https://vue-i18n.intlify.dev/) – Suporte a múltiplos idiomas
- [Flag-icon-css](https://www.npmjs.com/package/flag-icon-css) – Ícones de bandeiras

## ⚙️ Funcionalidades

- Exibição de equipamentos no mapa com ícones e informações detalhadas
- Filtros por datas e estado dos equipamentos
- Histórico de estados com rotas percorridas por equipamento
- Gráficos de produtividade (%) e ganho total (R$) por equipamento
- Interface responsiva e moderna

## 📦 Instalação

git clone https://github.com/VictorAlmeidaSiLva/teste-frontend-v4/tree/teste/victor_augusto_almeida_silva
cd equipment-dashboard

🚀 Execução
npm install
npm run dev
Acesse em: http://localhost:8080

📁 Estrutura de Pastas
bash
Copiar
Editar
src/
├── assets/               # Imagens e estilos
├── components/           # Componentes reutilizáveis
├── i18n/                 # Arquivos de tradução
├── router/               # Configuração das rotas
├── store/                # Pinia stores
├── types/                # Tipagens com TypeScript
├── views/                # Telas principais
└── App.vue / main.ts     # Arquivos principais

🧠 Como Funciona o Gráfico
Cada equipamento tem um histórico de estados.

Estados como "Operando" são considerados produtivos.

A produtividade é calculada com base na proporção de estados produtivos.

O ganho total é somado conforme os valores por hora de cada estado.

Os dados são exibidos em um gráfico combinado (barras + linha).

📌 Futuras Melhorias
Upload de arquivos CSV para importar dados

Dashboard com indicadores principais (KPIs)

Exportação de relatórios

Autenticação de usuários

Filtros mais avançados (por modelo, localização, etc.)

🧑‍💻 Desenvolvedor
Victor Silva – Desenvolvedor Front-End com foco em Vue


Vídeo sobre a aplicação
Vídeo explicativo com a demonstração da solução, decisões técnicas

https://www.youtube.com/watch?v=TOgeI4Bzc7I&feature=youtu.be