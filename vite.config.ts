import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "@primary-color": "#1890ff", // Customize Ant Design primary color
          "@link-color": "#1DA57A", // Customize Ant Design link color
          "@border-radius-base": "6px", // Customize Ant Design border radius
        },
      },
    },
  },
});
