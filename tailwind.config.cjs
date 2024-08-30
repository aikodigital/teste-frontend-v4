/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'night',
    ],
    styled: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
  },
}
