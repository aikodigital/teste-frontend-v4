# Link da explicação:

> **Google Drive:** https://drive.google.com/file/d/1BuSGbz-qqVhwfEinzQ6WFidQjbYtPuEx/view?usp=sharing 


> **Youtube:** https://www.youtube.com/watch?v=JzG9rBWWFts


# 📍 Gear Tracker

Sistema de rastreamento e monitoramento de equipamentos em campo, com visualização em mapa, histórico detalhado e filtros personalizados.

## 🚀 Visão Geral

O **Gear Tracker** permite visualizar a localização, estado e histórico de equipamentos operacionais em tempo real, com navegação temporal e filtros avançados. Ideal para empresas que desejam monitorar frotas de máquinas como colheitadeiras, caminhões, tratores e escavadeiras.

---

## 📦 Funcionalidades

- 🔍 **Busca de Equipamentos** por nome ou modelo.
- 🗺️ **Mapa interativo (Leaflet)** com ícones customizados por tipo e estado.
- 🕒 **Navegação Temporal** para ver a posição e estado dos equipamentos em datas passadas.
- 📊 **Resumo por Tipo de Equipamento** (dashboard).
- 📋 **Tabela de Equipamentos** com detalhes e ações rápidas.
- 📈 **Histórico Detalhado** de posições e estados.
- 📁 **Detalhes completos** de cada equipamento.
- 🎛️ **Filtro por modelo e data**.

---

## 🛠️ Tecnologias Utilizadas

- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Leaflet**
- **Context API + Custom Hooks**
- **Vite**

---

## 🧱 Estrutura de Componentes

- `Header.tsx`: Cabeçalho com logotipos e busca.
- `Map.tsx`: Mapa principal com controle temporal.
- `EquipmentSearch.tsx`: Campo de busca.
- `EquipmentTable.tsx`: Tabela de equipamentos.
- `EquipmentDetails.tsx`: Detalhes de um equipamento.
- `EquipmentHistory.tsx`: Linha do tempo com posições e estados.
- `EquipmentSummary.tsx`: Dashboard por tipo.
- `Filter.tsx`: Filtro lateral por modelo/data.

---

## 🧭 Lógica de Rastreamento

- Cada equipamento tem um modelo, estado e posição associados por data.
- Os ícones mudam de cor conforme o estado:
  - 🟢 Operando
  - 🟡 Parado
  - 🔴 Em manutenção
- A navegação temporal permite ver o histórico em qualquer dia e hora.

---

## ▶️ Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/gear-tracker.git
cd gear-tracker

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

## 📁 Estrutura de Pastas
```
data/             # JSONs com estados dos equipamentos
src/
├── assets/           # Ícones e imagens
├── components/
│   ├── Equipment*    # Componentes principais do projeto
│   ├── filter/       # Componentes específicos do Filtro
│   ├── history/      # Componentes específicos do Histórico
│   ├── map/          # Componentes específicos do Mapa
│   ├── search/       # Componentes específicos do Search
│   ├── summary/      # Componentes específicos do Resumo
│   ├── table/        # Componentes específicos da Tabela
├── hooks/            # Custom hooks (useEquipment, etc.)
├── types/            # Custom Types 

```

## 🧑‍💻 Autor
Desenvolvido por Paulo Victor Carvalho de Oliveira 
Linkedin: https://www.linkedin.com/in/paulovictorco
Email: paulovictor.co97@gmail.com
