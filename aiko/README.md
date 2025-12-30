# 📍 Aiko – Frontend de Monitoramento de Equipamentos

## 📌 Visão Geral

Esta aplicação web foi desenvolvida para **visualizar, analisar e explorar dados de equipamentos florestais**, exibindo suas **posições geográficas**, **estados operacionais**, **histórico temporal**, **trajetos**, **métricas de produtividade** e **ganhos operacionais**.

O foco principal foi entregar uma solução:

* clara para gestores,
* visualmente intuitiva,
* tecnicamente robusta,
* e fácil de evoluir.

---

## 🧠 Decisões Técnicas

### 🔹 Stack utilizada

* **React (JavaScript)** – framework principal
* **React Leaflet + Leaflet** – visualização geográfica
* **CSS puro** – estilização personalizada (sem Tailwind)
* **Dados locais em JSON** – simulação de backend

A decisão de utilizar **JavaScript puro** (sem TypeScript) foi intencional, priorizando:

* simplicidade
* velocidade de desenvolvimento
* foco na lógica de negócio e UX

---

## 🗺️ Funcionalidades Implementadas

### ✅ Visualização no Mapa

* Exibição da **última posição** de cada equipamento
* Ícones personalizados por estado
* Controles de zoom customizados e posicionados
* Limite de zoom máximo para evitar quebra visual

---

### ✅ Estados do Equipamento

* Estados possíveis:

  * Operando
  * Parado
  * Manutenção
* Cada estado possui **cor própria**
* Estado atual exibido:

  * no mapa
  * na sidebar
  * no modal de histórico

---

### ✅ Histórico de Posições (Trajeto)

* Trajeto exibido como **Polyline**
* Cores do trajeto variam conforme o estado no tempo
* Implementação de **herança de estado**:

  * se não houver mudança explícita, o último estado conhecido é mantido
* Implementação de **interpolação visual**:

  * evita “buracos” entre pontos distantes
  * melhora leitura do trajeto sem alterar dados reais

---

### ✅ Timeline (Modo Replay / Vídeo)

* Slider temporal sincronizado
* Botão **Play / Pause**
* Marker animado se deslocando no mapa
* Linha do trajeto cresce conforme o tempo avança
* Estados e cores respeitam o tempo atual da timeline

---

### ✅ Sidebar Flutuante

* Sidebar sobre o mapa (layout moderno)
* Lista de equipamentos
* Destaque visual do equipamento selecionado
* Exibição da **última data registrada**
* Filtros:

  * por estado
  * por intervalo de datas

---

### ✅ Modal – Histórico de Estados

Ao selecionar um equipamento, é possível abrir um modal com:

#### 📋 Tabela de Estados

* Nome do estado
* Início
* Fim
* Distância percorrida no período

#### 📊 Produtividade

* Calculada com base no tempo em estado **Operando**
* Fórmula:

```text
(produtivo / total) * 100
```

#### 🎯 Exemplo:

Se um equipamento operou 18h em um período de 24h:

```
18 / 24 * 100 = 75%
```

---

## 📐 Arquitetura do Projeto

```text
src/
├── components/
│   ├── MapView/
│   ├── Sidebar/
│   ├── MapLegend/
│   ├── EquipmentModal/
│
├── services/
│   └── dataServices.js
│
├── utils/
│   ├── equipmentUtils.js
│   ├── geoUtils.js
│   ├── equipmentMetrics.js
│
├── data/
│   ├── equipment.json
│   ├── equipmentModel.json
│   ├── equipmentPositionHistory.json
│   ├── equipmentState.json
│   ├── equipmentStateHistory.json
│
├── pages/
│   └── Dashboard.js
```

---

## 🧩 Componentes Principais

### 🔹 `Dashboard`

* Orquestra o estado global
* Controla:

  * equipamento selecionado
  * filtros
  * timeline
  * modal
* Responsável por montar os dados finais consumidos pelos componentes

---

### 🔹 `MapView`

* Renderiza o mapa
* Exibe:

  * markers
  * trajetos
  * mudanças de estado
  * marker animado da timeline
* Totalmente desacoplado da lógica de dados

---

### 🔹 `Sidebar`

* Lista de equipamentos
* Filtros
* Timeline
* Ações do equipamento selecionado

---

### 🔹 `EquipmentModal`

* Overlay completo
* Tabela de estados
* Métricas e produtividade
* Experiência focada em análise detalhada

---

## 🧪 Tratamento de Dados Temporais

Foram aplicadas boas práticas comuns em sistemas de telemetria:

* Ordenação cronológica
* Herança de estado
* Interpolação visual
* Separação entre:

  * dados reais
  * dados apenas para visualização

Essas decisões garantem:

* consistência visual
* ausência de buracos no trajeto
* leitura clara do comportamento do equipamento

---

## ▶️ Como Rodar o Projeto

### Pré-requisitos

* Node.js (v16+)
* npm ou yarn

### Passos

```bash
cd aiko
npm install
npm start
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🚀 Funcionalidades Extras Implementadas

* Timeline animada (replay)
* Interpolação de trajeto
* Modal com métricas
* Produtividade por equipamento
* UI moderna e responsiva
* Sidebar flutuante
* Legendas visuais claras

---

## 📌 Considerações Finais

Este projeto foi desenvolvido com foco em:

* clareza para o usuário final
* escalabilidade
* organização de código
* decisões técnicas justificáveis

A aplicação simula um **sistema real de monitoramento e análise operacional**, indo além dos requisitos mínimos do teste.

---

📩 **Obrigado pela oportunidade!**
Fico à disposição para explicar decisões técnicas, evoluir funcionalidades ou adaptar a solução conforme necessário.

