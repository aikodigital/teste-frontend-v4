import { defineConfig, configDefaults } from "vitest/config";
import path from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),

    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/vitest/setup.ts"],
  },
});