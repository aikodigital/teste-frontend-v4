module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'eslint-plugin-import-helpers', 'react'],
  rules: {
    "react/prop-types": 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-console': ['warn', { allow: ['error'] }],
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'react/react-in-jsx-scope': 0,
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          [
            '/^@//'
          ],
          [
            'parent',
            'sibling'
          ],
          'index'
        ],
        alphabetize: {
          'order': 'asc',
          'ignoreCase': true
        }
      }
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
