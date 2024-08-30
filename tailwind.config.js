/** @type {import('tailwindcss').Config} */
import palette from './palette.js'
// eslint-disable-next-line no-undef
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontWeight: {
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800
      },
      colors: palette
    }
  }
}
