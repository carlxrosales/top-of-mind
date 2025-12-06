/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        yellow: "rgb(255, 220, 0)",
        white: "rgb(255, 255, 255)",
        black: "rgb(0, 0, 0)",
        grey: {
          light: "rgb(240, 240, 240)",
          medium: "rgb(200, 200, 200)",
          dark: "rgb(100, 100, 100)",
        },
      },
    },
  },
  plugins: [],
};

