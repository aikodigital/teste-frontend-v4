import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  formatters: true,
  vue: true,
  typescript: true,
  ignores: [
    '**/assets/**',
  ],
}, ...compat.config({
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/migration-from-tailwind-2': 'off',
    'vue/custom-event-name-casing': 'off',
  },
}))
