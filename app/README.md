# Aplicação de Teste Técnico - Aiko

Esta aplicação foi desenvolvida como parte de um teste técnico e é um exemplo de uma aplicação front-end moderna usando Vue.js. Abaixo estão as informações detalhadas sobre a aplicação, incluindo decisões de design, especificações da aplicação e instruções de uso.

## Sumário

1. [Especificação da aplicação](#especificação-dos-componentes)
3. [Instruções de Uso](#instruções-de-uso)

## Especificação da aplicação

- **Framework**: Vue.js foi escolhido para a construção da aplicação devido à sua simplicidade e capacidade de criar interfaces reativas.
- **Gerenciamento de Estado**: Utilizei Pinia para gerenciar o estado da aplicação, garantindo que o estado global seja compartilhado e gerenciado de forma eficiente.
- **Estilização**: A aplicação utiliza Tailwind CSS para estilização, promovendo um design mobile-first e responsivo. As cores são predominantemente escuras com elementos centralizados.

- **Funcionalidades principais**:
  - **Filtragem**: Permite filtrar os dados da tabela por status, nome e modelo.
  - **Paginação**: Suporta paginação para navegação entre diferentes páginas de estados passados dos equipamentos.
  - **Navegação dinamica**: Atualização dinâmica do equipamento apresentado.

## Instruções de Uso

1. **Clonar o Repositório**:
    ```bash
    git clone https://github.com/Saviovd/teste-frontend-v4.git
    cd .\app\
    ```

2. **Instalar Dependências**:
    ```bash
    npm install
    ```

3. **Rodar a Aplicação**:
    ```bash
    npm run dev
    ```
   A aplicação estará disponível em [http://localhost:5173](http://localhost:5173).

Para mais informações, consulte a documentação ou entre em contato.
