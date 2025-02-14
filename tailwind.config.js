/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      boxShadow: {
        glow: '0 0 15px rgba(239, 68, 68, 0.5)',
      },
    },
  },
  plugins: [],
};