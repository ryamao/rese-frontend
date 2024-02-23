import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["src/vitest-setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"]
  }
});
