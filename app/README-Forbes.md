# Teste Aiko - Victor Hugo Forbes

Deployed Test on Vercel [Deployed Test on Vercel](https://teste-frontend-v4-seven.vercel.app/).

## Stack Escolhida

Defini fazer o projeto com React utilizando typescript, tailwind e shadcn para os componentes. São tecnologias que estou familiarizado e trabalho no dia a dia.

Para os mapas, passei por algumas opções mas acabei conseguindo implementar o que parece ser uma abstrações do Google Maps: https://visgl.github.io/react-google-maps/

Por nunca ter trabalhad com mapas, o setup inicial foi relativamente desafiador e não pude me aprofundar muito para conseguir andar rápido com o teste.

## Features Adicionadas e observações

Para desenvolver as features, segui um caminho de criar algo simulando o repository de um backend que me entregasse os dados mais mastigados e filtrados: `/api/simulatedApi.ts`.

- [x] Mapa com posição
- [x] Estado atual do equipamento
- [x] Histórico de estados

---

Extras:

- [x] Filtro - Com mais tempo, faria filtro nos parametros da URL para ser compartilhavel. Tenho gostado muito de gerenciar o estado no path com Next.
  - [x] Modelo
  - [x] Estado
- [x] Search
- [x] Percentual de produtividade
- [x] Ganho por equipamento
- [x] Diferenciar por modelo
- [-] Histórico de posições com trajeto - Bug presente que precisaria de mais tempo e uma possível reestruturação e imersão na doc do maps. Ao fazer o draw de um path, preciso encontrar uma maneira de remover o path já desenhado.
- [ ] Testes - Deixar os testes de lado não foi algo que faço de forma leviana, mas para conseguir andar rápido decidi focar nas funcionalidades e entregá-las por completo. Com mais tempo eu desenvolveria testes de render e lógicas de tratamento de dados. Porém numa aplicação real acredito que eles não seriam tão tratados no front e viriam mais mastigados.

Gostei bastante da implementação do filtro de data sendo aplicado por todo escopo tanto das horas quanto rentabilidade! E sou fã de tema escuro, então resolvi implementar aqui também.

### Pontos de melhora:

Nenhum projeto está terminado, apenas decidimos que já está bom suficiente. Alguns pontos que eu melhoraria e me atentaria em aplicações com escala maior seriam

- Gerenciamento do estado sem tanto prop drilling e mais facilidade para compartilhar estado entre componentes
- Criar componentes menores e mais customizáveis/reutilizaveis.
- Deixar alguns comentários em pontos em que a lógica possa estar confusa.
- Verificar com calma se existem renders desnecessários ocorrendo

## Considerações finais

Agradeço a oportunidade de participar do processo, é sempre de grande valia testar minhas habilidades com regras de negócio novas e reais.

Um feedback referente ao desenvolvimento e pontos de melhoria serão altament apreciados :)
