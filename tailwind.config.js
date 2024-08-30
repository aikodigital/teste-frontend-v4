/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        'root-background': '#F4F4F4',
        'root-blue': '#003184',
        'root-green': '#00DF00',
        'root-border': '#D6DEEB'
      }
    }
  },
  plugins: []
}
