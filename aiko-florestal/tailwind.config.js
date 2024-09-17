const colors = require("tailwindcss/colors");

module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         spacing: {
            'calc50%': 'calc(50% - 8px)',
          },
         screens: {
            "max-sd": {'max': '375px'},
            "max-md": {'max': '768px'},
            "max-lg": {'max': '1024px'},
         },
         fontSize: {
            sm: ["12px", "16px"],
            lg: ["14px", "24px"],
            xl: ["24px", "24px"],
         },
         keyframes: {
            loading: {
               "0%": { left: "-100%", background: "#00B37E" },
               "49%": { left: "100%", background: "#00B37E" },
               "50%": { left: "100%", background: "#00B37E" },
               "100%": { left: "-100%", background: "#00B37E" },
            },
         },
         animation: {
            loading: "loading 3s ease-in-out infinite",
         },
         colors: {
            cyan: colors.cyan,
            green: {
               200: "#32F265",
               300: "#00B37E",
               400: "#00875F",
               500: "#015F43",
            },
            gray: {
               300: "#F3F4F6",
               400: "#D1D5DB",
               500: "#9CA3AF",
               600: "#6B7280",
               700: "#4B5563",
               800: "#374151",
               900: "#1F2937",
            },
            error: {
               main: "#cc2900",
               soft: "#ff8567",
            },
            warn: {
               main: "#aa9f00",
               soft: "#aaaa33",
            },
            success: {
               main: "#2fb390",
               soft: "#65c7af",
            },
            info: {
               main: "#7166c9",
            },
            placeholder: "#C0CCDA",
            "off-white": "#F9FAFB",
         },
      },
   },
};
