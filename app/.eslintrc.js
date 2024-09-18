module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier': ['error'],
        'no-console': ['error', { allow: ['warn', 'error'] }]
    },
};
