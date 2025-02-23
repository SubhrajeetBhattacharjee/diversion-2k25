/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}" // ✅ Ensure it includes TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
