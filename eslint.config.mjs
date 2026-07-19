import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import typescriptEslint from "@typescript-eslint/eslint-plugin";

export default defineConfig([
  ...nextVitals,
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/exhaustive-deps": "warn",
      // Existing components need a separate React 19 lifecycle refactor.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react/no-unescaped-entities": "off",
      "no-var": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "coverage/**",
  ]),
]);
