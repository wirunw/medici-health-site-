import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF8FF',
          100: '#D9F0FF',
          200: '#B3E0FF',
          300: '#85CBFF',
          400: '#4DB1FF',
          500: '#1E90FF',
          600: '#1677CC',
          700: '#125FA3',
          800: '#0E497C',
          900: '#0A355A'
        }
      }
    }
  },
  plugins: []
} satisfies Config
