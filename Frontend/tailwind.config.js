/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          light: '#4ade80',
          DEFAULT: '#2ecc71',
          dark: '#27ae60',
        },
        'secondary': {
          light: '#60a5fa',
          DEFAULT: '#3498db',
          dark: '#2980b9',
        },
        'accent': {
          light: '#fde047',
          DEFAULT: '#f1c40f',
          dark: '#eab308',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};