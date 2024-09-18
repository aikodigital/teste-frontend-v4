/// <reference types="vitest" />

// eslint-disable-next-line import-helpers/order-imports
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: ['./tests/setup.ts']
  }
})
