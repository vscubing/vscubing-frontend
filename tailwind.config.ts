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
          60: '#81FC05',
          80: '#70DF00',
          100: '#60BD02',
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
        yellow: {
          80: '#BDC03D',
          100: '#DBDF00',
        },
        red: {
          80: '#D65961',
          100: '#BB434A',
        },
        white: '#F9F9F9',
      },
      screens: {
        '2xl': { min: '1800px' },
        xl: { min: '1600px' },
        lg: { raw: '(max-width: 1280px), (max-height: 950px)' },
        ['lg-short']: { raw: '(min-width: 768px) and (max-height: 730px)' },
        md: { max: '767px' },
        sm: { max: '639px' },
      },
      backgroundImage: {
        'banner-cubes': "url('./assets/images/dashboard-banner-cubes.svg')",
        'banner-cubes-wide': "url('./assets/images/dashboard-banner-cubes-wide.svg')",
        'hint-page-cubes': "url('./assets/images/hint-page-cubes.svg')",
        'solve-contest-progress-divider': "url('./assets/images/solve-contest-progress-divider.svg')",
      },
      containers: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
} satisfies Config
