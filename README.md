# 🚜 AIKO Tracker

Bem-vindo ao **AIKO Tracker**, uma aplicação web interativa desenvolvida para monitoramento e visualização eficiente de equipamentos no mapa, com recursos analíticos avançados e interações fluidas. Este projeto foi criado como solução técnica para o desafio proposto pela AIKO.

---

## 🌟 Principais Funcionalidades

### 🗺️ **Visualização Interativa no Mapa**
- Utiliza **Mapbox GL JS** para renderizar equipamentos com precisão geográfica.
- Exibe ícones personalizados e interativos que indicam visualmente o estado atual do equipamento:
  - 🟢 Operando
  - 🟡 Parado
  - 🔴 Manutenção
- Permite movimentar, rotacionar e alterar a perspectiva do mapa com interações simples (clique e arraste com o botão direito do mouse).

### 📍 **Informações Detalhadas em Tempo Real**
- Popup completo com informações ao clicar nos equipamentos:
  - **Nome e Modelo** do equipamento
  - **Última data válida** de atualização
  - **Estado atual** claramente destacado com cores distintas
  - **Produtividade** calculada automaticamente
  - **Ganho estimado** no período filtrado
  - Histórico operacional detalhado com scroll

### 🔍 **Filtros Avançados**
- Filtro personalizado com interface moderna:
  - Por **Modelo** (dropdown)
  - Por **Estado** (dropdown)
  - Por **Nome** (campo de busca com autocomplete e sugestões automáticas)
- Intervalo de datas dinâmico com impacto direto na visualização das rotas, produtividade e ganhos.
- Opção de exibir rotas históricas específicas por equipamento.

### 🎚️ **Toggle Visual e Responsividade**
- Ícone elegante que permite ocultar/mostrar os filtros facilmente, proporcionando uma experiência limpa e imersiva.

---

## 🛠️ Stack Tecnológico

| Tecnologia        | Descrição e Motivação                                                   |
| ----------------- | ----------------------------------------------------------------------- |
| ⚛️ **React**      | Interfaces modernas, responsivas e altamente dinâmicas.                 |
| 🔷 **TypeScript** | Segurança e clareza na tipagem e organização do projeto.                |
| 🗺️ **Mapbox GL** | Visualização geográfica interativa e desempenho excelente em tempo real.|
| 🎨 **CSS Puro**   | Flexibilidade e rapidez na estilização sem overhead adicional.          |

---

## 🗃️ Estrutura do Projeto

```
src/
├── assets/
├── components/ (componentes React reutilizáveis)
├── services/ (fetching e lógica de negócios)
├── styles/ (CSS customizado)
├── types/ (tipagens centralizadas e organizadas)
└── App.tsx (componente principal)
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos:
- Node.js (versão 18+ recomendada)
- npm ou yarn instalados

### Instalação e execução:
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/aiko-tracker.git

# Instale as dependências
npm install

# Inicie o servidor local
npm run dev
```

Acesse `http://localhost:5173` no navegador para visualizar o projeto.

---

## 📌 Decisões Técnicas e Melhores Práticas
- **Componentização e organização modular:** pensadas para garantir escalabilidade.
- **Persistência local:** utilização do LocalStorage para salvar preferências e filtros, proporcionando praticidade.
- **Desistência estratégica do Tailwind:** Decisão tomada visando a qualidade final, clareza e entrega dentro do prazo estipulado.

---

## ⚙️ Fluxo de Dados e Lógicas Importantes
- **Cálculo dinâmico de produtividade e ganhos estimados:** realizado em tempo real com base no histórico dos estados operacionais dentro do intervalo de datas filtrado.
- **Renderização condicional:** garante que apenas equipamentos com dados válidos sejam exibidos no mapa.
- **Autocomplete com sugestões:** facilita a busca por nome dos equipamentos.
- **Lógica integrada entre componentes:** filtros impactam diretamente na visualização do mapa e das rotas, demonstrando uma comunicação eficiente entre estados e componentes React.

---

## 🚧 Desafios e Aprendizados
- Tentativa e decisão estratégica sobre migração para Tailwind CSS: reforçou a importância de foco, entrega e prioridades claras em contextos de tempo reduzido.

---

## 💡 Features adicionais
- Popup com scroll para histórico detalhado.
- Pins intuitivos e visualmente destacados conforme estado operacional.
- Data-driven interações e cálculos dinâmicos.
- Filtros personalizados salvos automaticamente no LocalStorage.
- Exibição e ocultação prática e elegante do painel de filtros.
- Visualização dinâmica das rotas dos equipamentos com seleção individual.
- Interface intuitiva, moderna e com cores inspiradas na identidade visual da AIKO.
- Interações avançadas e responsivas com o Mapbox para melhor experiência do usuário.

---

## 🙌 Agradecimentos

Obrigado à AIKO pela oportunidade incrível de realizar este desafio, que proporcionou crescimento e aprendizados valiosos. Estou disponível para quaisquer esclarecimentos adicionais e feedbacks.

---

LINK DO VIDEO

https://www.loom.com/share/713a65a69fc24005b41c2499af54206b?sid=c8270da8-4fa9-4479-a4f1-6f30b8cda41e

---

LINK DO DEPLOY

https://teste-frontend-v4-git-teste-ivan-5302ef-ivans-projects-1c591bc8.vercel.app?_vercel_share=s9fdguMrvR6VUs4Q8OEyvOUroHbTAzdG

✨ Desenvolvido por Ivanilson Ferreira com carinho e dedicação.