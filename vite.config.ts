import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  resolve: {
    alias: {
      components: `${__dirname}/src/components`,
      styles: `${__dirname}/src/styles`,
      utils: `${__dirname}/src/utils`,
      types: `${__dirname}/src/types`
    }
  },
  define: {
    'process.env': process.env
  }
})
