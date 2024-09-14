/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			borderColor: {
				'border': '#yourColorCode', // Substitua por seu código de cor
			},
			// Outras extensões...
		},
	},
	plugins: [require("tailwindcss-animate")],
	prefix: "",
}
