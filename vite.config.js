// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// مفيش import لـ '@tailwindcss/vite' هنا
// ولا import لـ 'tailwindcss' أو 'autoprefixer' مباشر هنا

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    postcss: './postcss.config.js', // بتشاور على ملف postcss.config.js
  },
});