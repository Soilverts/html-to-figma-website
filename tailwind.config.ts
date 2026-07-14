import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './public/**/*.html',
    './**/*.{js,ts,jsx,tsx}',
    '!./node_modules/**',
    '!./dist/**',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#2563EB',
        'accent-dark': '#1E40AF',
        surface: '#F9FAFB',
        'surface-dark': '#F3F4F6',
        content: '#111827',
        'content-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        soft: '0 20px 40px -10px rgba(0, 0, 0, 0.05)',
        sharp: '0 0 0 1px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
} satisfies Config
