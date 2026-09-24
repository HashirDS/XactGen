/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep space background layers
        space: {
          950: '#05070f',
          900: '#0a0d18',
          800: '#12172a',
          700: '#1c2340',
          600: '#2a3556',
        },
        // Backwards-compat alias for existing navy-* classes
        navy: {
          950: '#05070f',
          900: '#0a0d18',
          800: '#12172a',
          700: '#1c2340',
          600: '#2a3556',
        },
        // Tight two-accent aurora palette. Every "aurora" token stays inside
        // the cyan-teal to violet family so nothing on the page ever clashes.
        aurora: {
          cyan:   '#67e8f9',
          teal:   '#5eead4',
          violet: '#c084fc',
          pink:   '#d8b4fe', // aliased to a soft violet, not hot pink
          blue:   '#818cf8',
        },
        brand: {
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        accent: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)',    'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',    'ui-monospace',  'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'aurora-shift': 'auroraShift 14s ease infinite',
        'slide-up':     'slideUp 0.6s ease forwards',
        'orbit-slow':   'orbit 60s linear infinite',
        'counter-orbit-slow': 'counterOrbit 60s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        auroraShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        counterOrbit: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
}
