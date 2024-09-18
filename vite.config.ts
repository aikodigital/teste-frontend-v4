import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [resolve(__dirname), resolve(__dirname, '../data')],
    },
  },
  resolve: {
    alias: {
      '/@data': resolve(__dirname, '../data'),
    },
  },
});
