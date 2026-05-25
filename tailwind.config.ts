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
          primary: 'var(--bg)',
          secondary: '#ffffff',
          surface: '#ffffff',
          card: '#ffffff',
        },
        brand: {
          purple: 'var(--secondary)',
          violet: 'var(--primary)',
          glow: 'var(--accent)',
          cyan: 'var(--secondary)',
          pink: '#ec4899',
          emerald: 'var(--secondary)',
        },
        border: {
          subtle: 'rgba(11, 60, 109, 0.06)',
          DEFAULT: 'rgba(11, 60, 109, 0.1)',
          bright: 'rgba(20, 184, 166, 0.3)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(20, 184, 166, 0.15), transparent)',
        'card-glow': 'radial-gradient(ellipse at top, rgba(20, 184, 166, 0.08), transparent 70%)',
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
        'glow-purple': '0 0 40px rgba(20, 184, 166, 0.15)',
        'glow-violet': '0 0 40px rgba(11, 60, 109, 0.15)',
        'glow-cyan': '0 0 40px rgba(20, 184, 166, 0.15)',
        'card': '0 4px 20px rgba(11, 60, 109, 0.05)',
        'card-hover': '0 8px 30px rgba(11, 60, 109, 0.1), 0 0 20px rgba(20, 184, 166, 0.1)',
      },
    },
  },
  plugins: [],
}
