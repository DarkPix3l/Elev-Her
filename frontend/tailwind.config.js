/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        //'navbar-bg': 'var(--navbar-bg)',
      },
      boxShadow: {
        //'custom': 'var(--shadow-custom)',
      },
    },
  },
  plugins: [],
};
