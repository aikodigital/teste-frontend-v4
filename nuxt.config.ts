// https://nuxt.com/docs/api/configuration/nuxt-config

// Plugins
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	modules: [
		'@nuxt/icon',
		'@nuxt/eslint',
		'@pinia/nuxt',
		'@nuxtjs/leaflet',
	],
	plugins: [
		'@/plugins/moment.ts',
	],
	devtools: { enabled: true },
	app: {
		head: {
			htmlAttrs: {
				lang: 'pt-BR',
			},
			title: 'Desafio | Felipe Barreto',
			meta: [
				{ name: 'description', content: 'Bem-vindo(a) ao meu desafio para a Aiko!' },
				{ name: 'keywords', content: 'nuxt3, vue3, seo' },
				{ name: 'author', content: 'Felipe Barreto' },
				{ property: 'og:title', content: 'Desafio | Felipe Barreto' },
				{ property: 'og:description', content: 'Bem-vindo(a) ao meu desafio para a Aiko!' },
				{ property: 'og:image', content: '/_nuxt/img/aiko.png' },
			],
			link: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
				},
			],
		},
	},
	css: ['@/assets/styles/main.css'],
	compatibilityDate: '2024-11-01',
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
			},
		},
	},
});
