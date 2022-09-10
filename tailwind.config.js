/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '350px',
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
    extend: {},
  },
  plugins: [],
}
