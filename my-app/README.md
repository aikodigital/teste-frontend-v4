Documentação do Projeto de Aplicação Web de Equipamentos
Introdução
Este projeto é uma aplicação web desenvolvida em TypeScript e Next.js que exibe dados de equipamentos utilizados em uma operação florestal. O sistema coleta dados como histórico de posições e estados dos equipamentos e permite que os gestores visualizem essas informações de forma clara e interativa.

Tecnologias Utilizadas
Frontend:

Next.js
TypeScript
Zustand
Tailwind CSS
@react-google-maps/api
Dados:

JSON (equipment.json, equipmentModel.json, equipmentPositionHistory.json, equipmentState.json, equipmentStateHistory.json)
Estrutura do Projeto
markdown
Copiar código
/src
  /components
    - FilterComponent.tsx
    - MapComponent.tsx
    - EquipmentCard.tsx
  /hooks
    - useEquipmentData.ts
  /store
    - equipmentStore.ts
  /styles
    - globals.css
  /pages
    - index.tsx
Funcionalidades
Exibição de Equipamentos:

Mostra os equipamentos em um mapa usando suas posições mais recentes.
Exibe o estado atual de cada equipamento em pop-up ou ao passar o mouse.
Filtros:

Permite filtrar equipamentos por estado (Operando, Parado, em Manutenção).
Implementação de filtros adicionais para calcular produtividade e ganhos.
Histórico:

Visualização do histórico de estados dos equipamentos ao clicar sobre eles.
Configuração do Ambiente
Instalação de Dependências:

bash
Copiar código
npm install
Configuração do Tailwind CSS:

Certifique-se de que o arquivo tailwind.config.js esteja configurado corretamente.
Iniciar o Servidor de Desenvolvimento:

bash
Copiar código
npm run dev
Como Usar
Acesse a aplicação:

Abra o navegador e vá para http://localhost:3000.
Interaja com o mapa:

Visualize a posição dos equipamentos e interaja com os pop-ups.
Utilize os filtros:

Aplique filtros para ver equipamentos em diferentes estados e visualize os resultados.
Contribuição
Se você deseja contribuir para este projeto, fique à vontade para abrir issues ou pull requests.

Licença
Este projeto está sob a licença MIT.