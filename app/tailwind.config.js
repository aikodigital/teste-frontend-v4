module.exports = {
   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   theme: {
      extend: {
         screens: {
            'xs': '480px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
         },
      },
   },
   plugins: [],
};
