# Teste Frontend V4

Aplicativo desenvolvido com:
 - Angular versão 18
 - Tailwind CSS versão 3.4.11
 - Angular Material versão 18.2.4
 - API de Google Maps

Escolhi a versão mais recente do Angular porque permite o uso de sinais e o trabalho sem zonas, que é a direção que o Framework parece estar tomando. Escolhi o Material para facilitar a criação de, por exemplo, tabelas, botões, etc; enquanto o Tailwind facilita muito na aplicação de estilos. Para mostrar elementos no mapa, uso a API do Google Maps. Provavelmente existem opções melhores.

- Funcionamento:
O funcionamento do aplicativo é simples. Inicialmente, ele mostra a posição atual dos equipamentos no mapa. Ao passar o mouse sobre eles, é exibido seu estado atual. Se você clicar em algum deles, aparecerão seu nome, modelo e uma tabela paginada com os estados históricos, tudo em uma janela modal. Essa janela pode ser fechada ou usada para ver as posições históricas daquele item específico. Você pode então voltar ao estado inicial com um botão. Também é possível filtrar por modelo e estado, assumindo que a última posição do array de estados e a última posição do array de posições são o estado e a posição mais recentes de um equipamento.

- Estrutura do sistema:
O sistema não é complexo. Tem um serviço para lidar com a lógica e atendê-la a qualquer componente que precise. O App é o componente principal, onde é exibido o mapa do Google que contém os marcadores dos times ou os marcadores históricos de um time, isso é renderizado condicionalmente. Há uma pasta de interfaces para manter a tipagem. E uma pasta compartilhada que é usada, neste caso, para conter o componente que é mostrado no modal, e que potencialmente poderia conter mais componentes e outros elementos. Além disso, existe um componente responsável por filtrar e que emite informações para o componente pai, neste caso, o principal.

- Considerações:
Assume-se a última posição do array de posições como a posição atual de um equipamento. Da mesma forma, com o estado. Assim, no mapa isso determina a posição atual e o estado do equipamento.
Faltou trocar os ícones dos marcadores do mapa, eu não estava muito familiarizado com bibliotecas de mapas. E calcular os ganhos e porcentagens de produtividade.
Para o documento de uma aplicação mais complexa, pode-se usar o compodoc, mas o readme é suficiente para cumprir o objetivo.
É uma primeira versão com muito a melhorar.
