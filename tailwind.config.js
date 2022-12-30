/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      inters: ["Inter", "sans-serif"],
      colors: {
        mainBg: "rgb(237,238,240)",
        selectorBg: "#edeefo",
      },
    },
  },
  plugins: [],
};
