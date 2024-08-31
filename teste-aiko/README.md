# Case técnico | Desenvolvedor Frontend - Aiko
## Antes de começar
Certificar-se de estar na pasta `./test-aiko` para rodar os comandos

## Instalação
O projeto foi desenvolvido com o node na versão lts mais recente (20.17.0).

Instalando todas as dependencias:
```
npm install
```

## Testes
Todos os testes unitários encontram-se em toda pasta `./src` com o padrão `*.test.ts`;

Executando testes unitários:
```
npm run test
```

## Executando versão de desenvolvimento
```
npm run dev
```

## Decisões
Por se tratar se um teste técnico, a fonte de dados foi mantida nos arquivos json na pasta `./public/data/` e são acessadas nos services da pasta `./src/service`, simulando uma requisição a uma fonte de dados.

## Sistema
| | |
| --- | --- |
| Tela inicial do sistema, no mapa apresenta todas os equipamentos em suas ultimas posições registradas por meio de marcados indicando o nome e o estado pela cor (Manutenção = vermelho, Parado = amarelo, Operando = verde) | ![image](https://github.com/user-attachments/assets/77c3adec-b8b0-426c-89ea-8a6e5deaec9a) |
| Na tela inicial é possível filtrar os equipamentos por modelo e estado | ![image](https://github.com/user-attachments/assets/3b242e69-5245-494c-816b-3a2b32dfaca6) ![image](https://github.com/user-attachments/assets/fa0b8ad1-3488-4a73-902b-273f417f07ad) |
| Ao colocar o cursor do mouse sobre um marcador, é possível visualizar informações recentes do equipamento como: estado atual, ultima atualização do estado, modelo, custo hora e ultima atualização da posição | ![image](https://github.com/user-attachments/assets/26473170-3465-4b63-8197-921ba333e596) |
| Ao clicar em um marcador, irá abrir um painel lateral com mais informações do equipamento como histórico de estados e histórico de posições | ![image](https://github.com/user-attachments/assets/a441e148-40d9-4d20-b1a2-a0548d95a385) |
| É possível expandir a tela do painel lateral para cobrir a tela intera ao clicar no botão para expandir no canto superior esquerdo do sidebar | ![image](https://github.com/user-attachments/assets/a0d63062-aeec-4acb-a1eb-a1faa4bbba38) ![image](https://github.com/user-attachments/assets/02650479-c53d-4d01-8484-c4cebcf64e7e) | 
| Na aba "Histórico de estados" do painel lateral é possível visualizar todos os estados pelo qual o equipamento já passou, indicando sua ultima atualização e ordenados do mais recente para o mais antigo | ![image](https://github.com/user-attachments/assets/0ca92a3c-7b45-4172-b7ac-f77abf48df58) |
| Na aba "Histórico de Posições" do painel lateral é possível visualizar todos as posições pelo qual o equipamento já passou indicadas em um mapa por meio marcadores ordenados numericamente do mais antigo para o mais recente. O mapa inicia sempre centralizado na ultima posição do equipamento | ![image](https://github.com/user-attachments/assets/ba92fead-e61e-4996-8330-91f767a3680a) |
