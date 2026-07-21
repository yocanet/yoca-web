import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        yoca: {
          lime: '#A2FF00',
          green: '#40C401',
          'green-dark': '#267800',
          'lime-soft': '#E9FFC2',
        },
        surface: {
          DEFAULT: '#0C0C0C',
          deep: '#050505',
          secondary: '#141414',
          elevated: '#1B1B1B',
        },
        line: '#292929',
        muted: '#A1A1A1',
        subtle: '#737373',
        soft: '#F4F4F1',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.5)', opacity: '0.9' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'orb-drift': {
          from: { transform: 'translate3d(0,0,0) scale(1)' },
          to: { transform: 'translate3d(60px,40px,0) scale(1.12)' },
        },
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'orb-drift': 'orb-drift 26s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};

export default config;
