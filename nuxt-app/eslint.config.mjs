import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'no-console': 'warn', // Exibe um aviso ao usar `console.log`
    'no-debugger': 'warn', // Exibe um aviso ao usar `debugger`
    '@typescript-eslint/no-unused-vars': 'warn', // Exibe um aviso para variáveis não utilizadas
  },

  languageOptions: {
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
  },
});
