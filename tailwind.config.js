/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'operacao-brand-color-blue-100': '#2382A0',
        'operacao-brand-color-blue-80': '#4F9BB3',
        'operacao-brand-color-blue-60': '#7BB4C6',
        'operacao-brand-color-blue-40': '#A7CDD9',
        'operacao-brand-color-blue-20': '#D3E6EC',

        'operacao-background' : '#F9F9F9',

        'operacao-gray-color-100': '#333333',
        'operacao-gray-color-80': '#4F4F4F',
        'operacao-gray-color-60': '#828282',
        'operacao-gray-color-40': '#D9D9D9',
        'operacao-gray-color-20': '#EDEDED',

        'operacao-brand-color-green': '#00A843',
        'operacao-brand-color-yellow': '#F3D11B',
        'operacao-brand-color-red': '#E54B4B',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
  prefix: "tw-",
}

