/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        gmail: '#D44638', // Couleur officielle de Gmail
        facebook: '#1877F2', // Couleur officielle de Facebook
      },
    },
  },
  plugins: [],
};
