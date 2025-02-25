import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
  {rules: {
    'vue/multi-word-component-names': 'off', // 'error' | 'warn' | 'off'
    'no-console': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': 'warn',
    'arrow-parens': 'off',
    'vue/no-v-text-v-html-on-component': 'warn',
    '@typescript-eslint/consistent-type-imports': ['error', {
      prefer: 'type-imports',
      disallowTypeAnnotations: false
    }]
  }},
  {ignores: ['**/*.config.ts', '**/*.config.js', '!**/eslint.config.js', '**/*.d.ts', 'dist', '.nuxt', '.output']}
];