import { type Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { kanit: 'Kanit, sans-serif', hind: 'Hind, sans-serif' },
      colors: {
        primary: {
          80: '#81FC05',
          100: '#70DF00',
        },
        secondary: {
          20: '#8F8FFE',
          40: '#7272CB',
          60: '#565698',
          80: '#393966',
        },
        black: {
          80: '#282D30',
          100: '#1B1E25',
        },
        grey: {
          20: '#DBE0E2',
          40: '#9EACB3',
          60: '#6B7980',
          80: '#505B60',
          100: '#363C40',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
