

```markdown
# Forestry Equipment Tracker

Sistema de rastreamento de equipamentos florestais que exibe a posição, estado atual e histórico de cada equipamento em um mapa interativo.

## Funcionalidades

- Mapa interativo com localização dos equipamentos.
- Visualização do estado atual (Operando, Parado, Manutenção).
- Histórico de posições e estados.
- Design responsivo.

## Tecnologias

- **Angular** para o frontend.
- **Leaflet** para mapas.
- **SCSS** para estilos responsivos.
- **RxJS** para dados reativos.

## Como Rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/skuzu7/antonio-carlos-junior.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode a aplicação:
   ```bash
   ng serve
   ```
4. Acesse em: `http://localhost:4200`

## Estrutura

```
src/
├── app/
│   ├── components/              # Componentes principais
│   ├── models/                  # Modelos de dados
│   ├── services/                # Serviços de dados e lógica
│   └── app.module.ts
├── assets/
│   └── data/                    # Dados JSON simulados
└── styles.scss                  # Estilos globais
```

## Melhorias Futuras

- Filtros por estado e localização.
- Alertas para estados críticos.

