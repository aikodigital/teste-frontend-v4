import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pug from 'vite-plugin-pug'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pug()],
})