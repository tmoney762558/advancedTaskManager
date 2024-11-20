/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        siteXLg: "1.7rem",
        siteXSm: "1rem",
      },
    },
  },
  plugins: [],
}