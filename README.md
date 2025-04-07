# 🏆 Teste Frontend - Monitoramento de Equipamentos

![Aiko](img/aiko.png)

## 🚀 Sobre o Projeto

Este projeto é uma aplicação web para monitoramento de equipamentos em operações florestais. A aplicação permite visualizar a posição atual dos equipamentos em um mapa, seus estados e histórico de operação.

## 🛠️ Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Leaflet (mapas)
- Vite

## 🎥 Vídeo de Apresentação

[![Vídeo de Apresentação](https://img.shields.io/badge/Assistir-Vídeo%20de%20Apresentação-blue)](https://drive.google.com/file/d/1BQsiyPiqAtjXLLLS1KgyLWDpuzCqSC0u/view?usp=drive_link)

## 📋 Funcionalidades

- Visualização de equipamentos no mapa
- Estados atuais dos equipamentos
- Histórico de estados
- Filtros por estado e modelo
- Pesquisa por nome
- Cálculo de produtividade
- Cálculo de ganhos

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

4. Acesse a aplicação em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── Map/           # Componentes relacionados ao mapa
│   ├── Equipment/     # Componentes relacionados aos equipamentos
│   └── UI/            # Componentes de interface genéricos
├── contexts/          # Contextos React
├── services/          # Serviços e APIs
├── types/             # Definições de tipos TypeScript
└── utils/             # Funções utilitárias
```

## 💡 Decisões Técnicas

### 1. Arquitetura
- Utilização de Context API para gerenciamento de estado
- Componentização para reusabilidade
- Tipagem forte com TypeScript

### 2. UI/UX
- Design responsivo com Tailwind CSS
- Feedback visual para ações do usuário
- Interface intuitiva e moderna

### 3. Performance
- Lazy loading de componentes
- Memoização onde necessário
- Otimização de renderização

## 📝 Documentação Adicional

Para mais detalhes sobre a implementação, consulte o arquivo `DOCUMENTATION.md`.

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.