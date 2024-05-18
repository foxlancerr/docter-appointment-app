/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "white-100": "#F0FFF0",
        "white-200": "#F5F5F5",
        "white-300": "#F8F8FF",
        "black-100": "#36454F",
        "black-200": "#3B3C36",
        "black-300": "#16161D",
        violetdark: "#9d4edd"
      },
      fontFamily: {
        NunitoSans: ['Nunito Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}

