/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    '#393837',
          darker:  '#2a2928',
          light:   '#4a4948',
          blue:    '#7acee1',
          gold:    '#ffde59',
          white:   '#ffffff',
        },
        primary: {
          50:  '#f0fafc',
          100: '#e0f5f9',
          200: '#b8e9f3',
          300: '#7acee1',
          400: '#5bbdd4',
          500: '#3aadc7',
          600: '#2a9ab5',
          700: '#1e7d94',
          800: '#166175',
          900: '#0f4a59',
          950: '#082f3a',
        },
        gold: {
          400: '#ffde59',
          500: '#ffcf2b',
          600: '#f0be00',
        }
      },
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
