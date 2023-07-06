/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkGrey': '#1A1A1B',
        'grey': '#333F44',
        'turq': '#37AA9C',
        'lightTruq': '#94F3E4'
      }
    },
  },
  plugins: [],
}
