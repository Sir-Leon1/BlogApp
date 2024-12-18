
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gradientColorStops: theme => ({
        'purple-100': '#F3E8FF',
        'indigo-100': '#E0E7FF',
      }),
    },
  },
  plugins: [],
}