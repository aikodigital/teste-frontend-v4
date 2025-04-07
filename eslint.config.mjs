// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
	rules: {
		'vue/html-self-closing': [
			'error',
			{
				html: {
					normal: 'never',
					void: 'always',
				},
			},
		],
	},
})
