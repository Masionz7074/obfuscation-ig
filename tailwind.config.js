/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'galaxy-pattern': 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)'
      },
      colors: {
        'space-blue': {
          50: '#e6f1ff',
          100: '#b3d7ff',
          200: '#80bdff',
          300: '#4da3ff',
          400: '#1a89ff',
          500: '#0070e6',
          600: '#0059b3',
          700: '#004080',
          800: '#00264d',
          900: '#000d1a'
        }
      }
    }
  },
  plugins: []
}
