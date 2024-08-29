# Teste AIKO

## Intruções
Para configurar o frontend, basta executar "npm i" seguido de "npm start". Isso será suficiente para iniciar a aplicação.

## 1. Estrutura Geral
A estrutura segue uma abordagem modular, onde diferentes funcionalidades e componentes são isolados em seus próprios diretórios. Isso facilita a manutenção e escalabilidade do projeto.

## 2. Diretórios e Arquivos Principais
**assets/img:** Armazena imagens e ícones utilizados na aplicação. Isso centraliza todos os recursos visuais, facilitando o gerenciamento e a troca de assets, se necessário.

**components:** Contém subdiretórios para cada componente principal (Map, Search, SideBar), cada um com seus respectivos arquivos de estilo (.module.css) e implementação (.tsx). Isso promove a separação de responsabilidades, onde cada componente gerencia seu próprio escopo de funcionalidades e estilos.

- Map: Responsável por exibir o mapa e as posições dos equipamentos.
- Search: Gerencia a funcionalidade de busca, permitindo ao usuário buscar por Modelo , Nome e Status.
- SideBar: Exibe a lista de equipamentos, seus estados.

**services:** Contém a lógica de negócios e funções utilitárias.

**store:** Gerencia o estado global da aplicação com Redux.

## 3. Uso do Redux
O Redux é usado para gerenciar estados globais. Isso permite uma melhor coordenação entre componentes, garantindo que eles tenham acesso às mesmas fontes de verdade e possam reagir a mudanças de estado global de forma consistente.

## 4. Estilos Modulares
A escolha por módulos CSS (.module.css) em cada componente permite a aplicação de estilos scoped, prevenindo conflitos de CSS e garantindo que os estilos sejam aplicados apenas ao componente correspondente. Isso é particularmente útil em aplicações maiores, onde o risco de conflitos de estilos é maior.

## 5. Decisões Técnicas
**Modularidade:** Cada componente e serviço foi isolado em seu próprio módulo, facilitando a manutenção e a escalabilidade. Isso também promove o reuso de componentes e serviços em diferentes partes da aplicação.

**Separação de Responsabilidades:** A lógica de negócios está separada da lógica de exibição, o que segue boas práticas de desenvolvimento de software e facilita testes e manutenção.

