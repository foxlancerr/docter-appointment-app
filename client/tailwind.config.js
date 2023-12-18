/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        violetlight: "#e0aaff",
        primary: "#284b63",
        violetdark: "#9d4edd"
      },
      fontFamily: {
        NunitoSans: ['Nunito Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}

