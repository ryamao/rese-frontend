import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["src/vitest-setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "src/*.d.ts",
        "src/**/*.stories.{ts,tsx}",
        "src/models/**/*.ts",
        "src/mocks/**/*.ts"
      ]
    }
  }
});
