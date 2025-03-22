/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        audiowide: ['Audiowide', 'cursive'],
      },
      colors: {
        primary: {
          blue: '#2a3666',
          lightBlue: '#3592db',
          red: '#dc4c43',
          orange: '#e86b2d',
        },
        background: '#ebebeb',
      },
    },
  },
  plugins: [],
}