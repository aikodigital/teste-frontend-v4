import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },

	future: {
		compatibilityVersion: 4,
	},

	ssr: false,
	modules: [
		'@nuxt/eslint',
		'@nuxt/test-utils',
		'@nuxtjs/leaflet',
		'@nuxt/ui',
		'@pinia/nuxt',
	],

	css: ['~/assets/css/main.css'],

	vite: {
		plugins: [tailwindcss()],
	},

	ui: {
		colorMode: false,
	},
})
