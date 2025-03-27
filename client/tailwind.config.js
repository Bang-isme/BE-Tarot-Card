// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f0c05a',
          dark: '#e67e22',
        },
        background: {
          DEFAULT: '#1a0933',
          light: '#2a1045',
          dark: '#0f051d',
        },
        border: {
          DEFAULT: '#3a1c5a',
        },
      },
    },
  },
  plugins: [],
}