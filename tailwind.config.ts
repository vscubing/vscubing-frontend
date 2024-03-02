import { type Config } from 'tailwindcss'
import containerQueriesPlugin from '@tailwindcss/container-queries'
import animationPlugin from 'tailwindcss-animate'

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
          1000: '#000000',
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
        white: {
          100: '#F9F9F9',
        },
      },
      screens: {
        'xl-short': { raw: '(min-width: 1280px) and (max-height: 850px)' },
        lg: { max: '1279px' },
        sm: { max: '767px' },
      },
      backgroundImage: {
        'dashboard-banner-cubes': "url('./assets/images/dashboard-banner-cubes.svg')",
        'dashboard-banner-cubes-wide': "url('./assets/images/dashboard-banner-cubes-wide.svg')",
        cubes: "url('./assets/images/bg-cubes.svg')",
        'solve-contest-progress-divider': "url('./assets/images/solve-contest-progress-divider.svg')",
      },
      containers: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [containerQueriesPlugin, animationPlugin],
} satisfies Config
