/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  purge: {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    enabled: process.env.NODE_ENV === "production",
  },
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
});
