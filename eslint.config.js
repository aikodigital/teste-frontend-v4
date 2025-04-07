import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import a11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended, // Regras base do ESLint
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": hooks,
      "jsx-a11y": a11y,
      prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules, // Regras do TypeScript
      ...react.configs.recommended.rules, // Regras do React
      ...hooks.configs.recommended.rules, // Regras dos Hooks
      ...a11y.configs.recommended.rules, // Regras de acessibilidade
      "prettier/prettier": "error", // Aplica o Prettier como erro
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  prettierConfig, // Integração com Prettier
];
