/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#3B5CFF',
        ink: '#0F172A',
        body: '#64748B',
        background: '#F8F9FC',
        card: '#FFFFFF',
        border: '#EAECF0'
      }
    }
  },
  plugins: []
}

