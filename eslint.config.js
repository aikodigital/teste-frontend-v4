import antfu from '@antfu/eslint-config'

export default antfu({
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  overrides: [
    {
      files: [
        'e2e/**/*.{test,spec}.{js,ts,jsx,tsx}',
      ],
      extends: [
        'plugin:playwright/recommended',
      ],
    },
  ],
})
