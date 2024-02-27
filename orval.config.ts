import { defineConfig } from "orval";

export default defineConfig({
  "rese-api": {
    input: {
      target: "./api-docs.json"
    },
    output: {
      mode: "single",
      target: "src/mocks/orval.ts",
      schemas: "src/models",
      mock: true
    }
  }
});
