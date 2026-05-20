/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050508',
          secondary: '#0a0a12',
          surface: '#0d0d1a',
          card: '#111120',
        },
        brand: {
          purple: '#6366f1',
          violet: '#8b5cf6',
          glow: '#a78bfa',
          cyan: '#06b6d4',
          pink: '#ec4899',
          emerald: '#10b981',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          DEFAULT: 'rgba(255,255,255,0.1)',
          bright: 'rgba(99,102,241,0.4)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.3), transparent)',
        'card-glow': 'radial-gradient(ellipse at top, rgba(99,102,241,0.15), transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee2': 'marquee2 25s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(99,102,241,0.3)',
        'glow-violet': '0 0 40px rgba(139,92,246,0.3)',
        'glow-cyan': '0 0 40px rgba(6,182,212,0.3)',
        'card': '0 4px 32px rgba(0,0,0,0.5)',
        'card-hover': '0 8px 64px rgba(0,0,0,0.7), 0 0 40px rgba(99,102,241,0.2)',
      },
    },
  },
  plugins: [],
}
