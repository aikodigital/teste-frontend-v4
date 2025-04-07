module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "vue/multi-word-component-names": "off",
  },
};
