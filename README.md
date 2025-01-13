# Documentação do Projeto

## Visão Geral

Este projeto foi desenvolvido utilizando **Vue 3** com **Vite** como empacotador. A aplicação segue boas práticas de desenvolvimento, utilizando ferramentas modernas e componentes reutilizáveis. O objetivo principal é garantir uma interface responsiva, acessível e eficiente, com uma base sólida para escalar funcionalidades futuras.

---

## Tecnologias Utilizadas

- **Vue 3**: Framework JavaScript progressivo.
- **Vite**: Ferramenta de build moderna e rápida.
- **Pinia**: Gerenciamento de estado centralizado, substituindo Vuex.
- **TailwindCSS**: Framework de CSS utilitário para estilização rápida e eficiente.
- **PrimeVue**: Biblioteca de componentes UI ricos e prontos para uso.
- **Leaflet**: Biblioteca para mapas interativos.
- **Storybook**: Ferramenta para documentação de componentes visuais.
- **Cypress**: Testes end-to-end (E2E).
- **Vitest**: Framework para testes unitários e de integração.

---

## Componentes Desenvolvidos

### Decisões Técnicas

Os componentes foram desenvolvidos com base nos seguintes critérios:

- **Reutilizáveis**: Componentes genéricos para cenários múltiplos.
- **Documentados**: Integrados com o **Storybook**.
- **Responsivos**: Estilizados com TailwindCSS e testados em múltiplos dispositivos.

---

### Componentes Principais

#### **Mapa Interativo**

- **Função**: Apresenta um mapa com marcadores dinâmicos configurados através do **Leaflet**.
- **Biblioteca Usada**: Leaflet.

# Documentação de Testes e Storybook

## Testes da Aplicação

A aplicação foi testada utilizando duas ferramentas principais: **Cypress** para testes end-to-end (E2E) e **Vitest** para testes unitários e de integração.

### Cypress (Testes E2E)

O **Cypress** foi utilizado para validar o comportamento da aplicação em fluxos completos do usuário, garantindo que as funcionalidades principais funcionam conforme esperado em ambiente real.

#### Configuração do Cypress

Para rodar os testes com Cypress:

1. Certifique-se de que as dependências estejam instaladas:

   ```bash
   npm install
   ```

2. Inicie a aplicação localmente:

   ```bash
   npm run dev
   ```

3. Execute o Cypress:
   ```bash
   npx cypress open
   ```

### Vitest (Testes Unitários e de Integração)

O **Vitest** foi usado para garantir que cada componente, função e módulo da aplicação funcione isoladamente, bem como para validar interações entre eles.

#### Configuração do Vitest

1. Para rodar os testes com Vitest:

   ```bash
   npm run test:unit
   ```

---

## Documentação do Storybook

O **Storybook** foi utilizado para documentar e testar visualmente os componentes da aplicação. Ele permite a visualização de cada componente de forma isolada, bem como a interação com suas propriedades (props).

### Configuração do Storybook

1. Para iniciar o Storybook:

   ```bash
   npm run storybook
   ```

2. O Storybook estará disponível em:
   ```
   http://localhost:6006
   ```

