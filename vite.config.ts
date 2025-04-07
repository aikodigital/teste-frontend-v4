import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // Importação crucial que estava faltando

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'leaflet': path.resolve(__dirname, 'node_modules/leaflet')
    }
  }
});