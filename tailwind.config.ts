import { type Config } from 'tailwindcss'
import containerQueriesPlugin from '@tailwindcss/container-queries'
import animationPlugin from 'tailwindcss-animate'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xl-short': { raw: '(min-width: 1280px) and (max-height: 850px)' },
      lg: { max: '1280px' },
      md: { max: '1023px' },
      sm: { max: '767px' },
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
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
        120: '#060709',
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
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'spinner-rotation': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'landing-alternating-text': {
          '0%,20%': {
            transform: 'scale(2) translateY(80%)',
            zoom: '0.5', // hack to make text not blurry
          },
          '33.3%,53.3%': {
            transform: 'scale(2) translateY(34%)',
            zoom: '0.5',
          },
          '66.6%,100%': {
            transform: 'scale(2) translateY(-12%)',
            zoom: '0.5',
          },
        },
        'landing-blobs': {
          '0%,100%': {
            left: 'var(--from-left)',
            top: 'var(--from-top)',
          },
          '50%': {
            left: 'var(--to-left)',
            top: 'var(--to-top)',
          },
        },
        'landing-features-results': {
          '0%': {
            left: 'var(--from-left)',
            top: 'var(--from-top)',
            transform: 'rotate(var(--from-rotation))',
          },
          '66.6%': {
            left: 'var(--transition-left)',
            top: 'var(--transition-top)',
            transform: 'rotate(var(--transition-rotation))',
          },
          '100%': {
            left: 'var(--to-left)',
            top: 'var(--to-top)',
            transform: 'rotate(var(--to-rotation))',
          },
        },
        'landing-features-scrambles': {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to: { clipPath: 'inset(0)' },
        },
        'landing-features-leaderboards': {
          from: { clipPath: 'inset(0 0 100%)' },
          to: { clipPath: 'inset(0)' },
        },
        'landing-features-sharing-cursor': {
          '0%': {
            transform: 'translateY(300%)',
            opacity: '0',
          },
          '31%,75%': {
            transform: 'translateY(0)',
            opacity: '100%',
          },
          '100%': {
            transform: 'translateY(200%)',
            opacity: '0',
          },
        },
        'landing-features-sharing-button': {
          '0%,99%': {
            backgroundColor: '#565698',
            border: '1px solid #565698',
          },
          '100%': {
            backgroundColor: '#393966',
            border: '1px solid #393966',
          },
        },
        'landing-features-sharing-img': {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to: { clipPath: 'inset(0)' },
        },
        'landing-footer-cubes': {
          '50%': {
            transform: 'translateY(var(--toTranslateY))',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'landing-alternating-text': 'landing-alternating-text 6s linear infinite',
        'landing-blobs': 'landing-blobs 20s linear infinite',
        'landing-features-results': 'landing-features-results linear 3s forwards',
        'landing-features-scrambles': 'landing-features-scrambles linear 2.7s forwards',
        'landing-features-leaderboards': 'landing-features-leaderboards ease-in-out 1s forwards var(--delay)',
        'landing-features-sharing-cursor': 'landing-features-sharing-cursor ease-out 3.2s forwards',
        'landing-features-sharing-button': 'landing-features-sharing-button ease-out 0.8s forwards 1s',
        'landing-features-sharing-img': 'landing-features-sharing-img linear 1s forwards 3.3s',
        'landing-footer-cubes': 'landing-footer-cubes linear 10s infinite',
      },
      spacing: {
        15: '3.75rem',
      },
      fontFamily: { kanit: 'Kanit, sans-serif', hind: 'Hind, sans-serif' },
      transitionDelay: {
        default: '300ms',
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
