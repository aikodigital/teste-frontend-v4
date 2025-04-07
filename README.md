## 💡 Justificativa

Utilizei o NextJS, TailwindCSS e CSS Inline por ter maior vivencia com essa tecnologia. Escolhi essa combinação pois estou considerando a possibilidade de que caso o projeto cresca não terá problema já que essa solução é escalável, enquanto o Tailwind polpa tempo no quesito estilização.

## 🧰 Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- Leaflet (mapas)
- TailwindCSS / CSS Modules

## 📦 Instalação

```bash
npm install
```

## 🗂️ Estrutura de pastas

```bash
  └── app/
  └── components/
  └── hooks/
  └── public/
        └── data/
        └── icons/
        └── img/
  └── tests/
  └── utils/
```

## ▶️ Inicialização

```bash
npm run dev
```

## 🧪 Tests

```bash
npm run test
```

## 📘 Componentes principais
- Map: Mostra equipamentos com Leaflet
- EquipmentSidebar: Exibe dados mais detalhados do equipamento
- useEnrichedEquipmentData: Hook que calcula dados enriquecidos

## ✅ Funcionalidades Obrigatórias:
- 📍 **Exibição dos equipamentos no mapa** em suas **posições mais recentes**. ✅
- ✅ **Estado atual de cada equipamento** visível ao passar o mouse sobre o marcador. ✅
- 🕓 **Histórico de estados** exibido ao clicar sobre o equipamento (via Popup). ✅

## 🌟 Funcionalidades Extras:
- 🕓 **Histórico de posições** exibido ao clicar sobre o equipamento (via Popup). ✅
- 📄 **Documentação** gerar uma documentação da aplicação (README). ✅
- 🧰 **Diferenciar os equipamentos** Diferenciar visualmente os equipamentos por modelo de equipamento na visualização do mapa. ✅
- 🔨 **Percentual de Produtividade do equipamento** ❌
- 💵 **Ganho por equipamento** ❌
- 🧪 **Testes** ✅
- 🔍 **Filtro por estado** dos equipamentos (Operando, Parado, Manutenção). ✅
- 🔎 **Busca por nome** do equipamento. ✅

## 🔗 Link Vídeo

- [Apresentação](https://drive.google.com/file/d/1vyNrJuWTe-fdbewZDbqXnKUokNhre5zK)