/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,scss,ts}'],
  theme: {
    extend: {
      animation: {
        skeleton: 'skeleton-loading 1s linear infinite alternate'
      },
      colors: {
        'gaming-bg': '#121212',
        'gaming-secondary': '#C1C1C1',
        'gaming-primary': '#2A2A2A'
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'sans-serif']
      },
      height: {
        78: '19.5rem'
      }
    }
  },
  plugins: []
};
