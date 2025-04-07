// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'operating': '#2ecc71',
          'stopped': '#e74c3c',
          'maintenance': '#f39c12',
        },
      },
    },
    plugins: [],
  }