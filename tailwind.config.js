/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '7xl': '80rem',
      },
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
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}