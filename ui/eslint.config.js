import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import css from "@eslint/css";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import solid from "eslint-plugin-solid/configs/typescript";
import * as tsParser from "@typescript-eslint/parser";

export default defineConfig([
  globalIgnores(["dist/*"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended", eslintPluginPrettierRecommended],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [eslintPluginPrettierRecommended],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  },
  {
    files: ["**/*.css"],
    plugins: {
      css,
    },
    language: "css/css",
    extends: ["css/recommended", eslintPluginPrettierRecommended],
    languageOptions: {
      customSyntax: {
        atrules: {
          plugin: {
            prelude: "<string>",
          },
        },
      },
    },
  },
]);
