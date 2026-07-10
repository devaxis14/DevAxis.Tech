/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0A1628', light: '#132038', mid: '#1A2A45' },
        coral: { DEFAULT: '#E8553A', hover: '#D14A32' },
        warm: { white: '#FAFAF8', gray50: '#F5F5F3', gray100: '#E8E8E5' },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
