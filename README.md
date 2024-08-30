# Gerenciador de Equipamentos

![Logo aiko](/public/img/aiko.png)

## Imagens

![Aplicação](/public/img/home_project.png)
![Timeline](/public/img/timeline.png)

## Tecnologias utilizadas

- [Nuxt](https://nuxt.com/)
  - [Vue](https://vuejs.org/)
  - [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn-Vue](https://www.shadcn-vue.com/)
- [Nuxt Leaflet](https://leaflet.nuxtjs.org/?utm_source=nuxt.com&utm_medium=aside-module&utm_campaign=nuxt.com)
- [ESLint](https://eslint.org/)
  - [Antfu Rules](https://github.com/antfu/eslint-config)
  - [Plugin TailwindCSS](https://github.com/francoismassart/eslint-plugin-tailwindcss)

## Funcionalidades

- Busca por **modelo**;
- Busca por **status**;
- Timeline do **histórico de estados**;
- Ícones personalizados para cada modelo;
- **Mapa** com a localização dos equipamentos;
- Traçado de **rota**;
- Calculo de _ganhos totais_ do equipamento seguindo os valores de cada modelo;
- Calculo de _produtividade_ mensal baseado nas horas de trabalho ativo do equipamento;
- Exibição **individual** de cada equipamento no mapa

## Registro de decisões

- **Nuxt**: Possibilita o desenvolvimento mais dinâmico e rápido, dado que tem imports automáticos e módulos prontos para uso.
- **TailwindCSS**: Facilita a estilização e padronização dos componentes.
- **Shadcn-Vue**: Traz alguns componentes úteis prontos apesar não necessitar de instalar todos os componentes, apenas os que são utilizados.
- **Nuxt Leaflet**: Abstração do Leaflet para o Nuxt, facilitando a utilização do mapa e trazendo alguns componentes mais agradáveis para o uso.
- **ESLint**: Utilizadas regras simples mas eficazes para manter o código limpo e padronizado. O conjunto de regras do [Antfu]() é bem completo e perfeito para Vue e Typescript. O plugin do TailwindCSS é utilizado para evitar erros de classes não utilizadas e classes qu podem ser simplificadas.

## Estruturação do projeto

```
├── assets
│   ├── css
│   │   └── tailwind.css
├── components
│   ├── ui
├── layouts
├── composables
├── pages
├── services
├── types
└──  utils
```

## Execução

```bash
# Instalar dependências
$ pnpm install

# Rodar o servidor
$ pnpm dev
```
