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
        'rcf-green': '#15803d',
        'rcf-green-dark': '#166534',
        'rcf-leaf': '#16a34a',
        'rcf-earth': '#78350f',
        'rcf-soil': '#92400e',
        'rcf-gold': '#eab308',
        'rcf-harvest': '#f59e0b',
        'rcf-saffron': '#ff8c25',
        'rcf-sky': '#0ea5e9',
        'rcf-navy': '#1e3a8a',
        'rcf-navy-dark': '#1e40af',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1280px',
        },
      },
    },
  },
  plugins: [],
}
