module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
    },
    parser: "vue-eslint-parser",
    parserOptions: {
      parser: "@typescript-eslint/parser",
    },
    extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
    plugins: [],
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
    overrides: [
      {
        files: [
          "**/__tests__/*.{j,t}s?(x)",
          "**/tests/unit/**/*.spec.{j,t}s?(x)",
        ],
        env: {
          jest: true,
        },
      },
    ],
  };