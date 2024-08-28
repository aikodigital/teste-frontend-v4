# Teste Frontend V4

Projeto desenvolvido para o teste técnico da vaga de Desenvolvedor front da [Aiko](https://aiko.digital/)

<div align="center">
<img src=".github\project-image.png" alt="teste-frontend-v4"/><br />
</div>

## Sobre o projeto

Esse projeto foi desenvolvido durante o período de 23/08/2024 a 30/08/2024 para o teste técnico da vaga de desenvolvedor frontend na [Aiko](https://aiko.digital/).

O projeto consiste em uma ferramenta de monitoramento de equipamentos utilizados em uma operação florestal, onde fosse possível visualizar a posição dos equipamentos a partir de um mapa, visualizar detalhes do equipamento (última atualização, estado atual, etc.) e conseguir ver tanto o histórico de posições quanto o histórico de estados daquele equipamento.

Nesse projeto estão presentes as seguintes funcionalidades:

- Visualização da posição mais recente dos equipamentos no mapa, diferenciando visualmente os equipamentos
- Visualização do estado atual do equipamento, tanto no mapa quanto no menu lateral
- Visualização do histórico de estados do equipamento no menu lateral
- Visualização do histórico de posições do equipamento no mapa, mostrando o trajeto realizado por ele entre as posições
- Filtros por modelo do equipamento, estado atual do equipamento, e pesquisa pelo nome do equipamento
- Visualização do percentual de produtividade e do ganho gerado pelo equipamento nas últimas 24 horas

## Bibliotecas utilizadas
De todas as bibliotecas utilizadas para o pleno funcionamento desse projeto, é possível listar 5 principais, que são:

- **[ReactJS](https://reactjs.org/)**
  - Um dos frameworks mais utilizados para desenvolvimento web na atualidade. Possui uma comunidade de desenvolvedores muito ativa, com várias bibliotecas populares podendo ser utilizadas nele.
- **[Vite](https://vitejs.dev/)**
  - O Vite é uma das melhores ferramentas do mercado quando o assunto é gerenciar frameworks web. Com suporte ao Vue, React, Svelte e outras, é muito simples de ser utilizado, tendo uma infinidade de possíveis expansões e sendo muito mais otimizado para projetos grandes em React do que o CRA (create-react-app).
- **[Leaflet](https://leafletjs.com/)**
  - Biblioteca open source para mapas interativos. Está consolidada no ramo, e apesar da sua idade considerável, recebe atualizações com correções e melhorias até os dias de hoje. Seu uso é muito simples, e possui várias personalizações de acordo com a necessidade do projeto.
- **[Radix-ui](https://www.radix-ui.com/)**
  - Biblioteca open source para criação de componentes. Possui uma infinidade de componentes, todos sendo possíveis customizar para que faça sentido na aplicação que for utilizada. Além da comunidade ativa, permite a importação apenas dos componentes relevantes para o projeto, melhorando o bundle e acelerando o processo de build.
- **[Styled-components](https://styled-components.com/)**
  - Atualmente uma das bibliotecas mais utilizadas quando o assunto é estilização no React. Além da sua facilidade, possui uma comunidade enorme, sendo utilizada por muitas empresas ao redor do mundo. 

> Para ver todas as bibliotecas, veja o arquivo [package.json](package.json)

## Boas praticas

Para que o projeto mantenha sua qualidade e que seja minimizada a incidência de bugs, devem ser seguidas as boas praticas de desenvolvimento listadas abaixo.

### Responsividade e acessibilidade

Apesar desse projeto ter sido desenvolvido focando apenas no layout desktop, é importante sempre estar atento a responsividade e acessibilidade para que o usuário tenha a melhor experiência possível.

Durante o desenvolvimento de novas telas e componentes, ou mesmo durante a manutenção, teste a responsividade do projeto em diversos dispositivos e resoluções, para garantir que o usuário consiga navegar pelo aplicativo da melhor forma.

Outro ponto para se atentar é a acessibilidade. Verifique se os textos possuem um bom contraste de cores, se utilizam tamanhos dinâmicos (rem, em), e se a navegação utilizando apenas o teclado está funcionando corretamente.

Ter atenção nesses detalhes garante que o usuário terá a melhor experiência, e aumenta a possibilidade do mesmo recomendar a ferramenta para outras pessoas.

### Organização de arquivos

Quando um novo componente é criado, deve ser criada uma pasta com o nome do componente, e internamente os arquivos também devem ser separados por pastas.

Essa estrutura organizada facilita a navegação e manutenção do código, garantindo que cada componente e página tenha seus próprios modelos, estilos, e testes bem definidos. Essa regra se estende para hooks, assets, factories, etc.

Segue abaixo um exemplo da organização de pastas que deve ser seguido:

```plaintext
src/
├── components/
│   ├── Button/
│   │   ├── models/
│   │   │   └── index.ts
│   │   ├── button.spec.tsx
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── Form/
│   │   ├── Input/
│   │   │   ├── models/
│   │   │   │   └── index.ts
│   │   │   ├── input.spec.tsx
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   ├── index.ts
│   └── ...
├── pages/
│   ├── Login/
│   │   ├── models/
│   │   │   └── index.ts
│   │   ├── validation/
│   │   │   └── index.ts
│   │   ├── index.tsx
│   │   ├── styles.ts
│   │   └── login.spec.tsx
│   ├── Home/
│   │   ├── models/
│   │   │   └── index.ts
│   │   ├── constants/
│   │   │   └── index.ts
│   │   ├── index.tsx
│   │   ├── styles.ts
│   │   └── home.spec.tsx
│   ├── index.ts
│   └── ...
```

### Exportações

Para realizar a exportação de um componente para utilizar e outro local, é necessário fazer a exportação absoluta, sem utilizar `default`.

Realizando a exportação dos itens dessa forma, existe menos espaço para falhas na hora de importar, uma vez que o item importado é exatamente o item desejado.

Segue abaixo um exemplo de código:

```javascript
// MeuComponente.js
export const MeuComponente = () => {
  return (
    <div>
      <h1>Olá, mundo!</h1>
    </div>
  );
};
```

```javascript
// MinhaPagina.js
import { MeuComponente } from './MeuComponente';

export const MinhaPagina = () => {
  return (
    <div>
      <MeuComponente />
    </div>
  );
};
```

Outra dica na hora de realizar as exportações é criar um arquivo `index.ts` na raiz da pasta, onde todos os componentes serão exportados nesse arquivo. Isso diminui o caminho de importação e deixa o código mais limpo.

Segue abaixo um exemplo de código:

```typescript
// index.ts
export * from './MeuComponente'
export * from './MinhaPagina'
```

### Inversão de dependências

Para construir novos componentes ou dar manutenção nos existentes, é recomendado utilizar o conceito de inversão de dependências para facilitar os testes unitários.

A inversão de dependências consiste em receber hooks customizados como parâmetros. Isso aumenta a flexibilidade do componente e facilita os testes unitários, permitindo passar mocks no lugar dos hooks e realizar testes mais precisos.

Os hooks são importados normalmente dentro do componente, mas são salvos inicialmente nas props para depois serem realmente utilizados. Para componentes com tipagem, os parâmetros do componente devem ser opcionais, pois serão fornecidos internamente no uso real do componente, mas passarão via parâmetros durante os testes.

Segue abaixo um exemplo de código:

```javascript
// MeuComponente.js
import React from 'react';
import { useLocalStorage } from '@/hooks'

export const MeuComponente = ({ useLocalStorageHook = useLocalStorage }) => {
  const { setItem } = useLocalStorageHook();

  return (
    <div>
      <button onClick={() => setItem('key', 'valor teste')}>Salvar valor</button>
    </div>
  );
};
```

```javascript
// MeuComponente.spec.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MeuComponente } from './MeuComponente';

const mockUseLocalStorageHook = () => ({
  setItem: jest.fn(),
});

test('deve chamar setItem com os argumentos corretos ao clicar no botão', () => {
  const mockHook = mockUseLocalStorageHook();
  const { getByText } = render(<MeuComponente useLocalStorageHook={mockHook} />);

  fireEvent.click(getByText('Salvar valor'));

  expect(mockHook.setItem).toHaveBeenCalledWith('key', 'valor teste');
});
```

### Dados constantes

Para utilizar dados que devem ser constantes, é importante seguir o princípio da "Única Fonte de Verdade" antes de criar as constantes.

Esse princípio consiste em manter apenas um local com a verdade absoluta, ou seja, um único local com o valor daquela constante. Essa estratégia é válida para todas as constantes, desde variáveis simples até enums.

Constantes globais devem ser colocadas na pasta `/data`, enquanto constantes locais devem estar na pasta `/constants` dentro do escopo onde é útil.

Antes de criar novas constantes, verifique se elas já existem no projeto e, se não, avalie se devem ser globais ou locais.

## Rodando o projeto localmente

Para rodar o projeto localmente, é recomendado que o NodeJS esteja instalado na versão mais recente.

Caso não possua o NodeJS ou esteja desatualizado, basta clicar [aqui](https://nodejs.org/pt/download/package-manager)

Com o NodeJS instalado, basta seguir os passos abaixo:

```bash
# Clone este repositório

$ git clone https://github.com/CaduZulian/teste-frontend-v4.git

# Acesse a pasta do projeto no terminal/cmd

$ cd teste-frontend-v4

# Instale as dependências

$ yarn

# Execute a aplicação

$ yarn dev

# O cliente iniciará na porta: 5173 - acesse http://localhost:5173

```
