# Teste Frontend Aiko - Willian Silveira ✅

Esta aplicação foi desenvolvida para gerenciar e monitorar equipamentos, fornecendo informações detalhadas sobre seu status, produtividade e localização. A interface do usuário foi construída usando React com Next.js e Material-UI.

## Como Executar o Projeto 🚀

1. Clone o repositório
2. Instale as dependências com `yarn install`
3. Execute o projeto em modo de desenvolvimento com `yarn dev`
4. Acesse `http://localhost:3000` no seu navegador

## Instruções de Uso 📝

1. Na página principal, você verá uma lista de equipamentos disponíveis com a  possibilidade de filtrar buscas.
2. Clique sobre um equipamento no mapa para visualizar algumas informações.
3. Clique em "Ver mais" em um equipamento para acessar seus detalhes.
4. Na página de detalhes, use os botões de navegação para alternar entre diferentes datas.
5. Observe o resumo de produtividade, histórico de status e posições para a data selecionada.
6. Use o mapa para visualizar as movimentações do equipamento ao longo do dia.

## Componentes Principais ⚙️

### EquipmentDetails

Este é o componente principal que exibe informações detalhadas sobre um equipamento específico. Ele inclui:

- Informações básicas do equipamento
- Navegação por data
- Resumo diário de produtividade
- Histórico de status
- Histórico de posições
- Mapa diário do equipamento

### DateNavigation

Um componente reutilizável que permite a navegação entre diferentes datas. Ele exibe:

- Data atual no formato brasileiro (ex: "Sexta-feira, 30/08/2024")
- Botões para navegar para o dia anterior e próximo

### DailyProductivitySummary

Este componente mostra um resumo da produtividade diária do equipamento, incluindo:

- Ganhos totais
- Porcentagem de produtividade

### StatusHistoryList

Exibe uma lista do histórico de status do equipamento para o dia selecionado, incluindo:

- Horário de cada mudança de status
- Nome do status
- Cor associada ao status

### PositionHistoryList

Mostra uma lista do histórico de posições do equipamento para o dia selecionado, incluindo:

- Horário de cada registro de posição
- Latitude e longitude

### EquipmentDailyMap

Um componente que exibe um mapa com as posições do equipamento ao longo do dia.

## Contexto de Equipamento 🔗

A aplicação utiliza um contexto de equipamento (`EquipmentContext`) para gerenciar o estado global relacionado aos equipamentos. Isso inclui:

- Lista de equipamentos
- Modelos de equipamentos
- Estados dos equipamentos
- Últimos estados e posições dos equipamentos
- Filtros aplicados

## Decisões de Design 🎨

1. **Componentização**: Dividi a interface em componentes reutilizáveis para melhorar a manutenibilidade e legibilidade do código.
2. **Contexto Global**: Utilizei o Context API do React para gerenciar o estado global da aplicação, facilitando o acesso aos dados em diferentes componentes.
3. **Estilização**: Adotei o Material-UI para uma interface consistente, com estilos personalizados quando necessário (não consegui terminar de criar o tema global a tempo da entrega, então acabei achando melhor removê-lo).
4. **Formatação de Data**: Implementamos a formatação de data no padrão brasileiro, incluindo o nome do dia da semana, para melhor compreensão do usuário.
5. **Mapa Interativo**: Incluímos um mapa para visualização das posições do equipamento, proporcionando uma experiência mais rica ao usuário.

## Próximos Passos (melhorias) 🔨

- Implementar testes unitários e de integração
- Melhorar a performance com técnicas de otimização de renderização
- Implementar um sistema de autenticação e autorização
- Adicionar suporte para diferentes idiomas