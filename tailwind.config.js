/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#FFE600',
        border: '#BFBEC5',
        contentText: '#555555',
        hiddenText: '#0000004d',
        bgColor: '#F8F8F8',
        buttonOnClick: '#E8D000',
      }
    },
  },
  plugins: [],
}