/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kode-mono': ['"Kode Mono"', 'monospace'],
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}