# 🌲 Monitor de Equipamentos Florestais

Aplicação web para monitoramento em tempo real de equipamentos em operações florestais, com mapas interativos, histórico de estados e métricas de produtividade.

📄 **Apresentação do Projeto:** [Clique aqui](https://drive.google.com/file/d/1SbvdDCCcO-vN738aUIwi7UxuPtL3QFkE/view)

## 📋 Pré-requisitos
- **Node.js** 18.x ou superior
- **npm** 9.x ou superior
- **Git** (opcional)

## 🛠️ Instalação

1. **Clonar o repositório (ou baixar manualmente)**
   ```bash
   git clone https://github.com/seu-usuario/forestry-equipment-monitor.git
   cd forestry-equipment-monitor
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api  # Opcional - para conectar com backend
   ```

4. **Executar o projeto**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em: [http://localhost:5173](http://localhost:5173)

## 🚀 Build para produção
Para criar uma versão otimizada para produção:
```bash
npm run build
```
Os arquivos serão gerados na pasta `dist/`.

## 📚 Bibliotecas Principais

| Biblioteca        | Versão | Finalidade                 |
|------------------|--------|----------------------------|
| Vue 3           | ^3.3   | Framework frontend         |
| TypeScript      | ^5.0   | Tipagem estática           |
| Pinia           | ^2.1   | Gerenciamento de estado    |
| Bootstrap 5     | ^5.3   | Estilos e componentes UI   |
| Leaflet         | ^1.9   | Mapas interativos         |
| Chart.js        | ^4.4   | Visualização de gráficos   |
| Bootstrap Icons | ^1.11  | Ícones                     |

## 🧩 Estrutura do Projeto
```
src/
├── assets/          # Imagens, fontes
├── components/      # Componentes reutilizáveis
├── composables/     # Lógica compartilhada
├── data/            # Dados mockados (JSON)
├── models/          # Tipos TypeScript
├── stores/          # Gerenciamento de estado
├── views/           # Páginas principais
├── App.vue          # Componente raiz
└── main.ts          # Entrada principal
```

## 🔧 Comandos Úteis

| Comando          | Descrição                          |
|------------------|----------------------------------|
| `npm run dev`    | Inicia servidor de desenvolvimento |
| `npm run build`  | Cria build para produção          |
| `npm run preview` | Pré-visualiza build de produção  |
| `npm run lint`   | Executa linter                    |

