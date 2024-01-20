/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tw-elements-react/dist/plugin.cjs")
  ],
}

