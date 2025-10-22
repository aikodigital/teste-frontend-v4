/// <reference types="vitest" />


import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
// import type { UserConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: './vitest.setup.ts'
    setupFiles: './setupTests.ts',
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8'
    }
  },
});
