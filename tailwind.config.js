// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        DEFAULT: '0 0 10px rgba(56,189,248,0.5)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}