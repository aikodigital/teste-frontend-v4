// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/leaflet', '@nuxt/icon', 'dayjs-nuxt'],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            operando: '#2ecc71',
            parado: '#f1c40f',
            manutencao: '#e74c3c',
          },
        },
      },
    },
  },
  build: {
    extend(config, { isDev, isClient }) {
      if (!config.plugins) {
        config.plugins = [];
      }

      config.plugins.push(
        require('@rollup/plugin-url')({
          include: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.svg'],
          limit: 8192, // Tamanho limite para inline base64
          emitFiles: true, // Emite arquivos para o diretório de saída
          fileName: '[name][hash][extname]'
        })
      );
    }
  }
});