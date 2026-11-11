import { fileURLToPath } from "node:url";
import { defineConfig } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import globals from "globals";
import js from "@eslint/js";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
  // Ignora arquivos no .gitignore
  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),

  // Configuração geral para JS e Node.js
  {
    files: ["**/*.js", "**/*.mjs"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
  },

  // Configuração específica para arquivos de Teste do Jest
  {
    files: ["**/*.test.js", "**/*.spec.js", "**/tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  // Configuração para arquivos do Next.js / React (como pages/index.js) que usam JSX
  {
    files: ["pages/**/*.js", "components/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
]);
