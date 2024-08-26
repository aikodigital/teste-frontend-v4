// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      // General
      quotes: [
        'error',
        'single',
      ],
      semi: [
        'error',
        'always',
      ],
      // Variables
      'prefer-const': 'error',
      'no-const-assign': 'error',
      'no-var': 'error',
      'no-undef': 'error',
      'one-var': [
        'error',
        'never',
      ],
      'no-multi-assign': 'error',
      'no-plusplus': [
        'error',
        { allowForLoopAfterthoughts: true },
      ],
      'no-unused-vars': 'error',
      // Object
      'no-new-object': 'error',
      'object-shorthand': 'error',
      'quote-props': [
        'error',
        'as-needed',
      ],
      'no-prototype-builtins': 'error',
      // Properties
      'dot-notation': 'error',
      // Array
      'no-array-constructor': 'error',
      'array-callback-return': [
        'error',
        {
          allowImplicit: true,
          checkForEach: true,
        },
      ],
      // Strings
      'prefer-template': 'error',
      'template-curly-spacing': [
        'error',
        'never',
      ],
      'no-eval': 'error',
      'no-useless-escape': 'error',
      // Default Functions
      'default-param-last': 'error',
      'no-new-func': 'error',
      'space-before-blocks': [
        'error',
        'always',
      ],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'no-param-reassign': 'error',
      'prefer-spread': 'error',
      'function-paren-newline': 'error',
      // Arrow Functions
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'arrow-parens': 'error',
      'no-confusing-arrow': [
        'error',
        { allowParens: false },
      ],
      'implicit-arrow-linebreak': 'error',
      'no-duplicate-imports': 'error',
      'object-curly-newline': [
        'error',
        { multiline: true },
      ],
      // Operators
      eqeqeq: 'error',
      'no-case-declarations': 'error',
      'no-unneeded-ternary': 'error',
      'no-mixed-operators': 'error',
      'space-infix-ops': 'error',
      // Blocks
      'nonblock-statement-body-position': 'error',
      'brace-style': 'error',
      'no-else-return': 'error',
      // Comments
      'spaced-comment': 'error',
      // Whitespace
      indent: [
        'error',
        2,
      ],
      'eol-last': 'error',
      'newline-per-chained-call': 'error',
      'no-whitespace-before-property': 'error',
      'padded-blocks': [
        'error',
        'never',
      ],
      'no-multiple-empty-lines': 'error',
      'space-in-parens': 'error',
      'array-bracket-spacing': 'error',
      'object-curly-spacing': [
        'error',
        'always',
      ],
      'comma-spacing': 'error',
      'computed-property-spacing': 'error',
      'func-call-spacing': 'error',
      'key-spacing': 'error',
      'no-trailing-spaces': 'error',
      'comma-style': 'error',
      'comma-dangle': [
        'error',
        'always-multiline',
      ],
      // Types
      'no-new-wrappers': 'error',
      // Naming
      camelcase: 'error',
      'no-underscore-dangle': [
        'error',
        {
          allow: [
            '_count',
          ],
        },
      ],
    },
  }
)
