/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#238636',
        background: '#11191F',
        panels: '#18232C',
      },
    },
  },
  plugins: [],
}
