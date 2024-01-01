import { type Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        15: '3.75rem',
      },
      fontFamily: { kanit: 'Kanit, sans-serif', hind: 'Hind, sans-serif' },
      transitionDelay: {
        default: '300ms',
      },
      transitionTimingFunction: { default: 'ease-in-out' },
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
        yellow: '#DBDF00',
        red: '#D65961',
        white: '#F9F9F9',
      },
      screens: {
        xl: { min: '1800px' },
        lg: { raw: '(max-width: 1280px), (max-height: 950px)' },
        ['lg-short']: { raw: '(min-width: 768px) and (max-height: 730px)' },
        md: { max: '767px' },
        sm: { max: '639px' },
      },
    },
  },
  plugins: [],
} satisfies Config
