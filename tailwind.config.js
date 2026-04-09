import { designTokens } from './src/tokens/designTokens.js'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        elevated: 'var(--color-elevated)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        line: 'var(--color-line)',
        accent: 'var(--color-accent)',
        accentSoft: 'var(--color-accent-soft)',
      },
      fontFamily: {
        heading: [designTokens.typography.heading, 'serif'],
        body: [designTokens.typography.body, 'sans-serif'],
        mono: [designTokens.typography.mono, 'monospace'],
      },
      boxShadow: {
        copper: 'var(--shadow-copper)',
        panel: 'var(--shadow-panel)',
      },
      borderRadius: {
        tokenSm: 'var(--radius-sm)',
        tokenMd: 'var(--radius-md)',
        tokenLg: 'var(--radius-lg)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        orbit: 'orbit 12s linear infinite',
        marquee: 'marquee 24s linear infinite',
        pulseGlow: 'pulseGlow 2.6s ease-in-out infinite',
        spinAxisX: 'spinAxisX 9s linear infinite',
        spinAxisY: 'spinAxisY 11s linear infinite',
        spinAxisZ: 'spinAxisZ 7s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(219, 138, 58, 0.15)' },
          '50%': { boxShadow: '0 0 0 10px rgba(219, 138, 58, 0)' },
        },
        spinAxisX: {
          from: { transform: 'rotateX(72deg) rotateY(0deg) rotateZ(14deg)' },
          to: { transform: 'rotateX(432deg) rotateY(0deg) rotateZ(14deg)' },
        },
        spinAxisY: {
          from: { transform: 'rotateY(72deg) rotateX(0deg) rotateZ(-16deg)' },
          to: { transform: 'rotateY(432deg) rotateX(0deg) rotateZ(-16deg)' },
        },
        spinAxisZ: {
          from: { transform: 'rotateZ(0deg)' },
          to: { transform: 'rotateZ(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

