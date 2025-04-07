# 🚜 Dashboard de Monitoramento de Equipamentos

Este projeto é uma aplicação web desenvolvida com Vue 3 que permite **visualizar, filtrar e analisar dados de equipamentos em operação**. A interface exibe os equipamentos em um mapa interativo, além de oferecer **gráficos de produtividade**, **informações detalhadas de estado**, e **filtragem avançada** por período, tipo e status.

## Link do Vídeo apresentando o projeto
Link do vídeo: [youtube](https://youtu.be/A6zUrnNvois)

<video src="https://youtu.be/A6zUrnNvois" width="320" height="240" controls></video>

---

## 📦 Tecnologias Utilizadas

| Tecnologia       | Descrição |
|------------------|-----------|
| 🖖 [Vue 3](https://vuejs.org/)         | Framework progressivo para construção de interfaces web. |
| 💃 [Pinia](https://pinia.vuejs.org/)   | Biblioteca de gerenciamento de estado moderna para Vue. |
| 🎨 [Tailwind CSS v4](https://tailwindcss.com/) | Utilitário CSS para estilização rápida e responsiva. |
| 🧹 [ShadCN Vue](https://www.shadcn-vue.com/) | Componentes acessíveis, reutilizáveis e baseados em Tailwind. |
| 🗌 [Vue Leaflet](https://vue-leaflet.netlify.app/) | Biblioteca para exibir mapas interativos usando Leaflet com Vue. |

---

## 🚀 Funcionalidades

- 🗘️ Visualização dos equipamentos em um **mapa interativo** com marcadores personalizados.
- 🧠 **Filtros inteligentes** por tipo de equipamento, status atual e período de atividade.
- ⏱️ Cálculo de **produtividade com base no tempo operando** e em outros estados.
- 📍 Visualização de **trajetória de posições** no mapa ao selecionar o equipamento.
- 📋 Tabela com **dados detalhados dos equipamentos**, produtividade e modelo.
- 🔍 Pesquisa por nome do equipamento.
- 🧾 Exibição de **informações do modelo e estado atual** ao clicar no item.

---

## 🧱 Estrutura da Aplicação

```
src/
├── assets/                # Ícones, imagens e estilos globais
├── components/            # Componentes visuais reutilizáveis (ex: mapa, tabela, gráfico)
├── stores/                # Armazenamento central com Pinia (useEquipmentStore)
├── utils/                 # Funções auxiliares (ex: produtividade, filtro, parsers)
├── views/                 # Páginas principais da aplicação
├── data/                  # Arquivos JSON com dados fictícios (equipment, models, etc)
├── App.vue
└── main.ts
```

---

## 🗺 Decisões Técnicas

- **Vue 3 + Pinia**: Para melhor performance, reatividade e modularização do estado.
- **Tailwind + ShadCN Vue**: Para um design moderno, profissional e responsivo com foco em produtividade.
- **Vue Leaflet**: Solução leve e eficaz para renderizar equipamentos e trajetórias georreferenciadas.
- **Filtragem na Store**: Toda a lógica de filtros é isolada na store, deixando os componentes limpos e focados na UI.
- **Productividade e Ganhos**: Cálculo com base no histórico de estados e nas propriedades do modelo.

---

## 📂 JSONs Simulados

Estão incluídos arquivos JSON em `src/data/` que simulam dados reais de produção:

- `equipment.json`: Informações dos equipamentos.
- `equipmentModel.json`: Detalhes do modelo (nome, tipo, valor/hora por estado).
- `positionHistory.json`: Histórico de posições geográficas.
- `state.json`: Lista de estados disponíveis (ex: Operando, Parado).
- `stateHistory.json`: Histórico dos estados por equipamento ao longo do tempo.

---

## 🧪 Instruções para Rodar Localmente

1. **Clone o projeto**


2. **Instale as dependências**

```bash
npm install
```

3. **Rode o projeto em ambiente de desenvolvimento**

```bash
npm run dev
```

4. Acesse em `http://localhost:5173`

---

## ✍️ Scripts Disponíveis

| Comando          | Descrição                          |
|------------------|------------------------------------|
| `npm run dev`    | Inicia o servidor de desenvolvimento |
| `npm run build`  | Gera a versão de produção          |
| `npm run preview`| Visualiza o build localmente       |
| `npm run lint`   | Analisa o código com ESLint        |

---

## 🧩 To-Do / Melhorias Futuras

- [ ] Gráfico de pizza com tempo percentual em "Operando" por equipamento.
- [ ] Exibir ganhos estimados com base no valor/hora de cada modelo.
- [ ] Exportação de dados como CSV.
- [ ] Tela de login/autenticação.
- [ ] Adição de calendário para navegação por data.

---


---

## 🡩‍💻 Desenvolvido por

**Matheus Simões** — [LinkedIn](https://www.linkedin.com/dinamous) • [GitHub](https://github.com/dinamous) • Desenvolvedor Fullstack

---

> _"A produtividade não depende apenas do tempo, mas do que se faz com ele."_

