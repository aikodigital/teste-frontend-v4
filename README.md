# Gestão de Equipamentos

### Ambiente de Desenvolvimento: 
	
	https://teste-gabriel-napolis.d25m11dkmgcmi0.amplifyapp.com/

## 1 - Para esse projeto, foram utilizadas as seguintes tecnologias e versões:

    Node.js - 18.17.0
    React - 18
    Next.js - 14.0.4
	TypeScript - 5.3.3
	Google Maps API - 2.19.3
	AWS Amplify 


## 2 - Instalação e execução do projeto:

Instalação de dependências:

    npm install

Executar projeto no modo de desenvolvimento:
	
	npm run dev

Google Maps API:

	Insira sua GOOGLE_API_KEY no arquivo .env-example e renomeio para .env


## 3 - Demonstração:

### Listagem de Equipamentos

Na tela inicial, são listados todos os equipamentos, sendo exibidos:

<ul>
	<li>Nome</li>
	<li>Modelo</li>
	<li>Estado Atual</li>
</ul>

<img src="/public/img/listagem.png">

### Histórico de Posições

No histórico de posições, é possível selecionar o equipamento desejado e assim, verificar a sua última posição, estado atual e também suas últimas vinte posições.
<img src="/public/img/posicoes_01.png">

<img src="/public/img/posicoes_02.png">

<img src="/public/img/posicoes_03.png">

<img src="/public/img/posicoes_04.png">

### Histórico de Estados

Selecionando o equipamento, é possível verificar todo seu histórico de estados, sendo exibidos:

<ul>
	<li>Status</li>
	<li>Data</li>
	<li>Cor do Estado</li>
	<ul>
          <li>Verde: Operando</li>
          <li>Amarelo: Parado</li>
          <li>Vermelho: Manutenção</li>
    </ul>
</ul>

<img src="/public/img/estados_01.png">

<img src="/public/img/estados_02.png">

