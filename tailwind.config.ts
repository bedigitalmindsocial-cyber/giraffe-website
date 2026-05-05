import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/sections/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand purple family
        'deep-purple': '#2A1D4B',
        'accent-purple': '#4B2F79',
        'mid-purple-1': '#6F5893',
        'mid-purple-2': '#9382AE',
        'mid-purple-3': '#DBD5E4',
        'mid-purple-4': '#EDEAF1',
        'mid-purple-5': '#F6F4F8',

        // Neutrals
        ink: '#0F0A1A',
        paper: '#FAF9FC',
        rule: '#DDD8E8',

        // Section 5 corkboard
        'cork-base': '#C7BFB3',
        'cork-texture': '#A89E8E',
        'wooden-frame': '#3A2E1E',
        'wooden-frame-hover': '#5A4A36',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'Anton', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'Courier Prime', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Hero scale (Coolvetica) — desktop ranges from prompt
        'hero-sm': ['64px', { lineHeight: '1.0', letterSpacing: '-0.01em' }],
        'hero-md': ['80px', { lineHeight: '1.0', letterSpacing: '-0.01em' }],
        'hero-lg': ['96px', { lineHeight: '1.0', letterSpacing: '-0.01em' }],

        // Section H2 (PP Editorial New)
        'h2-sm': ['36px', { lineHeight: '1.2' }],
        'h2-md': ['42px', { lineHeight: '1.2' }],
        'h2-lg': ['48px', { lineHeight: '1.2' }],

        // Section H3
        'h3-sm': ['24px', { lineHeight: '1.3' }],
        'h3-lg': ['32px', { lineHeight: '1.3' }],

        // Pull quote
        quote: ['26px', { lineHeight: '1.3' }],

        // Body
        'body-sm': ['16px', { lineHeight: '1.7' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],

        // Caption / metadata
        caption: ['13px', { lineHeight: '1.5' }],

        // Eyebrow
        eyebrow: ['11px', { lineHeight: '1.4', letterSpacing: '0.1em' }],

        // Memo monospace
        'memo-title': ['16px', { lineHeight: '1.3' }],
        'memo-meta': ['12px', { lineHeight: '1.5' }],
        'memo-body': ['12px', { lineHeight: '1.6' }],
        'memo-cta': ['11px', { lineHeight: '1.4' }],
        'memo-stamp': ['11px', { lineHeight: '1.4' }],
      },
      maxWidth: {
        content: '1280px',
        corkboard: '1024px',
        prose: '600px',
      },
      spacing: {
        'sec-mobile': '64px',
        'sec-tablet': '96px',
        'sec-desktop': '128px',
      },
      backgroundImage: {
        halftone:
          'radial-gradient(circle, #6F5893 1px, transparent 1px)',
      },
      backgroundSize: {
        halftone: '24px 24px',
      },
      boxShadow: {
        memo: '0 4px 12px rgba(15, 10, 26, 0.15)',
        'memo-hover': '0 12px 28px rgba(15, 10, 26, 0.25)',
        card: '0 2px 8px rgba(15, 10, 26, 0.08)',
        'card-hover': '0 12px 32px rgba(15, 10, 26, 0.18)',
      },
      borderRadius: {
        sm: '4px',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
