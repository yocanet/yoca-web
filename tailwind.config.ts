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
          // Editorial dark rhythm: fume ↔ navy-grey instead of flat black
          DEFAULT: '#121418',
          deep: '#0D0E12',
          secondary: '#171A20',
          elevated: '#1E222A',
        },
        line: '#2A2E37',
        // WCAG AA: secondary text on dark surfaces ≥ #A1A1AA
        muted: '#B4B7BF',
        subtle: '#A1A1AA',
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
