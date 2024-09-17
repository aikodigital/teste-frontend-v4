// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'react-refresh', '@tanstack/query'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'linebreak-style': ['error', 'unix'],
    complexity: 'error',
    'max-statements': ['error', { max: 68 }],
    'no-undefined': 'off',
    'no-alert': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-console': 'warn',
    'block-spacing': 'error',
    'comma-dangle': ['error', 'only-multiline'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var', 'if'],
        next: '*'
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let', 'var', 'if']
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      }
    ],
    'no-trailing-spaces': 'error',
    'no-duplicate-imports': 'error',
    'max-len': [
      'error',
      {
        code: 120
      }
    ],
    'max-nested-callbacks': ['error', 4],
    eqeqeq: ['error', 'always'],
    'no-else-return': 'error',
    'no-multi-spaces': 'error',
    'no-param-reassign': 'error',
    'require-await': 'error',
    'no-shadow': 'off',
    'no-useless-escape': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    curly: 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never'
      }
    ]
  },
  overrides: [
    {
      excludedFiles: ['*/App.tsx', '*.page.tsx', '*.page.ts'],
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      rules: {
        'no-restricted-exports': [
          'error',
          {
            restrictDefaultExports: {
              direct: true
            }
          }
        ]
      }
    },
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      extends: [
        'plugin:@typescript-eslint/stylistic',
        'plugin:@typescript-eslint/strict-type-checked'
      ],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true
          }
        ],
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'off',
        '@typescript-eslint/no-base-to-string': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/switch-exhaustiveness-check': 'error'
      }
    }
  ],
  ignorePatterns: ['tsconfig.json']
};
