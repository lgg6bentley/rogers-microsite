/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#2e5339',
        sand: '#f5f1e3',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};