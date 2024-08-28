/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@types': path.resolve(__dirname, 'src/@types'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__test__/globalSetup.ts'],
    exclude: ['**/node_modules/**', '*/__test__/*', 'dist', '**/models/**'],
    coverage: {
      all: true,
      exclude: [
        '**/models/**',
        '**/node_modules/**',
        '**/__test__/**',
        'dist',
        '*.config.*',
        '.commitlintrc.json',
        'src/main.tsx',
        'src/@types/*',
        '**/*.d.ts',
      ],
    },
  },
});
