## Olá sou o Angelo!

Bem-vindo ao meu repositório do Teste Frontend V4!

Este projeto foi desenvolvido utilizando React e TypeScript e visa demonstrar as habilidades de desenvolvimento front-end para a vaga.

## Requisitos

Para rodar este projeto, você precisa das seguintes versões:

- **React:** 16 ou superior

## Instruções de Inicialização

Funcionalidades
## Mapa
O projeto utiliza um mapa interativo para exibir os equipamentos. Ao clicar em um marcador no mapa, uma infowindow será aberta com os detalhes do equipamento e um botão para visualizar o histórico.

![image](https://github.com/user-attachments/assets/9923d0d7-0dce-4295-b196-7302d7cb891a)


## Detalhes do Equipamento
Ao clicar em um marcador no mapa, será exibida uma infowindow contendo informações detalhadas sobre o equipamento e um botão para acessar o histórico.

![image](https://github.com/user-attachments/assets/16536a51-147d-4958-b1ab-4fbdb17a0fd8)

## Histórico do Equipamento
O histórico do equipamento mostra todas as ocorrências, incluindo mudanças de estado, datas, horas e o número de ocorrências.

![image](https://github.com/user-attachments/assets/3f79914e-194c-4d3f-91f9-22fb0fe7a67d)

## Mais detalhes sobre as tecnologias utilizadas
* **Estilo:** Neste projeto foram utilizados pré-processadores css como Scss/Sass para uma melhor legibilidade e organização das folhas de estilo.
* **Chaves e permissões:** para termos acesso ao mapa, utilizamos a chave gerada em uma conta privada no google. A fim de aumentar a segurança e confiabilidade do codigo a mesma foi colocada em um arquivo .env, onde é consumida dentro do condigo em uma variável de escopo, que importa indiretamente a chave do arquivo .env no gitignore.
* **Imagens e icones:** A fim de diminuir os fall outs de importação, foi optado por manter os assets dentro da pasta src, onde o import é mais facilitado visando que é um projeto pequeno.
* **Framework:** A decisão de utilizar o React vem de meu background com esta ferramenta, onde estou mais acostumado a utiliza-la, além de todos os beneficios de um projeto React como:

- **Componentização**: React permite criar interfaces de usuário usando componentes reutilizáveis e encapsulados, facilitando a manutenção e escalabilidade do código.

- **Desempenho**: O Virtual DOM do React otimiza a atualização da interface do usuário ao minimizar operações de DOM reais, resultando em uma experiência mais rápida e responsiva.

- **Reatividade**: React atualiza automaticamente a interface do usuário quando o estado dos componentes muda, tornando a sincronização entre a UI e o estado mais eficiente.

- **Comunidade e Ecossistema**: A grande comunidade de desenvolvedores e o vasto ecossistema de bibliotecas e ferramentas ajudam a resolver problemas rapidamente e oferecem suporte e recursos adicionais.

- **Unidirectional Data Flow**: A arquitetura de fluxo de dados unidirecional do React (usando props e state) torna o gerenciamento e a depuração do estado mais previsíveis e fáceis de entender.

- **JSX**: O uso de JSX (uma sintaxe que combina JavaScript e HTML) torna o código mais legível e intuitivo, permitindo a escrita de componentes com uma sintaxe semelhante à HTML.

- **React Hooks**: Hooks permitem o uso de estado e outras funcionalidades de React sem precisar escrever uma classe, simplificando a lógica dos componentes e a reutilização de código.

## Contribuindo
Obrigado por verificar o projeto! Se tiver alguma dúvida, não hesite em entrar em contato.